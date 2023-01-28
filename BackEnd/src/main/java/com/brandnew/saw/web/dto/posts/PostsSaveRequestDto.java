package com.brandnew.saw.web.dto.posts;

import com.brandnew.saw.domain.posts.Posts;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostsSaveRequestDto {
    private String title;
    private String content;
    private Long uid;
    private Long imageId;

    @Builder
    public PostsSaveRequestDto(String title, String content, Long uid, Long imageId){
        this.title = title;
        this.content = content;
        this.uid = uid;
        this.imageId = imageId;
    }

    public Posts toEntity(){
        return Posts.builder()
                .title(title)
                .content(content)
                .uid(uid)
                .imageId(imageId)
                .build();
    }
}
