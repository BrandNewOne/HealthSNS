package com.brandnew.saw.service;

import com.brandnew.saw.domain.eat.Eat;
import com.brandnew.saw.domain.eat.EatRepository;
import com.brandnew.saw.domain.food.Food;
import com.brandnew.saw.domain.food.FoodRepository;
import com.brandnew.saw.exception.BadRequestException;
import com.brandnew.saw.web.dto.manage.EatListResponseDto;
import com.brandnew.saw.web.dto.manage.EatRequestDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RequiredArgsConstructor
@Service
public class EatService {

    private final FoodRepository foodRepository;
    private final EatRepository eatRepository;

    public Map<String, Object> findById(Long id){
        Eat entity = eatRepository.findById(id).orElseThrow(
                () -> new BadRequestException("해당 히스토리가 없습니다.")
        );

        Map<String, Object> result = new HashMap<>();
        result.put("message", entity);
        return result;
    }

    public Map<String, Object> findEatDatasDesc(EatRequestDto eatDto) {

        List<EatListResponseDto> entity = eatRepository.findEatDatasDesc(eatDto.getUid(), eatDto.getStart_date().plusHours(9), eatDto.getEnd_date().plusHours(9));

        Map<String, Object> result = new HashMap<>();
        result.put("message", entity);
        return result;
    }

    @Transactional
    public void save(EatRequestDto eatDto){
        if(!foodRepository.existsByFoodNameAndUser(eatDto.getUid(), eatDto.getFoodName())){
            try {
                foodRepository.save(Food.createFood(eatDto));
            }
            catch (Exception e){
                throw new BadRequestException("음식 정보를 입력해주세요.");
            }
        }
        eatRepository.save(Eat.createEat((eatDto)));
    }

    @Transactional
    public void  delete(Long id){
        Eat entity = eatRepository.findById(id).orElseThrow(
                () -> new BadRequestException("해당 히스토리가 없습니다.")
        );

        eatRepository.delete(entity);
    }

}
