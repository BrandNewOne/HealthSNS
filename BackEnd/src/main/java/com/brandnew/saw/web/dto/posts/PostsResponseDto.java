package com.brandnew.saw.web.dto.posts;

import com.brandnew.saw.domain.file.ImageFile;
import com.brandnew.saw.domain.posts.Posts;
import com.brandnew.saw.domain.user.User;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class PostsResponseDto {
    private Long uid;
    private Long id;
    private Long imageId;
    private String title;
    private String content;
    private String nickName;
    private Boolean likeState;
    private List<Map<String, String>> imageMapName;


    public PostsResponseDto(Posts p, User u){
        this.id = p.getId();
        this.title = p.getTitle();
        this.content = p.getContent();
        this.nickName = u.getName();
        this.uid = u.getId();
        this.likeState = false;
        this.imageId = p.getImageId();
        this.imageMapName = null;
    }
}
