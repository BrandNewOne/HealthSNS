package com.brandnew.saw.web.dto.posts;

import com.brandnew.saw.domain.posts.Posts;
import com.brandnew.saw.domain.user.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
public class PostsListResponseDto {
    private long postsId;
    private String title;
    private String nickName;
    private LocalDateTime dateTime;
    private long countLikeIt;

    public PostsListResponseDto(long postsId, String title, String nickName, LocalDateTime dateTime, long countLikeIt){
        this.postsId = postsId;
        this.title = title;
        this.nickName = nickName;
        this.dateTime = dateTime;
        this.countLikeIt = countLikeIt;
    }

//    public PostsListResponseDto(Posts p, User u){
//        this.id = p.getId();
//        this.title = p.getTitle();
//        this.nickName = u.getName();
//    }
}
