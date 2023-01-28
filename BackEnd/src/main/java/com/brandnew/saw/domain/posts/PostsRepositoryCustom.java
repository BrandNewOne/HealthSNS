package com.brandnew.saw.domain.posts;

import com.brandnew.saw.web.dto.posts.PostsListResponseDto;
import com.brandnew.saw.web.dto.posts.PostsResponseDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PostsRepositoryCustom {

    List<PostsListResponseDto> findAllDesc(Pageable pageable);
    long getCountAllPosts(Pageable pageable);

    List<PostsListResponseDto> findByLikeItPosts(Long uid, Pageable pageable);
    long getCountAllPosts(Long uid, Pageable pageable);

    List<PostsListResponseDto> searchPosts(String search, Pageable pageable);
    long getCountAllPosts(String search, Pageable pageable);

    List<PostsListResponseDto> searchLikeItPosts(Long uid, String search, Pageable pageable);
    long getCountAllPosts(Long uid, String search, Pageable pageable);

    PostsResponseDto findByPosts(Long id);


    long deleteByUidAll(Long uid);



}
