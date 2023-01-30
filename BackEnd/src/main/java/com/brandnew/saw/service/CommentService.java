package com.brandnew.saw.service;

import com.brandnew.saw.domain.comment.Comment;
import com.brandnew.saw.domain.comment.CommentRepository;
import com.brandnew.saw.domain.posts.Posts;
import com.brandnew.saw.exception.BadRequestException;
import com.brandnew.saw.web.dto.comment.CommentsaveRequestDto;

import com.brandnew.saw.web.dto.comment.PostsCommentsListResponseDto;
import com.brandnew.saw.web.dto.posts.PostsListResponseDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class CommentService {
    private final CommentRepository commentRepository;

    public Map<String, Object> findAllDesc(Long postsId, Pageable pageable) {
        List<PostsCommentsListResponseDto> entity = commentRepository.findComments(postsId, pageable);
        Long count = commentRepository.countComments(postsId, pageable);

        Map<String, Object> result = new HashMap<>();
        result.put("message", entity);
        result.put("count", count);
        return result;
    }

    @Transactional
    public void save(CommentsaveRequestDto requestDto){
        commentRepository.save(requestDto.toEntity());
    }

    @Transactional
    public void delete(Long commentId){
        Comment entity = commentRepository.findById(commentId).orElseThrow(
                () -> new BadRequestException("해당 댓글이 없습니다.")
        );
        commentRepository.delete(entity);
    }
}

