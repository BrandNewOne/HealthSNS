package com.brandnew.saw.web.dto.comment;

import com.brandnew.saw.domain.posts.Posts;
import com.brandnew.saw.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostsCommentsListResponseDto {

    private Long id;
    private Long uid;
    private String nickName;
    private String comment;


    public PostsCommentsListResponseDto(Long id, Long uid, String nickName, String comment){
        this.id = id;
        this.uid = uid;
        this.nickName = nickName;
        this.comment = comment;
    }

}
