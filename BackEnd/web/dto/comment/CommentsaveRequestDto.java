package com.brandnew.saw.web.dto.comment;

import com.brandnew.saw.domain.comment.Comment;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentsaveRequestDto {

    private Long uid;
    private Long postsId;
    private String comment;

    @Builder
    public CommentsaveRequestDto( Long postsId, Long uid, String comment){
        this.postsId = postsId;
        this.uid = uid;
        this.comment = comment;
    }

    public Comment toEntity(){
        return Comment.builder()
                .postsId(postsId)
                .uid(uid)
                .comment(comment)
                .build();
    }
}
