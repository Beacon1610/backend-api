package com.company.backend_api.config;

import com.company.backend_api.security.JwtAuthenticationFilter;
import com.company.backend_api.security.JwtTokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtTokenProvider tokenProvider;

    public SecurityConfig(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    // 1. Khai báo bộ mã hóa mật khẩu BCrypt (Tiêu chuẩn doanh nghiệp: Không bao giờ lưu mật khẩu dạng chữ thô - plain text)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    // 2. Cấu hình quy tắc bảo mật cho các HTTP Request
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        JwtAuthenticationFilter jwtFilter = new JwtAuthenticationFilter(tokenProvider);
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/h2-console/**").permitAll()
                                // Các API ai cũng truy cập được (Đăng ký, Đăng nhập)
                                .requestMatchers("/api/auth/**").permitAll()

                                // Ví dụ: API Xóa đơn hàng (DELETE) chỉ dành cho ADMIN
                        .requestMatchers(org.springframework.http.HttpMethod.DELETE, "/api/orders/**").hasRole("ADMIN")

                                // Các API GET, POST, PUT còn lại yêu cầu phải đăng nhập (USER hoặc ADMIN đều được)
                                .requestMatchers("/api/orders/**").authenticated()

                                .anyRequest().authenticated());

        // Đưa trạm gác JWT vào trước bộ lọc mặc định của Spring Security
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


}