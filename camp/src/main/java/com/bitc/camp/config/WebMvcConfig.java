package com.bitc.camp.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
@EnableWebMvc
public class  WebMvcConfig implements WebMvcConfigurer {
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
            .allowedOrigins("http://localhost:3000", "http://localhost:8080") // 허용할 도메인을 여기에 추가
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowCredentials(true);
  }

  @Value("${upload.dir}")
  private String uploadDir;

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    // 이미지 파일에 대한 매핑 추가
    registry.addResourceHandler("/uploaded-images/**")
            .addResourceLocations("file:" + uploadDir + "/");
  }
}
