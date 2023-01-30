package com.brandnew.saw.domain.comment;

import com.brandnew.saw.config.Dto.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity
public class Comment extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long postsId;
    private Long uid;
    private String comment;

    @Builder
    public Comment(Long id, Long postsId, Long uid, String comment){
        this.id = id;
        this.uid = uid;
        this.postsId = postsId;
        this.comment = comment;
    }

}
