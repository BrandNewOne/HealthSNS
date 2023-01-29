package com.brandnew.saw.web.posts;

import com.brandnew.saw.service.PostsService;
import com.brandnew.saw.web.dto.posts.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/posts")
public class PostsRestController {

    private final PostsService postsService;

    @GetMapping("main")
    public ResponseEntity<Map<String, Object>> main(@RequestParam(value = "uid", required = false) Long uid, @RequestParam(value = "search", required = false) String search, @PageableDefault(size=5) Pageable pageable) {
        System.out.println("Search : " + search);
        System.out.println("uid : " + search);
        return new ResponseEntity<>(postsService.findAllDesc(uid, search, pageable), HttpStatus.OK);
    }

//    @GetMapping("likeIt")
//    public ResponseEntity<Map<String, Object>> main(@RequestParam Long uid, @PageableDefault(size=5) Pageable pageable) {
//        return new ResponseEntity<>(postsService.findByLikeIt(uid,pageable), HttpStatus.OK);
//    }

    @PostMapping("save")
    public ResponseEntity<Map<String, Object>> savePosts(@RequestBody PostsSaveRequestDto requestDto) {
        postsService.save(requestDto);

        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PutMapping("update")
    public ResponseEntity<Map<String, Object>> updatePosts(@RequestParam Long postsId, @RequestBody PostsUpdateRequestDto requestDto) {
        postsService.update(postsId, requestDto);

        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("update")
    public ResponseEntity<Map<String, Object>> updatePosts(@RequestParam Long postsId, @RequestParam Long id) {
        return new ResponseEntity<>(postsService.findPosts(postsId,id), HttpStatus.OK);
    }

    @PostMapping("saveL")
    public ResponseEntity<Map<String, Object>> saveLikeIt(@RequestBody PostsLikeItRequestDto requestDto) {
        System.out.println("saveL  들어옴");
        Map<String, Object> likeState = postsService.saveL(requestDto);

        return new ResponseEntity<>(likeState, HttpStatus.OK);
    }

    @DeleteMapping("delete")
    public ResponseEntity<Map<String, Object>> delete(@RequestParam Long id, @RequestBody PostsDeleteRequestDto requestDto) {
        System.out.println("deletePosts uid: "+requestDto.getUid() + ", id : " + id);
        postsService.delete(id);

        return new ResponseEntity<>(null, HttpStatus.OK);
    }

}
