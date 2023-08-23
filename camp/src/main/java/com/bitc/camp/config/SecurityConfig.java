package com.bitc.camp.config;

import com.bitc.camp.service.MemberDetailService;
import jakarta.servlet.DispatcherType;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
  private final MemberDetailService memberDetailService;

  @Bean
  public BCryptPasswordEncoder bCryptPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public WebSecurityCustomizer configure() {
    return web -> web.ignoring()
        .requestMatchers("/static/**");
  }


  // 해당 부분에서 권한별로 접속할 수 있는 페이지 지정 필요함
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf().disable()
            .cors(c -> c
                    .configurationSource(corsConfigurationSource()) // corsConfigurationSource 빈을 사용
            )
            .authorizeHttpRequests(req -> req
                    .dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()
                    .requestMatchers(
                            // ... 다른 permitAll 경로들 추가 ...
                            "/signup", "/member", "/board/", "/sms", "/login", "/logout", "/check-email", "/reserve/**", "/payments/**", "/user-info/**", "/modify", "/upload-profile-image"
                            , "/delete-account", "/addPartner", "/updatePartnerAccess", "/board/**"
                    ).permitAll()
                    .requestMatchers("/partner-page", "/partnerInfo/**").hasRole("PARTNER")
                    .requestMatchers("/admin-page").hasRole("ADMIN")
                    .anyRequest().authenticated())
            .formLogin(login -> login
                    .loginPage("/login") // 로그인 페이지 경로
                    .defaultSuccessUrl("http://localhost:3000/", true) // 로그인 성공 시 리다이렉트 경로
                    .permitAll())
            .logout(logout -> logout
                    .logoutUrl("/logout")
                    .logoutSuccessUrl("http://localhost:3000/")
                    .invalidateHttpSession(true)
                    .deleteCookies("JSESSIONID"))
            .userDetailsService(memberDetailService);

    return http.build();
  }

  @Bean
  public AuthenticationManager authenticationManager(HttpSecurity http, BCryptPasswordEncoder bCryptPasswordEncoder, MemberDetailService memberDetailService) throws Exception {
    return http.getSharedObject(AuthenticationManagerBuilder.class)
        .userDetailsService(memberDetailService)
        .passwordEncoder(bCryptPasswordEncoder)
        .and().build();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.addAllowedOrigin("http://localhost:3000"); // 허용할 도메인 설정
    configuration.addAllowedMethod("*"); // 모든 HTTP 메서드 허용
    configuration.addAllowedHeader("*"); // 모든 헤더 허용
    configuration.setAllowCredentials(true); // 인증정보 포함 허용

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }


}
