package com.brandnew.saw.domain.file;

import com.brandnew.saw.web.dto.file.GetImageNameDto;
import com.brandnew.saw.web.dto.manage.EatListResponseDto;
import jakarta.transaction.Transactional;

import java.util.List;

public interface ImageFileRepositoryCustom {

    List<GetImageNameDto> findByImageSaveName(Long postsId);

    Long getImageMaxNum(long postsId);

    @Transactional
    long deleteByImageSaveName(long postsId, String imageSaveName);

    @Transactional
    long deleteInPostsId(Long postsId);

}

