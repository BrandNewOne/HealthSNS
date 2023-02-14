package com.brandnew.saw.web.posts;

import com.brandnew.saw.service.PostsService;
import com.brandnew.saw.web.dto.file.FileUpdateRequestDto;
import com.brandnew.saw.web.dto.file.FileUploadRequestDto;
import com.brandnew.saw.web.dto.posts.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;

import java.util.Map;


@RequiredArgsConstructor
@RestController
@RequestMapping("/posts")
public class PostsRestController {

    private final PostsService postsService;

    @GetMapping("main")
    public ResponseEntity<Map<String, Object>> main(@RequestParam(value = "uid", required = false) Long uid,
                                                    @RequestParam(value = "search", required = false) String search,
                                                    @PageableDefault(size=5) Pageable pageable) {
        return new ResponseEntity<>(postsService.findAllDesc(uid, search, pageable), HttpStatus.OK);
    }

//    @GetMapping("likeIt")
//    public ResponseEntity<Map<String, Object>> main(@RequestParam Long uid, @PageableDefault(size=5) Pageable pageable) {
//        return new ResponseEntity<>(postsService.findByLikeIt(uid,pageable), HttpStatus.OK);
//    }

    @PostMapping("save")
    public ResponseEntity<Object> savePosts(@Valid FileUploadRequestDto fileUploadRequestDto,
                                                BindingResult bindingResult) throws IOException {

        if (bindingResult.hasErrors()) {
            Map<String, String> result = new HashMap<>();
            for ( var error :bindingResult.getFieldErrors()){
                result.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(result,HttpStatus.BAD_REQUEST);
        }

        postsService.save(fileUploadRequestDto);

        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PutMapping("update")
    public ResponseEntity<Object> updatePosts(@Valid FileUpdateRequestDto fileUpdateRequestDto,
                                                           BindingResult bindingResult) throws IOException {
        if (bindingResult.hasErrors()) {
            Map<String, String> result = new HashMap<>();
            for ( var error :bindingResult.getFieldErrors()){
                result.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(result,HttpStatus.BAD_REQUEST);
        }

        postsService.update(fileUpdateRequestDto);

        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("update")
    public ResponseEntity<Map<String, Object>> updatePosts(@RequestParam Long postsId, @RequestParam Long id) {
        return new ResponseEntity<>(postsService.findPosts(postsId,id), HttpStatus.OK);
    }

    @PostMapping("saveL")
    public ResponseEntity<Map<String, Object>> saveLikeIt(@RequestBody PostsLikeItRequestDto requestDto) {
        Map<String, Object> likeState = postsService.saveL(requestDto);

        return new ResponseEntity<>(likeState, HttpStatus.OK);
    }

    @DeleteMapping("delete")
    public ResponseEntity<Map<String, Object>> delete(@RequestParam Long id, @RequestBody PostsDeleteRequestDto requestDto) {
        postsService.delete(id);

        return new ResponseEntity<>(null, HttpStatus.OK);
    }

}
