package com.brandnew.saw.domain.food;

import jakarta.persistence.Embeddable;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor
public class FoodId {
    private long uid;
    private String foodName;

    @Builder
    public FoodId(long uid, String foodName) {
        this.uid = uid;
        this.foodName = foodName;
    }
}
