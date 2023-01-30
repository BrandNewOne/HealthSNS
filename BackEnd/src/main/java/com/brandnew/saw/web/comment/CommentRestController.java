package com.brandnew.saw.web.comment;

import com.brandnew.saw.service.CommentService;
import com.brandnew.saw.web.dto.comment.CommentsaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/comment")
public class CommentRestController {

    private final CommentService commentService;

    @GetMapping("posts")
    public ResponseEntity<Map<String, Object>> main(@RequestParam(value = "postsId", required = false) Long postsId,
                                                    @PageableDefault(size=5) Pageable pageable) {

        System.out.println("postsID : " + postsId );
        return new ResponseEntity<>(commentService.findAllDesc(postsId, pageable), HttpStatus.OK);
    }

    @PostMapping("save")
    public ResponseEntity<Map<String, Object>> saveComment(@RequestBody CommentsaveRequestDto requestDto) {
        System.out.println("postsID : " + requestDto.getPostsId() );
        System.out.println("postsID : " + requestDto.getUid() );
        System.out.println("postsID : " + requestDto.getComment() );

        commentService.save(requestDto);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @DeleteMapping("delete")
    public ResponseEntity<Map<String, Object>> deleteComment(@RequestParam Long id) {

        commentService.delete(id);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
