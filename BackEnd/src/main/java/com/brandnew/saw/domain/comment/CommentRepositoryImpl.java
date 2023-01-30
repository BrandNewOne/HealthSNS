package com.brandnew.saw.domain.comment;

import com.brandnew.saw.web.dto.comment.PostsCommentsListResponseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.brandnew.saw.domain.comment.QComment.comment1;
import static com.brandnew.saw.domain.user.QUser.user;
import static com.brandnew.saw.domain.posts.QPosts.posts;

@RequiredArgsConstructor
@Repository
public class CommentRepositoryImpl {
    private final JPAQueryFactory queryFactory;

    public List<PostsCommentsListResponseDto> findComments(Long postsId, Pageable pageable){
        return queryFactory
                .select(Projections.constructor(PostsCommentsListResponseDto.class,
                        comment1.id,
                        user.id.as("uid"),
                        user.name.as("nickName"),
                        comment1.comment)
                )
                .from(comment1)
                .leftJoin(user).on(comment1.uid.eq(user.id))
                .where(comment1.postsId.eq(postsId))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(comment1.createDate.desc())
                .fetch();
    }

    public Long countComments(Long postsId, Pageable pageable){
        double count =  queryFactory
                .select(comment1.count())
                .from(comment1)
                .where(comment1.postsId.eq(postsId))
                .fetch().get(0);

        return (long) Math.ceil(count/Double.valueOf(pageable.getPageSize()));
    }

}
