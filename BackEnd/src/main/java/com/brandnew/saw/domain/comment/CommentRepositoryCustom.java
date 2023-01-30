package com.brandnew.saw.domain.comment;

import com.brandnew.saw.web.dto.comment.PostsCommentsListResponseDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CommentRepositoryCustom {

    List<PostsCommentsListResponseDto> findComments(Long postsId, Pageable pageable);
    Long countComments(Long postsId, Pageable pageable);
//
//    @Transactional
//    Long deleteComment(Long commentId);

}
