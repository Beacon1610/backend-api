package com.company.backend_api;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Áp dụng cho toàn bộ API trong hệ thống
                .allowedOrigins("http://localhost:5173", "http://localhost:5174") // Cho phép các cổng Vite local
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS") // Cho phép các hành động
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
