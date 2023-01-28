package com.brandnew.saw.domain.eat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EatRepository extends JpaRepository<Eat, Long>, EatRepositoryCustom{

//    @Query("SELECT e FROM Eat e ORDER BY e.date DESC, e.time DESC")
//    List<Eat> findAllDesc();

}
