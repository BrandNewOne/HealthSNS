package com.brandnew.saw.service;


import com.brandnew.saw.domain.file.ImageFile;
import com.brandnew.saw.domain.file.ImageFileRepository;
import com.brandnew.saw.domain.posts.Posts;
import com.brandnew.saw.domain.posts.PostsRepository;
import com.brandnew.saw.exception.BadRequestException;
import com.brandnew.saw.web.dto.file.FileUpdateRequestDto;
import com.brandnew.saw.web.dto.file.FileUploadRequestDto;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.impl.FileSizeLimitExceededException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;

import java.io.File;
import java.io.IOException;
import java.util.*;

@RequiredArgsConstructor
@Service
public class FileService {

    @Value("${file.dir}")
    private String fileDir;

    private final ImageFileRepository fileRepository;
    private final PostsRepository postsRepository;

    public Map<String, Object> saveFile(FileUploadRequestDto fileUploadRequestDto) throws IOException {
        if (fileUploadRequestDto.getFiles().isEmpty()) {
            return null;
        }
        try {

            long setImageId = fileRepository.getImageMaxNum();
            saveFile(fileUploadRequestDto.getFiles(), fileUploadRequestDto.getUid() ,setImageId);

            Map<String, Object> result = new HashMap<>();
            result.put("message", setImageId);

            return result;//savedImageFile.getId();
        }
        catch (FileSizeLimitExceededException e){
            throw new BadRequestException("파일의 사이즈가 너무 큽니다.");
        }
    }

    public Map<String, Object> updateFile(FileUpdateRequestDto fileUpdateRequestDto) throws IOException {
        Posts posts = postsRepository.findById(fileUpdateRequestDto.getPostsId()).orElseThrow(
                () -> new BadRequestException("해당 게시글이 없습니다.")
        );
        long setImageId = posts.getImageId();
        if (!(fileUpdateRequestDto.getFiles() == null)) {
            saveFile(fileUpdateRequestDto.getFiles(), posts.getUid(), setImageId);
        }

        if (!(fileUpdateRequestDto.getUpdateFiles() == null)) {
            for (String file : fileUpdateRequestDto.getUpdateFiles()) {
                fileRepository.deleteByImageSaveName(setImageId, file);
            }
        }
        Map<String, Object> result = new HashMap<>();
        result.put("message", setImageId);

        return result;
    }

    private void saveFile(List<MultipartFile> files, Long postsUid, long imageId) throws IOException {
        for (MultipartFile file : files) {

            // 원래 파일 이름 추출
            String origName = file.getOriginalFilename();

            // 파일 이름으로 쓸 uuid 생성
            String uuid = UUID.randomUUID().toString();

            // 확장자 추출(ex : .png)
            String extension = extractExt(origName);
            curretFileType(extension);

            // uuid와 확장자 결합
            String savedName = uuid + extension;

            // 파일을 불러올 때 사용할 파일 경로
            String savedPath = fileDir + postsUid;

            existsFolder(savedPath);

            // 파일 엔티티 생성
            ImageFile imageFile = ImageFile.builder()
                    .imageId(imageId)
                    .orgNm(origName)
                    .savedNm(savedName)
                    .savedPath(savedPath + "/" + savedName)
                    .build();

            //실제로 로컬에 uuid를 파일명으로 저장
            file.transferTo(new File(savedPath + "/" + savedName));

            // 데이터베이스에 파일 정보 저장
            fileRepository.save(imageFile);
        }
    }
    // 확장자 추출
    private String extractExt(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos);
    }

    private long makeImageId(){
        return 0l;
    }

    private void existsFolder(String path){
        File Folder = new File(path);

        if (!Folder.exists()){
            try {
                Folder.mkdir();
            }
            catch (Exception e){
                e.getStackTrace();
            }
        }
    }

    private void curretFileType(String fileType){
        HashSet<String> set = new HashSet<String>(); // set 선언
        set.add(".JPG");
        set.add(".PNG");
        set.add(".JPEG");
        set.add(".GIF");

        if(!set.contains(fileType.toUpperCase())){
            throw new BadRequestException("확장자를 확인해 주세요.(jpg, png, jpeg, gif)");
        }

    }

}
