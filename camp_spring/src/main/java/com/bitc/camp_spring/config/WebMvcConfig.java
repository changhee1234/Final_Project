package com.bitc.camp_spring.config;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class WebMvcConfig implements WebMvcConfigurer {
  public void addCorsMappings(CorsRegistry registry) {
    // addMapping(url) : 지정한 패턴에 맞는 페이지에 대해서 접근 권한을 확인
    // allowedOrigins(url) : 접근을 허용할 외부 url
    registry
        .addMapping("/**")
        .allowedOrigins("http://localhost:3000");
  }
}
