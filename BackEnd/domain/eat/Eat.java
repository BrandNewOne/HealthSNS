package com.brandnew.saw.domain.eat;

import com.brandnew.saw.config.Dto.BaseTimeEntity;
import com.brandnew.saw.web.dto.manage.EatRequestDto;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Entity
public class Eat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column(nullable = false)
    private Long uid;

    @Column(nullable = false)
    private String foodName;

    @Column(nullable = false)
    private float eat_gram;

    @Column(nullable = false)
    private LocalDateTime createDate;

    @Builder
    public Eat(Long uid, String foodName, float eat_gram, LocalDateTime createDate){
        this.uid = uid;
        this.foodName = foodName;
        this.eat_gram = eat_gram;
        this.createDate = createDate;
    }

    public static Eat createEat(EatRequestDto eatDto) {
        Eat eat = Eat.builder()
                .uid(eatDto.getUid())
                .foodName(eatDto.getFoodName())
                .eat_gram(eatDto.getEat_gram())
                .createDate(eatDto.getEat_date().plusHours(9))
                .build();
        return eat;
    }

}
