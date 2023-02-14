package com.brandnew.saw.web.dto.file;

import com.brandnew.saw.domain.likeit.LikeIt;
import com.brandnew.saw.domain.posts.Posts;
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
public class FileUploadRequestDto {

    @NotBlank(message = "제목을 입력해주세요.")
    private String title;
    @NotBlank(message = "내용을 입력해주세요")
    private String content;
    private Long uid;
    private List<MultipartFile> files;

        public Posts toEntity(){
        return Posts.builder()
                .title(title)
                .content(content)
                .uid(uid)
                .build();
    }
//
//    @Builder
//    public FileUploadRequestDto(Long uid, List<MultipartFile> files){
//        this.uid = uid;
//        this.files = files;
//    }

}
