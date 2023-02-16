package com.brandnew.saw.web.dto.manage;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class FoodRequestDto {
    @Column(nullable = false)
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

    @Positive(message = "음식무게는 양수로 입력해주세요.")
    private float food_gram;

    @PositiveOrZero(message = "나머지는 음수일수 없습니다.")
    private float etc;

}
