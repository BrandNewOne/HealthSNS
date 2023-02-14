package com.brandnew.saw.domain.eat;

import com.brandnew.saw.config.Dto.BaseTimeEntity;
import com.brandnew.saw.web.dto.manage.EatRequestDto;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity
public class Eat extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
//    @Column(nullable = false)
//    private String date;
//    @Column(nullable = false)
//    private String time;

    @Column(nullable = false)
    private Long uid;

    @Column(nullable = false)
    private String foodName;

    @Column(nullable = false)
    private Long eat_gram;

    @Builder
    public Eat(Long uid, String foodName, Long calories, Long tan, Long dan, Long ge, Long eat_gram){
        this.uid = uid;
        this.foodName = foodName;
//        this.date = date;
//        this.time = time;
        this.eat_gram = eat_gram;
    }

    public static Eat createEat(EatRequestDto eatDto) {
        Eat eat = Eat.builder()
                .uid(eatDto.getId())
                .foodName(eatDto.getFoodName())
                .eat_gram(eatDto.getEat_gram())
//                .date(eatDto.getDate())
//                .time(eatDto.getTime())
                .build();
        return eat;
    }

}
