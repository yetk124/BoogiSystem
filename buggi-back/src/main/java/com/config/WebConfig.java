// CORS 공통 설정

package com.buggi.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    // 프론트(키오스크, 로컬 개발환경)에서 API 호출 허용
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins(
                                "http://localhost:5173",   // Vite dev server
                                "http://localhost:5174",
                                "http://localhost:3000",   // 기타
                                "http://키오스크IP:포트"      // 실제 키오스크 IP
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowCredentials(true);
            }
        };
    }
}

// 프론트에서 http://localhost:5173 같은 주소로 백엔드 API를 호출할 수 있게 해줌.