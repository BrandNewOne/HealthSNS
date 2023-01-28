package com.brandnew.saw.domain.likeit;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface LikeItRepositoryCustom {

    Long findLikeIt(Long postsId, Long uid);

    @Transactional
    Long deleteByPostsId(Long postsId);

}
