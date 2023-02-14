package com.brandnew.saw.domain.user;

import com.brandnew.saw.web.dto.users.UserSignUpRequestDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;


@NoArgsConstructor
@Getter
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @JsonIgnore
    private String password;

    @Column(nullable = false)
    private String role;


    @Builder
    public User(Long id, String name, String email, String password, String role){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public static User createUser(UserSignUpRequestDto userSignUpRequestDto, PasswordEncoder passwordEncoder) {
        User user = User.builder()
                .name(userSignUpRequestDto.getName())
                .email(userSignUpRequestDto.getEmail())
                .password(passwordEncoder.encode(userSignUpRequestDto.getPassword()))  //암호화처리
                .role("ROLE_USER")
                .build();
        return user;
    }

}
