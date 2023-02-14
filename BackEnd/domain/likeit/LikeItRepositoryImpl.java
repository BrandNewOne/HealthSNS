package com.brandnew.saw.domain.likeit;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import static com.brandnew.saw.domain.likeit.QLikeIt.likeIt;

@RequiredArgsConstructor
@Repository
public class LikeItRepositoryImpl {

    private final JPAQueryFactory queryFactory;

    public Long findLikeIt(Long postsId, Long uid){
        return queryFactory
                .select(likeIt.id)
                .from(likeIt)
                .where(likeIt.postsId.eq(postsId).and(likeIt.uid.eq(uid)))
                .fetchOne();

    }

    @Transactional
    public Long deleteByImageSaveName(Long postsId){
        return queryFactory
                .delete(likeIt)
                .where(likeIt.postsId.eq(postsId))
                .execute();
    }

}
