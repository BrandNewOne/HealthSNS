package com.brandnew.saw.web.dto.posts;

import com.brandnew.saw.domain.posts.Posts;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostsDeleteRequestDto {
    private Long uid;

    @Builder
    public PostsDeleteRequestDto(Long uid){
        this.uid = uid;
    }

    public Posts toEntity(){
        return Posts.builder()
                .uid(uid)
                .build();
    }

}
