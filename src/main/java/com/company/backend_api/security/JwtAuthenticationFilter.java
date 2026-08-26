package com.company.backend_api.security;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider tokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            // 1. Lấy token từ HTTP Request Header (Authorization: Bearer <token>)
            String jwt = getJwtFromRequest(request);

            // 2. Kiểm tra tính hợp lệ của token
            if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
                // Lấy username từ token
                String username = tokenProvider.getUsernameFromJWT(jwt);

                // Lấy ra toàn bộ claims từ token
                Claims claims = tokenProvider.getAllClaimsFromToken(jwt);
                String role = claims.get("roles", String.class);

                // Tạo danh sách quyền cho Spring Security nhận diện
                List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(role));

                // Xác thực thành công, truyền kèm authorities vào
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        username, null, authorities
                );
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
            } // <--- ĐÃ BỔ SUNG DẤU ĐÓNG NGOẶC CHO KHỐI IF NÀY!

        } catch (Exception ex) {
            logger.error("Không thể thiết lập xác thực người dùng trong security context", ex);
        }

        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}