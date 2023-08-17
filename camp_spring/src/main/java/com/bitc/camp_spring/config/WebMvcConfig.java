package com.bitc.camp_spring.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//@SpringBootApplication
//public class WebMvcConfig {

//  public static void main(String[] args) {
//    SpringApplication.run(WebMvcConfig.class, args);
//  }
//
//  @Bean
//  public WebMvcConfigurer corsConfigurer() {
//    return new WebMvcConfigurer() {
//      @Override
//      public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/api/**")
//            .allowedOrigins("http://localhost:3000") // React 서버 주소
//            .allowedMethods("GET");
//      }
//    };
//  }
//}


public class WebMvcConfig implements WebMvcConfigurer {
  public void addCorsMappings(CorsRegistry registry) {
    // addMapping(url) : 지정한 패턴에 맞는 페이지에 대해서 접근 권한을 확인
    // allowedOrigins(url) : 접근을 허용할 외부 url
    registry
        .addMapping("/**")
        .allowedOrigins("http://localhost:3000");
  }


}