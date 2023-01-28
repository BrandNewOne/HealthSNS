package com.brandnew.saw.domain.file;

import com.brandnew.saw.web.dto.file.GetImageNameDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.brandnew.saw.domain.file.QImageFile.imageFile;
import static com.brandnew.saw.domain.posts.QPosts.posts;

@RequiredArgsConstructor
@Repository
public class ImageFileRepositoryImpl {
    private final JPAQueryFactory queryFactory;

    public List<GetImageNameDto> findByImageSaveName(Long imageId){
        return queryFactory
                //.select(imageFile.savedPath)
                .select(Projections.constructor(GetImageNameDto.class,imageFile.orgNm,imageFile.savedNm))
                .from(imageFile)
                .where(imageFile.imageId.eq(imageId))
                .fetch();
    }

    public  Long getImageMaxNum(){
        Long result = queryFactory
                        .select(imageFile.imageId)
                        .from(imageFile)
                        .orderBy(imageFile.imageId.desc())
                        .fetchFirst();

        if(result == null){
            return 0l;
        }
        return result+1;
    }

    @Transactional
    public  long deleteByImageSaveName(Long imageId, String imageSaveName){
        return queryFactory
                .delete(imageFile)
                .where(imageFile.imageId.eq(imageId).and(imageFile.savedNm.eq(imageSaveName)))
                .execute();

    }

    @Transactional
    public long deleteInPostsId(Long postsId){

        return queryFactory.delete(imageFile)
                        .where(imageFile.imageId.in(
                                queryFactory.select(posts.imageId)
                                        .from(posts)
                                        .where(posts.id.eq(postsId))
                                )
                        )
                .execute();
    }

}
