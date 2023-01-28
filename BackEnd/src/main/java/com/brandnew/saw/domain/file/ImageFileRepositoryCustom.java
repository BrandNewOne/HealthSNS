package com.brandnew.saw.domain.file;

import com.brandnew.saw.web.dto.file.GetImageNameDto;
import com.brandnew.saw.web.dto.manage.EatListResponseDto;
import jakarta.transaction.Transactional;

import java.util.List;

public interface ImageFileRepositoryCustom {

    List<GetImageNameDto> findByImageSaveName(Long imageId);

    Long getImageMaxNum();

    @Transactional
    long deleteByImageSaveName(Long imageId, String imageSaveName);

    @Transactional
    long deleteInPostsId(Long postsId);

}

