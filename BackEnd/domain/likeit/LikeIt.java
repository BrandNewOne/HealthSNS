package com.brandnew.saw.domain.likeit;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class LikeIt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    private Long postsId;

    private Long uid;

    @Builder
    public LikeIt(Long postsId, Long uid){
        this.postsId = postsId;
        this.uid = uid;
    }
}
