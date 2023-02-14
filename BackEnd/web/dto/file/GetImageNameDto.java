package com.brandnew.saw.web.dto.file;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@NoArgsConstructor
public class GetImageNameDto {

    private String orgNm;
    private String savedNm;
    private long size;

    @Builder
    public GetImageNameDto(String orgNm, String savedNm, long size){
        this.orgNm = orgNm;
        this.savedNm = savedNm;
        this.size = size;
    }
}
