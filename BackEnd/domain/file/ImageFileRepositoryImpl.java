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

    public List<GetImageNameDto> findByImageSaveName(Long postsId){
        return queryFactory
                .select(Projections.constructor(GetImageNameDto.class, imageFile.orgNm, imageFile.savedNm, imageFile.size))
                .from(imageFile)
                .where(imageFile.imageFileId.postsId.eq(postsId))
                .fetch();
    }

    public  Long getImageMaxNum(long postsId){
        Long result = queryFactory
                .select(imageFile.imageFileId.imageId)
                .from(imageFile)
                .where(imageFile.imageFileId.postsId.eq(postsId))
                .orderBy(imageFile.imageFileId.imageId.desc())
                .fetchFirst();

        if(result == null){
            return 0l;
        }
        return result+1;
    }

    @Transactional
    public  long deleteByImageSaveName(long postsId, String imageSaveName){
        return queryFactory
                .delete(imageFile)
                .where(imageFile.imageFileId.postsId.eq(postsId).and(imageFile.savedNm.eq(imageSaveName)))
                .execute();

    }

    @Transactional
    public long deleteInPostsId(Long postsId){

        return queryFactory.delete(imageFile)
                        .where(imageFile.imageFileId.postsId.eq(postsId)).execute();
    }

}
