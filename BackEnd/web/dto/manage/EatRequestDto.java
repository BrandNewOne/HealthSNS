package com.brandnew.saw.web.dto.manage;

import com.brandnew.saw.domain.food.FoodId;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
public class EatRequestDto {

    @Column(nullable = false)//uid
    private Long uid;
    @NotBlank(message = "음식이름은 필수 입력 값입니다.")
    @Column(nullable = false)
    private String foodName;

    @PositiveOrZero(message = "칼로리는 음수일수 없습니다.")
    private float calories;
    @PositiveOrZero(message = "탄수화물은 음수일수 없습니다.")
    private float tan;
    @PositiveOrZero(message = "단백질은 음수일수 없습니다.")
    private float dan;
    @PositiveOrZero(message = "지방은 음수일수 없습니다.")
    private float ge;
    @PositiveOrZero(message = "총 칼로리가 더 작을수 없습니다.")
    private float etc;
    @Positive(message = "음식무게는 양수로 입력해주세요.")
    private float food_gram;
    @Positive(message = "먹은무게는 양수로 입력해주세요.")
    @Column(nullable = false)
    private float eat_gram;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSz")
    private LocalDateTime eat_date;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSz")
    private LocalDateTime start_date;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSz")
    private LocalDateTime end_date;

}
