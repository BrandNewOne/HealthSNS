package com.brandnew.saw.domain.eat;

import com.brandnew.saw.web.dto.manage.EatListResponseDto;
import com.querydsl.core.Tuple;

import java.time.LocalDateTime;
import java.util.List;

public interface EatRepositoryCustom {

    List<EatListResponseDto> findEatDatasDesc(Long uid, LocalDateTime start_date, LocalDateTime end_date);


}

