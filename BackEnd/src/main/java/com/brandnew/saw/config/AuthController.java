package com.brandnew.saw.config;

import com.brandnew.saw.config.Dto.TokenDto;
import com.brandnew.saw.config.jwt.JwtFilter;
import com.brandnew.saw.config.jwt.TokenProvider;
import com.brandnew.saw.exception.BadRequestException;
import com.brandnew.saw.web.dto.users.UserSignInResquestDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @PostMapping("/authenticate")
    public ResponseEntity<TokenDto> authorize(@Valid @RequestBody UserSignInResquestDto userSignInResquestDto, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            List<String> list = bindingResult.getFieldErrors().stream()
                    .map(FieldError::getDefaultMessage).collect(Collectors.toList());

            throw new BadRequestException(list.toString());
        }

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userSignInResquestDto.getEmail(), userSignInResquestDto.getPassword());

        try {
            //authenticationManagerBuilder가 호출되면서 DetailService가 로드됨.
            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

            SecurityContextHolder.getContext().setAuthentication(authentication);
            TokenDto token = tokenProvider.createTokensByLogin(authentication);

            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + token);
            return new ResponseEntity<>(token,httpHeaders,HttpStatus.OK);
        } catch (Exception e){
            System.out.println("authenticate Error");
            throw new BadRequestException("아이디 혹은 비밀번호를 확인하세요.");
        }

    }

    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> reissue(
            @AuthenticationPrincipal PrincipalDetails principalDetails
    ) throws JsonProcessingException {
        System.out.println("reissue 들어옴 : ");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        TokenDto token = tokenProvider.reissueAtk(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + token);
        return new ResponseEntity<>(token,httpHeaders,HttpStatus.OK);
    }

}