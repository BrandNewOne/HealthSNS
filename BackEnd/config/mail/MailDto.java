package com.brandnew.saw.config.mail;


import lombok.Data;

@Data
public class MailDto {
    private String address;
    private String title;
    private String message;
}