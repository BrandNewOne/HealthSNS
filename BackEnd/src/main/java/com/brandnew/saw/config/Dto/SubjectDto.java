package com.brandnew.saw.config.Dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SubjectDto {

    private Long id;
    private String name;
    private String type;
    private String role;

    private SubjectDto(Long id, String name, String role, String type) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.type = type;
    }

    public static SubjectDto atk(Long id, String name, String role) {
        return new SubjectDto(id, name, role, "ATK");
    }

    public static SubjectDto rtk(Long id, String name, String role){
        return new SubjectDto(id, name, role,  "RTK");
    }
}