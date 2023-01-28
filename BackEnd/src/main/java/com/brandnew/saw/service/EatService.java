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
    @Transactional
    public Map<String, Object> findAllDesc(EatRequestDto eatDto) {

        System.out.println("id : " + eatDto.getId());

        List<EatListResponseDto> entity = eatRepository.findByIdAllDesc(eatDto.getId(), eatDto.getStart_date(), eatDto.getEnd_date());

        Map<String, Object> result = new HashMap<>();
        result.put("message", entity);
        return result;
    }

    @Transactional
    public void save(EatRequestDto eatDto){
        if(!foodRepository.existsByFoodName(eatDto.getFoodName())){
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
