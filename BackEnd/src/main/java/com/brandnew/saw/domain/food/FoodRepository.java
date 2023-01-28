package com.brandnew.saw.domain.food;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Food, Long> {
    boolean existsByFoodName(String foodName);
}
