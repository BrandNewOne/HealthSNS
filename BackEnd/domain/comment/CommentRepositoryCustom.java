package com.brandnew.saw.domain.comment;

import com.brandnew.saw.web.dto.comment.PostsCommentsListResponseDto;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CommentRepositoryCustom {

    List<PostsCommentsListResponseDto> findComments(Long postsId, Pageable pageable);
    Long countComments(Long postsId, Pageable pageable);

    @Transactional
    long deleteByPostsId(Long postsId);
//
//    @Transactional
//    Long deleteComment(Long commentId);

}
