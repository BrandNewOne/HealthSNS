package com.brandnew.saw.service;

import com.brandnew.saw.domain.food.Food;
import com.brandnew.saw.domain.food.FoodRepository;
import com.brandnew.saw.exception.BadRequestException;
import com.brandnew.saw.web.dto.manage.EatRequestDto;
import com.brandnew.saw.web.dto.manage.FoodListResponseDto;
import com.brandnew.saw.web.dto.manage.FoodRequestDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RequiredArgsConstructor
@Service
public class FoodService {
    private final FoodRepository foodRepository;
    private final JsoupService jsoupService;

    @Transactional
    public void upsert(FoodRequestDto foodDto) {
        //long uid, String foodName, long calories, long tan, long dan, long ge, long food_gram, long etc
        foodRepository.save(Food.createFood(foodDto));
    }

    public Map<String, Object> findMyFood(EatRequestDto eatDto) {
        List<FoodListResponseDto> entity = foodRepository.myFoodList(eatDto.getUid());

        Map<String, Object> result = new HashMap<>();
        result.put("message", entity);
        return result;
    }

    @Transactional
    public void delete(String foodName, long uid) {
        if(foodRepository.existsByFoodNameAndUser(uid, foodName)) {
            foodRepository.deleteMyFood(foodName, uid);
        }
        else{
            throw new BadRequestException("해당 음식은 없습니다.");
        }
    }

    public String searchFoodWithJsoup(String foodName) {
        return jsoupService.getFoodData(foodName);
    }

}
