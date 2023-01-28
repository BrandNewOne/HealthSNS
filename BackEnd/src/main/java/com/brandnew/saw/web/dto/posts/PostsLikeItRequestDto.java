package com.brandnew.saw.web.dto.posts;

import com.brandnew.saw.domain.likeit.LikeIt;
import com.brandnew.saw.domain.posts.Posts;
import com.brandnew.saw.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostsLikeItRequestDto {

    private Long postsId;
    private Long uid;

    @Builder
    public PostsLikeItRequestDto(Long postsId, Long uid){
        this.postsId = postsId;
        this.uid = uid;
    }

    public LikeIt toEntity(){
        return LikeIt.builder()
                .postsId(postsId)
                .uid(uid)
                .build();
    }
}
