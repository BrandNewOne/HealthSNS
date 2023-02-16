package com.brandnew.saw.web.dto.manage;

import com.brandnew.saw.domain.eat.Eat;
import com.brandnew.saw.domain.food.Food;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;

import java.time.LocalDateTime;

@Getter
public class EatListResponseDto {

    private Long id;
    private LocalDateTime date;
    private String foodName;
    private float calories;
    private float tan ;
    private float dan;
    private float ge;
    private float food_gram;
    private float eat_gram;
    private float etc;



    public EatListResponseDto(long id, LocalDateTime date, String foodName, float eat_gram, float calories, float tan, float dan, float ge, float food_gram, float etc){
        this.id = id;
        this.date = date;
        this.foodName = foodName;
        this.eat_gram = eat_gram;
        this.calories = calories;
        this.tan = tan;
        this.dan = dan;
        this.ge = ge;
        this.food_gram = food_gram;
        this.etc = etc;
    }

//    @QueryProjection
//    public EatListResponseDto(Eat e, Food f){
//        this.id = e.getId();
//        this.date = e.getCreateDate();
//        this.foodName = e.getFoodName();
//        this.eat_gram = e.getEat_gram();
//        this.calories = f.getCalories();
//        this.tan = f.getTan();
//        this.dan = f.getDan();
//        this.ge = f.getGe();
//        this.food_gram = f.getFood_gram();
//        this.etc = f.getEtc();
//    }

//    @QueryProjection
//    public EatListResponseDto(EatListResponseDto e){
//        this.id = e.getId();
//        this.date = e.getDate();
//        this.time = e.getTime();
//        this.foodName = e.getFoodName();
//        this.calories = e.getCalories();
//        this.tan = e.getTan();
//        this.dan = e.getDan();
//        this.ge = e.getGe();
//        this.gram = e.getGram();
//        this.etc = e.getEtc();
//    }

}

