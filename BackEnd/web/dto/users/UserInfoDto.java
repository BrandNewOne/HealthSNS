package com.brandnew.saw.web.dto.users;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@NoArgsConstructor
@Getter
@Setter
public class UserInfoDto {

    private Long id;
    @NotBlank(message = "닉네임은 필수 입력 값입니다.")
    private String name;

    private String password;


    @Builder
    public UserInfoDto(Long id, String name, String password ) {
        this.id = id;
        this.password = password;
        this.name = name;
    }

}
