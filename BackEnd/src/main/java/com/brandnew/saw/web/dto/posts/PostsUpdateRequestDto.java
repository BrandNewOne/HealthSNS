package com.brandnew.saw.web.dto.posts;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor
public class PostsUpdateRequestDto {
    private String title;
    private String content;
    private Long uid;
    private Long imageId;

    @Builder
    public PostsUpdateRequestDto(String title, String content, Long uid, Long imageId){
        this.title = title;
        this.content = content;
        this.uid = uid;
        this.imageId = imageId;
    }
}
