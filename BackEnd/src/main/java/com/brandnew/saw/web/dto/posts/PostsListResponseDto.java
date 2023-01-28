package com.brandnew.saw.web.dto.posts;

import com.brandnew.saw.domain.posts.Posts;
import com.brandnew.saw.domain.user.User;
import lombok.Getter;
import lombok.Setter;

@Getter
public class PostsListResponseDto {
    private Long id;
    private String title;
    private String nickName;

    public PostsListResponseDto(Posts p, User u){
        this.id = p.getId();
        this.title = p.getTitle();
        this.nickName = u.getName();
    }
}
