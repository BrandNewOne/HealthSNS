package com.brandnew.saw.service;

import com.brandnew.saw.domain.comment.CommentRepository;
import com.brandnew.saw.domain.file.ImageFileRepository;
import com.brandnew.saw.domain.likeit.LikeItRepository;
import com.brandnew.saw.domain.posts.Posts;
import com.brandnew.saw.domain.posts.PostsRepository;
import com.brandnew.saw.exception.BadRequestException;
import com.brandnew.saw.web.dto.file.FileUpdateRequestDto;
import com.brandnew.saw.web.dto.file.FileUploadRequestDto;
import com.brandnew.saw.web.dto.file.GetImageNameDto;
import com.brandnew.saw.web.dto.posts.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PostsService {
    private final PostsRepository postsRepository;
    private final LikeItRepository likeItRepository;
    private final ImageFileRepository imageFileRepository;
    private final FileService fileService;
    private final CommentRepository commentRepository;

    @Transactional
    public void save(FileUploadRequestDto fileUploadRequestDto) throws IOException {
        Posts posts = postsRepository.save(fileUploadRequestDto.toEntity());
        if (fileUploadRequestDto.getFiles() != null) {
            fileService.saveFile(fileUploadRequestDto.getFiles(), fileUploadRequestDto.getUid() ,posts.getId(), 0l);
        }
    }

    @Transactional
    public void update(FileUpdateRequestDto fileUpdateRequestDto) throws IOException {
        Posts posts = postsRepository.findById(fileUpdateRequestDto.getPostsId()).orElseThrow(
                () -> new BadRequestException("해당 게시글이 없습니다.")
        );
        posts.update(fileUpdateRequestDto.getTitle(), fileUpdateRequestDto.getContent());

        fileService.updateFile(posts, fileUpdateRequestDto);
    }

    public Map<String, Object> findByPostsId(Long id){
        PostsResponseDto entity = postsRepository.findByPosts(id);
        if(entity == null){
            throw new BadRequestException("해당 게시글이 없습니다.");
        }

        Map<String, Object> result = new HashMap<>();
        result.put("message", entity);
        return result;
    }

    public Map<String, Object> findPosts(Long postsId, Long uid){
        PostsResponseDto entity = postsRepository.findByPosts(postsId);
        if(entity == null){
            throw new BadRequestException("해당 게시글이 없습니다.");
        }

        //좋아요 setter
        Long likeItId = likeItRepository.findLikeIt(postsId, uid);
        if(likeItId != null){
            entity.setLikeState(true);
        }

        //이미지 setter

        List<GetImageNameDto> imageName = imageFileRepository.findByImageSaveName(postsId);
        List<Map<String, String>> imageMapName = imageName.stream().map(
                e -> Map.of(
                        "saveName",e.getSavedNm(),
                        "originName",e.getOrgNm(),
                        "size", String.valueOf(e.getSize())
                )
        ).collect(Collectors.toList());

        if (!imageMapName.isEmpty()) {
            entity.setImageMapName(imageMapName);
        }


        Map<String, Object> result = new HashMap<>();
        result.put("message", entity);
        return result;
    }

    @Transactional
    public Map<String, Object> findAllDesc(Long uid, String search, Pageable pageable) {
        List<PostsListResponseDto> entity;
        long count;
        if(uid == null){
            if(search == null || search.isEmpty()) {
                entity = postsRepository.findAllDesc(pageable);
                count = postsRepository.getCountAllPosts(pageable);
            }
            else {
                entity = postsRepository.searchPosts(search, pageable);
                count = postsRepository.getCountAllPosts(search, pageable);
            }
        }
        else{
            if(search == null || search.isEmpty()) {
                entity = postsRepository.findByLikeItPosts(uid, pageable);
                count = postsRepository.getCountAllPosts(uid, pageable);
            }
            else {
                entity = postsRepository.searchLikeItPosts(uid, search, pageable);
                count = postsRepository.getCountAllPosts(uid, search, pageable);
            }
        }
        System.out.println("count : " + count);

        Map<String, Object> result = new HashMap<>();
        result.put("message", entity);
        result.put("count", count);
        return result;
    }

    public Map<String, Object> findByLikeIt(Long uid, Pageable pageable) {
        System.out.println("uid : " + uid);
        List<PostsListResponseDto> entity = postsRepository.findByLikeItPosts(uid, pageable);

        long count = postsRepository.getCountAllPosts(uid, pageable);
        System.out.println("count : " + count);

        Map<String, Object> result = new HashMap<>();
        result.put("message", entity);
        result.put("count", count);
        return result;
    }

    @Transactional
    public void  delete(Long postsId){
        Posts entity = postsRepository.findById(postsId).orElseThrow(
                () -> new BadRequestException("해당 게시글이 없습니다.")
        );

        commentRepository.deleteByPostsId(postsId); // 댓글삭제
        imageFileRepository.deleteInPostsId(postsId);// 이미지 삭제
        likeItRepository.deleteByPostsId(postsId); // 좋아요 삭제
        postsRepository.delete(entity); //게시글 삭제
    }

    @Transactional
    public Map<String, Object> saveL(PostsLikeItRequestDto requestDto){
        Posts posts = postsRepository.findById(requestDto.getPostsId()).orElseThrow(
                () -> new BadRequestException("해당 게시글이 없습니다.")
        );

        long countLikeIt = posts.getCountLikeIt();
        Long likeItId = likeItRepository.findLikeIt(requestDto.getPostsId(), requestDto.getUid());

        boolean likeState;
        if(likeItId == null) {
            likeItRepository.save(requestDto.toEntity());
            posts.update(countLikeIt+1);
            likeState = true;

        }else{
            likeItRepository.deleteById(likeItId);
            posts.update(countLikeIt-1);
            likeState =  false;
        }

        Map<String, Object> result = new HashMap<>();
        result.put("message", likeState);

        return result;
    }


}

