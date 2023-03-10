package com.brandnew.saw.config.jwt;

import com.brandnew.saw.config.Dto.SubjectDto;
import com.brandnew.saw.config.Dto.TokenDto;
import com.brandnew.saw.config.redis.RedisDao;
import com.brandnew.saw.domain.user.UserRepository;
import com.brandnew.saw.exception.BadRequestException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Duration;
import java.util.*;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class TokenProvider implements InitializingBean {

    private final ObjectMapper objectMapper;
    private final RedisDao redisDao;

    private final UserRepository userRepository;

    private final Logger LOGGER = LoggerFactory.getLogger(TokenProvider.class);
    private static final String AUTHORITIES_KEY = "ROLE";



    @Value("${spring.jwt.secret}")
    private String secret;
    @Value("${spring.jwt.live.atk}")
    private long atkLive;
    @Value("${spring.jwt.live.rtk}")
    private long rtkLive;

    private Key key;


    @Override
    public void afterPropertiesSet() throws Exception {
        byte[] keyBytes = Base64.getDecoder().decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public TokenDto createTokensByLogin(Authentication authentication) throws JsonProcessingException {

        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        System.out.println("authentication : " + authentication.getAuthorities());
        System.out.println("authentication : " + authentication.getName());
        System.out.println("authentication : " + authorities);

        com.brandnew.saw.domain.user.User user = getUser(authentication.getName());

        SubjectDto atkSubjectDto = SubjectDto.atk(
                user.getId(),user.getName(),authorities);
        SubjectDto rtkSubjectDto = SubjectDto.rtk(
                user.getId(),user.getName(),authorities);

        String atk = createToken(atkSubjectDto, atkLive);
        String rtk = createToken(rtkSubjectDto, rtkLive);

        redisDao.setValues(user.getId().toString(), rtk, Duration.ofMillis(rtkLive));
        return new TokenDto(atk, rtk);
    }

    /**token ?????? algorithm */
    public String createToken(SubjectDto subjectDto, Long tokenLive) throws JsonProcessingException {

        String subjectStr = objectMapper.writeValueAsString(subjectDto);
        Claims claims = Jwts.claims().setSubject(subjectStr);

        long now = (new Date()).getTime();
        Date validityArtLive = new Date(now + tokenLive);

        return Jwts.builder()
                .setClaims(claims)
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(validityArtLive)
                .compact();
    }

    /**?????? ?????? ?????? */
    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.getSubject().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        UserDetails principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    /**token ????????? ?????? */
    public boolean validateToken(String token){
        try{
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        }catch(io.jsonwebtoken.security.SecurityException | MalformedJwtException e){
            LOGGER.info("????????? JWT ???????????????.");
        }catch(ExpiredJwtException e){
            LOGGER.info("????????? JWT ???????????????.");
        }catch(UnsupportedJwtException e){
            LOGGER.info("???????????? ?????? JWT ???????????????.");
        }catch(IllegalArgumentException e){
            LOGGER.info("JWT ????????? ?????????????????????.");
        }
        return false;
    }

    public SubjectDto getSubject(String atk) throws JsonProcessingException {
        String subjectStr = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(atk).getBody().getSubject();
        return objectMapper.readValue(subjectStr, SubjectDto.class);
    }

    public TokenDto reissueAtk(Authentication authentication) throws JsonProcessingException {

        Map<String, String> userInfo = new ObjectMapper().readValue(authentication.getName(), new TypeReference<Map<String, String>>() {});

        String rtkInRedis = redisDao.getValues(userInfo.get("id"));

        if (Objects.isNull(rtkInRedis)) throw new IllegalAccessError("?????? ????????? ?????????????????????.");

        SubjectDto atkSubject = SubjectDto.atk(
                Long.parseLong(userInfo.get("id")), userInfo.get("name"), userInfo.get("role"));
        String atk = createToken(atkSubject, atkLive);
        return new TokenDto(atk, null);
    }

    private com.brandnew.saw.domain.user.User getUser(String userEmail){
        com.brandnew.saw.domain.user.User entity = userRepository.findByEmail(userEmail).orElseThrow(
                () -> new BadRequestException("?????? ????????? ????????????.")
        );

        return entity;
    }
}