package com.brandnew.saw.web.dto.file;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class FileUpdateRequestDto {
    private Long postsId;
    private List<MultipartFile> files;
    private List<String> updateFiles;

    @Builder
    public FileUpdateRequestDto(Long postsId, List<MultipartFile> files, List<String> updateFiles){
        this.postsId = postsId;
        this.files = files;
        this.updateFiles = updateFiles;
    }

}
