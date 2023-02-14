package com.brandnew.saw.domain.likeit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface LikeItRepository extends JpaRepository<LikeIt, Long>, LikeItRepositoryCustom {

}
