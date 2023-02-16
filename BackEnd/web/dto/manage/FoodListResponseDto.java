package com.brandnew.saw.web.dto.manage;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FoodListResponseDto {

    private String foodName;
    private float calories;
    private float tan;
    private float dan;
    private float ge;
    private float etc;
    private float foodGram;


    public FoodListResponseDto(String foodName, float calories, float tan, float dan, float ge, float etc, float foodGram){
        this.foodName = foodName;
        this.calories = calories;
        this.tan = tan;
        this.dan = dan;
        this.ge = ge;
        this.etc = etc;
        this.foodGram = foodGram;
    }
}
