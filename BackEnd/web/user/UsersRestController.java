package com.brandnew.saw.web.user;

import com.brandnew.saw.exception.BadRequestException;
import com.brandnew.saw.service.UsersService;
import com.brandnew.saw.web.dto.users.UserInfoDto;
import com.brandnew.saw.web.dto.users.UserSignUpRequestDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RequestMapping("/users")
@RestController
public class UsersRestController {

    private final UsersService usersService;

    @PostMapping("/save") // 회원가입
    public ResponseEntity<Map<String, Object>> signUp(@Valid @RequestBody UserSignUpRequestDto userSignUpRequestDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> list = bindingResult.getFieldErrors().stream()
                    .map(FieldError::getDefaultMessage).collect(Collectors.toList());
            throw new BadRequestException(list.toString());
        }

        usersService.save(userSignUpRequestDto);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @DeleteMapping("/delete") // 회원탈퇴
    public ResponseEntity<Map<String, Object>> signOut(@RequestParam Long id){
        System.out.println("회원탈퇴 들어옴 : " + id );
        usersService.delete(id);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PutMapping("/update") // 회원정보 수정
    public ResponseEntity<Map<String, Object>> userUpdate(@Valid @RequestParam Long id,  @RequestBody UserInfoDto userInfoDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new BadRequestException(bindingResult.toString());
        }
        System.out.println("수정 들어옴 : " + id );
        usersService.update(id, userInfoDto);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/info") // 회원정보 가져오기
    public ResponseEntity<Map<String, Object>> userUpdate(@RequestParam Long id) {
        System.out.println("회원정보 들어옴 : " + id);

        return new ResponseEntity<>(usersService.findByUser(id), HttpStatus.OK);
    }

    @DeleteMapping("/logout") // 로그아웃
    public ResponseEntity<Map<String, Object>> LogOut(@RequestParam Long id){
        System.out.println("로그아웃 들어옴 : " + id);
        usersService.deleteR(id);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

}
