package com.brandnew.saw.domain.food;

import com.brandnew.saw.web.dto.manage.EatRequestDto;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    private String foodName;
    private long uid;
    private long calories;
    private long tan;
    private long dan;
    private long ge;
    private long etc;
    private long food_gram;
    

    @Builder
    public Food(String foodName,long uid ,long calories, long tan, long dan, long ge, long food_gram, long etc){
        this.foodName = foodName;
        this.uid = uid;
        this.calories = calories;
        this.tan = tan;
        this.dan = dan;
        this.ge = ge;
        this.food_gram = food_gram;
        this.etc = etc;
    }

    public static Food createFood(EatRequestDto eatDto) {
        Food food = Food.builder()
                .foodName(eatDto.getFoodName())
                .uid(eatDto.getId())
                .calories(eatDto.getCalories())
                .tan(eatDto.getTan())
                .dan(eatDto.getDan())
                .ge(eatDto.getGe())
                .food_gram(eatDto.getFood_gram())
                .etc(eatDto.getEtc())
                .build();
        return food;
    }

}
