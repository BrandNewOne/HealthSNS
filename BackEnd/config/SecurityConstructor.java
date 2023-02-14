package com.brandnew.saw.config;

import com.brandnew.saw.config.jwt.JwtSecurityConfig;
import com.brandnew.saw.config.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConstructor{

    private final TokenProvider tokenProvider;

    // 비밀번호 암호화
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/css/**", "/js/**", "/img/**", "/h2-console/**","/users/signIn","/users/signUp","/users/checkEmail","/users/save","/authenticate","/mail/**","/test/**");
    }

    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors().and().csrf().disable()
                /** HttpServletRequest를 사용하는 요청들에 대한 접근 제한 설정*/
                .authorizeHttpRequests()// 요청에 대한 권한 설정
                //.requestMatchers("/signIn","/signUp","/login/saveSignUp","/authenticate").permitAll()
                .requestMatchers("/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .headers()
                .addHeaderWriter(new XFrameOptionsHeaderWriter(
                        XFrameOptionsHeaderWriter.XFrameOptionsMode.SAMEORIGIN))
                /** 로그인 관련 설정 */
//                .and()
//                .formLogin() // Form Login 설정
//                .loginPage("/signIn") // 로그인 페이지
//                .loginProcessingUrl("/login/customSignIn")
//                .usernameParameter("email")
//                .defaultSuccessUrl("/homepage",true)
//                .failureUrl("/signIn")
                /** 로그아웃 관련 설정 */
//                .and()
//                .logout()
//                .logoutSuccessUrl("/signIn")
//                .invalidateHttpSession(true)
                /**401, 403 Exception 핸들링 */
//                .and()
//                /**401, 403 Exception 핸들링 */
//                .exceptionHandling()
//                .authenticationEntryPoint(jwtAtuthenticationEntryPoint)
//                .accessDeniedHandler(jwtAccessDeniedHandler)

                /**세션 사용하지 않음*/
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                /**JwtSecurityConfig 적용 */
                .and()
                .apply(new JwtSecurityConfig(tokenProvider));

        return http.build();

    }


}
