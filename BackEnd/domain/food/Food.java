package com.brandnew.saw.domain.food;

import com.brandnew.saw.web.dto.manage.EatRequestDto;
import com.brandnew.saw.web.dto.manage.FoodListResponseDto;
import com.brandnew.saw.web.dto.manage.FoodRequestDto;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class Food {

    @EmbeddedId
    FoodId foodId;
    private float calories;
    private float tan;
    private float dan;
    private float ge;
    private float etc;
    private float food_gram;
    

    @Builder
    public Food(FoodId foodId, float calories, float tan, float dan, float ge, float food_gram, float etc){
        this.foodId = foodId;
        this.calories = calories;
        this.tan = tan;
        this.dan = dan;
        this.ge = ge;
        this.food_gram = food_gram;
        this.etc = etc;
    }

    public static Food createFood(FoodRequestDto foodDto) {
        FoodId foodId = FoodId.builder()
                .uid(foodDto.getUid())
                .foodName(foodDto.getFoodName())
                .build();

        Food food = Food.builder()
                .foodId(foodId)
                .calories(foodDto.getCalories())
                .tan(foodDto.getTan())
                .dan(foodDto.getDan())
                .ge(foodDto.getGe())
                .food_gram(foodDto.getFood_gram())
                .etc(foodDto.getEtc())
                .build();

        return food;
    }

    public static Food createFood(EatRequestDto eatDto) {
        FoodId foodId = FoodId.builder()
                .uid(eatDto.getUid())
                .foodName(eatDto.getFoodName())
                .build();

        Food food = Food.builder()
                .foodId(foodId)
                .calories(eatDto.getCalories())
                .tan(eatDto.getTan())
                .dan(eatDto.getDan())
                .ge(eatDto.getGe())
                .food_gram(eatDto.getFood_gram())
                .etc(eatDto.getEtc())
                .build();

        return food;
    }

}
