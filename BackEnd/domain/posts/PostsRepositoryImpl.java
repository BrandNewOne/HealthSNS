package com.brandnew.saw.domain.posts;

import com.brandnew.saw.web.dto.posts.PostsListResponseDto;
import com.brandnew.saw.web.dto.posts.PostsResponseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.brandnew.saw.domain.posts.QPosts.posts;
import static com.brandnew.saw.domain.user.QUser.user;
import static com.brandnew.saw.domain.likeit.QLikeIt.likeIt;


@RequiredArgsConstructor
@Repository
public class PostsRepositoryImpl {

    private final JPAQueryFactory queryFactory;

    public List<PostsListResponseDto> findAllDesc(Pageable pageable){

        return queryFactory
                .select(Projections.constructor(PostsListResponseDto.class,
                        posts.id.as("postsId"),
                        posts.title,
                        user.name.as("nickName"),
                        posts.modifiedDate.as("dateTime"),
                        posts.countLikeIt
                ))
                .from(posts)
                .leftJoin(user).on(posts.uid.eq(user.id))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(posts.id.desc())
                .fetch();
    }

    public long getCountAllPosts(Pageable pageable){
        double count =  queryFactory
                .select(posts.count())
                .from(posts)
                .fetch().get(0);

        return (long) Math.ceil(count/Double.valueOf(pageable.getPageSize()));
    }

    public List<PostsListResponseDto> findByLikeItPosts(Long uid, Pageable pageable){
        return queryFactory
                .select(Projections.constructor(PostsListResponseDto.class,
                        posts.id.as("postsId"),
                        posts.title,
                        user.name.as("nickName"),
                        posts.modifiedDate.as("dateTime"),
                        posts.countLikeIt
                ))
                .from(posts)
                .leftJoin(user).on(posts.uid.eq(user.id))
                .leftJoin(likeIt).on(posts.id.eq(likeIt.postsId))
                .where(likeIt.uid.eq(uid).and(likeIt.postsId.eq(posts.id)))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(posts.id.desc())
                .fetch();
    }

    public long getCountAllPosts(Long uid, Pageable pageable){
        double count =  queryFactory
                .select(posts.count())
                .from(posts)
                .leftJoin(likeIt).on(posts.id.eq(likeIt.postsId))
                .where(likeIt.uid.eq(uid).and(likeIt.postsId.eq(posts.id)))
                .fetch().get(0);

        return (long) Math.ceil(count/Double.valueOf(pageable.getPageSize()));
    }

    public List<PostsListResponseDto> searchPosts(String search, Pageable pageable){

        return queryFactory
                .select(Projections.constructor(PostsListResponseDto.class,
                        posts.id.as("postsId"),
                        posts.title,
                        user.name.as("nickName"),
                        posts.modifiedDate.as("dateTime"),
                        posts.countLikeIt
                ))
                .from(posts)
                .leftJoin(user).on(posts.uid.eq(user.id))
                .where(posts.title.contains(search))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(posts.id.desc())
                .fetch();
    }

    public long getCountAllPosts(String search, Pageable pageable){
        double count =  queryFactory
                .select(posts.count())
                .from(posts)
                .where(posts.title.contains(search))
                .fetch().get(0);

        return (long) Math.ceil(count/Double.valueOf(pageable.getPageSize()));
    }

    public List<PostsListResponseDto> searchLikeItPosts(Long uid, String search, Pageable pageable){
        return queryFactory
                .select(Projections.constructor(PostsListResponseDto.class,
                        posts.id.as("postsId"),
                        posts.title,
                        user.name.as("nickName"),
                        posts.modifiedDate.as("dateTime"),
                        posts.countLikeIt
                ))
                .from(posts)
                .leftJoin(user).on(posts.uid.eq(user.id))
                .leftJoin(likeIt).on(posts.id.eq(likeIt.postsId))
                .where(likeIt.uid.eq(uid).and(likeIt.postsId.eq(posts.id)).and(posts.title.contains(search)))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(posts.id.desc())
                .fetch();
    }

    public long getCountAllPosts(Long uid, String search, Pageable pageable){
        double count =  queryFactory
                .select(posts.count())
                .from(posts)
                .leftJoin(likeIt).on(posts.id.eq(likeIt.postsId))
                .where(likeIt.uid.eq(uid).and(likeIt.postsId.eq(posts.id)).and(posts.title.contains(search)))
                .fetch().get(0);

        return (long) Math.ceil(count/Double.valueOf(pageable.getPageSize()));
    }

    public PostsResponseDto findByPosts(Long postsId){
        return queryFactory
                .select(Projections.constructor(PostsResponseDto.class,
                        user.id.as("uid"),
                        posts.id.as("postsId"),
                        posts.title,
                        posts.content,
                        user.name.as("nickName")
                ))
                .from(posts)
                .leftJoin(user).on(posts.uid.eq(user.id))
                .where(posts.id.eq(postsId))
                .fetchOne();
    }

    public long deleteByUidAll(Long uid){
        return queryFactory
                .delete(posts)
                .where(posts.uid.eq(uid))
                .execute();
    }

}
