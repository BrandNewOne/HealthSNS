package com.brandnew.saw.domain.food;

import com.brandnew.saw.web.dto.manage.FoodListResponseDto;

import java.util.List;

public interface FoodRepositoryCustom {
    boolean existsByFoodNameAndUser(long uid, String foodName);
    List<FoodListResponseDto> myFoodList(long uid);

    long deleteMyFood(String foodName, long uid);
}
