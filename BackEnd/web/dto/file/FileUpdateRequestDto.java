package com.brandnew.saw.web.dto.file;

import jakarta.validation.constraints.NotBlank;
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
    @NotBlank(message = "제목을 입력해주세요.")
    private String title;
    @NotBlank(message = "내용을 입력해주세요")
    private String content;
    private Long uid;
    private List<MultipartFile> files;
    private List<String> updateFiles;

//    @Builder
//    public FileUpdateRequestDto(Long postsId, String title, String content, List<MultipartFile> files, List<String> updateFiles){
//        this.postsId = postsId;
//        this.title = title;
//        this.content = content;
//        this.files = files;
//        this.updateFiles = updateFiles;
//    }

}
