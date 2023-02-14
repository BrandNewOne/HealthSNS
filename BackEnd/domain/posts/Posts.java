package com.brandnew.saw.domain.posts;

import com.brandnew.saw.config.Dto.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.UniqueElements;

@Getter
@NoArgsConstructor
@Entity
public class Posts extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long uid;

    @Column
    private long countLikeIt;

    @Column(length = 500, nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;


    @Builder
    public Posts(String title, String content, Long uid, long countLikeIt){
        this.uid = uid;
        this.countLikeIt = countLikeIt;
        this.title = title;
        this.content = content;
    }

    public void update(String title, String content){
        this.title = title;
        this.content = content;
    }

    public void update(long countLikeIt){
        this.countLikeIt = countLikeIt;
    }

}
