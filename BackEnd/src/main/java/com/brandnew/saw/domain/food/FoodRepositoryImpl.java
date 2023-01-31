package com.brandnew.saw.domain.food;

import com.brandnew.saw.web.dto.manage.FoodListResponseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.brandnew.saw.domain.food.QFood.food;

@RequiredArgsConstructor
@Repository
public class FoodRepositoryImpl {
    private final JPAQueryFactory queryFactory;

    public boolean existsByFoodNameAndUser(long uid, String foodName){
        return queryFactory
                .selectFrom(food)
                .where(food.foodName.eq(foodName).and(food.uid.eq(uid)))
                .fetchFirst() != null;

    }

    public List<FoodListResponseDto> myFoodList(long uid){
        return queryFactory
                .select(Projections.constructor(FoodListResponseDto.class,
                        food.foodName)
                )
                .from(food)
                .where(food.uid.eq(uid))
                .fetch();
    }

}
