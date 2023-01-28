package com.brandnew.saw.web.file;

import com.brandnew.saw.service.FileService;
import com.brandnew.saw.web.dto.file.FileUpdateRequestDto;
import com.brandnew.saw.web.dto.file.FileUploadRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/file")
@RestController
public class ImageFileRestController {

    private final FileService fileService;


    @GetMapping("/upload")
    public ResponseEntity<Map<String, Object>> testUploadForm() {

        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> uploadFile(FileUploadRequestDto fileUploadRequestDto) throws IOException {

        return new ResponseEntity<>(fileService.saveFile(fileUploadRequestDto), HttpStatus.OK);
    }
    @PutMapping("/fileUpdate")
    public ResponseEntity<Map<String, Object>> fileUpdate(FileUpdateRequestDto fileUpdateRequestDto) throws IOException {
        System.out.println("들어옴 : " + fileUpdateRequestDto.getPostsId());
        return new ResponseEntity<>(fileService.updateFile(fileUpdateRequestDto), HttpStatus.OK);
    }
}
