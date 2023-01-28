package com.brandnew.saw.domain.eat;

import static com.brandnew.saw.domain.eat.QEat.eat;
import static com.brandnew.saw.domain.food.QFood.food;

import com.brandnew.saw.web.dto.manage.EatListResponseDto;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Repository
public class EatRepositoryImpl {
    private final JPAQueryFactory queryFactory;

    public List<EatListResponseDto> findByIdAllDesc(Long id, LocalDateTime start_date, LocalDateTime end_date){
        return queryFactory
                .select(Projections.constructor(EatListResponseDto.class,eat,food))
                .from(eat)
                .leftJoin(food).on(eat.foodName.eq(food.foodName))
                .where(eat.uid.eq(id).and(Expressions.dateTimeTemplate(LocalDateTime.class,"DATE_FORMAT({0},'%Y-%m-%d')",eat.createDate)
                        .between(Expressions.dateTimeTemplate(LocalDateTime.class,"DATE_FORMAT({0},'%Y-%m-%d')",start_date)
                                , Expressions.dateTimeTemplate(LocalDateTime.class,"DATE_FORMAT({0},'%Y-%m-%d')",end_date)
                        )
                ))
                .orderBy(eat.createDate.desc())
                .fetch();
    }
}
