package com.brandnew.saw.config.mail;

import com.brandnew.saw.service.UsersService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/mail")
@RestController
public class MailController {

    private final MailService mailService;

    @PostMapping("sendMail")
    public ResponseEntity<Map<String, Object>> sendMail(@RequestParam String email) throws MessagingException {
        System.out.println("email : " + email);
        Map<String, Object> result = mailService.sendMail(email);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("authMail")
    public ResponseEntity<Map<String, Object>> authMail(@RequestParam String auth, String email) throws MessagingException {
        mailService.authMail(email, auth);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

}