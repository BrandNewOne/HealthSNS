package com.brandnew.saw.web.dto.file;

import com.brandnew.saw.domain.likeit.LikeIt;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class FileUploadRequestDto {
    private Long uid;
    private List<MultipartFile> files;

    @Builder
    public FileUploadRequestDto(Long uid, List<MultipartFile> files){
        this.uid = uid;
        this.files = files;
    }

}
