package com.brandnew.saw.domain.food;

import com.brandnew.saw.web.dto.manage.FoodListResponseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.brandnew.saw.domain.food.QFood.food;
import static com.brandnew.saw.domain.eat.QEat.eat;

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
                        food.foodName,
                        food.calories,
                        food.tan,
                        food.dan,
                        food.ge,
                        food.etc,
                        food.food_gram)
                )
                .from(food)
                .where(food.uid.eq(uid))
                .fetch();
    }

    public long deleteMyFood(String foodName, long uid){
        long deleteEat = queryFactory
                .delete(eat)
                .where(eat.foodName.eq(foodName).and(eat.uid.eq(uid)))
                .execute();
        queryFactory
                .delete(food)
                .where(food.foodName.eq(foodName).and(food.uid.eq(uid)))
                .execute();

        return deleteEat;
    }

}
