package com.brandnew.saw.config.jwt;

import com.brandnew.saw.config.Dto.SubjectDto;
import com.brandnew.saw.exception.BadRequestException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private static final Logger LOGGER = LoggerFactory.getLogger(JwtFilter.class);
    public static final String AUTHORIZATION_HEADER = "Authorization";

    private final TokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = resolveToken(request);
        String requestURI = request.getRequestURI();
        if(StringUtils.hasText(token) && tokenProvider.validateToken(token)){
            SubjectDto subject = tokenProvider.getSubject(token);
            if (subject.getType().equals("RTK") && !requestURI.equals("/reissue")) {
                LOGGER.info("토큰을 확인하세요., uri: {}", requestURI);
                throw new BadRequestException("토큰을 확인하세요.");
            }
            else {
                Authentication authentication = tokenProvider.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                LOGGER.info("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), requestURI);
            }
        }else{
            LOGGER.info("유효한 JWT 토큰이 없습니다., uri: {}", requestURI);
            throw new BadRequestException("유효한 JWT 토큰이 없습니다.");
        }

        filterChain.doFilter(request, response);
    }

    /**토큰 정보 추출 */
    private String resolveToken(HttpServletRequest request){
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        System.out.println("bearerToken : " + bearerToken);
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")){
            return bearerToken.substring(7);
        }
        return null;
    }

}
