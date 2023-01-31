package com.brandnew.saw.web.dto.manage;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FoodListResponseDto {

    private String foodName;


    public FoodListResponseDto(String foodName){
        this.foodName = foodName;
    }
}
