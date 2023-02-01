package com.brandnew.saw.service;

import com.brandnew.saw.domain.food.FoodRepository;
import com.brandnew.saw.web.dto.manage.EatRequestDto;
import com.brandnew.saw.web.dto.manage.FoodListResponseDto;
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

    public Map<String, Object> findMyFood(EatRequestDto eatDto) {

        List<FoodListResponseDto> entity = foodRepository.myFoodList(eatDto.getId());

        Map<String, Object> result = new HashMap<>();
        result.put("message", entity);
        return result;
    }
    @Transactional
    public void delete(String FoodName, long uid) {
        foodRepository.deleteMyFood(FoodName, uid);
    }



}
