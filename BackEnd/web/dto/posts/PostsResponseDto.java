package com.brandnew.saw.web.dto.posts;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class PostsResponseDto {
    private Long uid;
    private long postsId;
    private String title;
    private String content;
    private String nickName;
    private boolean likeState;
    private List<Map<String, String>> imageMapName;

    public PostsResponseDto(Long uid, long postsId, String title, String content, String nickName){
        this.uid = uid;
        this.postsId = postsId;
        this.title = title;
        this.content = content;
        this.nickName = nickName;
        this.likeState = false;
        this.imageMapName = null;
    }

}
