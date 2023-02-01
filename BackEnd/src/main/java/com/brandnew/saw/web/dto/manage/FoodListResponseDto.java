package com.brandnew.saw.web.dto.manage;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FoodListResponseDto {

    private String foodName;
    private long calories;
    private long tan;
    private long dan;
    private long ge;
    private long etc;
    private long foodGram;


    public FoodListResponseDto(String foodName, long calories, long tan, long dan, long ge, long etc, long foodGram){
        this.foodName = foodName;
        this.calories = calories;
        this.tan = tan;
        this.dan = dan;
        this.ge = ge;
        this.etc = etc;
        this.foodGram = foodGram;
    }
}
