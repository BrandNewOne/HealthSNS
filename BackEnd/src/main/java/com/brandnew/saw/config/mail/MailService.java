package com.brandnew.saw.config.mail;

import com.brandnew.saw.config.redis.RedisDao;
import com.brandnew.saw.domain.user.UserRepository;
import com.brandnew.saw.exception.BadRequestException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender mailSender;
    private final UserRepository userRepository;
    private final RedisDao redisDao;

    @Value("${myemail}")
    private String myEmail;

    // 메일 보내기
    public Map<String, Object> sendMail(String mail){
        if(userRepository.existsByEmail(mail)){
            throw new BadRequestException("사용 불가능한 이메일입니다.");
        }
        try{
            MimeMessage emailForm = createEmailForm(mail);
            mailSender.send(emailForm);
            Map<String, Object> result = new HashMap<>();
            result.put("message", "사용가능한 아이디입니다.");
            return result;
        }
        catch (Exception e){
            throw new BadRequestException("이메일을 다시 확인해주세요.");
        }

    }

    //인증확인
    public void authMail(String email, String auth) {
        System.out.println(email + " , "+ auth);
        String emailInRedis = redisDao.getValues(email);
        System.out.println("인증번호 : " + emailInRedis);
        if(emailInRedis.equals(auth)){
            redisDao.setValues(email,"authEmail",Duration.ofMillis(600000));
        }
        else if (Objects.isNull(emailInRedis)) {
            throw new BadRequestException("인증가능 시간이 초과되었습니다.");
        }
        else{
            throw new BadRequestException("인증번호를 다시 확인해주세요.");
        }

    }

    private String createdCode() {
        int leftLimit = 48; // number '0'
        int rightLimit = 122; // alphabet 'z'
        int targetStringLength = 6;
        Random random = new Random();

        return random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <=57 || i >=65) && (i <= 90 || i>= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }


        // 메일 반환
    private MimeMessage createEmailForm(String email) throws MessagingException {

        String authCode = createdCode();

        MimeMessage message = mailSender.createMimeMessage();
        message.addRecipients(MimeMessage.RecipientType.TO, email);
        message.setSubject("안녕하세요 인증번호입니다.");
        message.setFrom(myEmail);
        message.setText(authCode, "utf-8", "html");

        redisDao.setValues(email, authCode, Duration.ofMillis(60000));

        return message;
    }

//    public Map<String, Object> isUser(String userEmail){
//
//        if(userRepository.existsByEmail(userEmail)){
//            throw new BadRequestException("사용 불가능한 이메일입니다.");
//        }
//
//        Map<String, Object> result = new HashMap<>();
//        result.put("message", "사용 가능한 이메일입니다.");
//        return result;
//    }
}