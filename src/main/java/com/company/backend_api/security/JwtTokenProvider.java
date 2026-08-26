package com.company.backend_api.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {
    // Khóa bí mật dùng để ký token
    private final Key jwtSecret = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // Thời gian sống của token: 24 tiếng (tính bằng mili-giây)
    private final long jwtExpirationInMs = 86400000L;

    // 1. Hàm tạo JWT Token nhận trực tiếp username và role (Khớp hoàn toàn với AuthController)
    public String generateToken(String username, String role) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(username)
                .claim("roles", role) // Truyền trực tiếp chuỗi role (ví dụ: "ROLE_ADMIN")
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(jwtSecret)
                .compact();
    }

    // 2. Hàm lấy ra username từ trong Token đã được giải mã
    public String getUsernameFromJWT(String token) {
        Claims claims = getAllClaimsFromToken(token);
        return claims.getSubject();
    }

    // 3. Hàm kiểm tra token có hợp lệ hay không
    public boolean validateToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(jwtSecret).build().parseClaimsJws(authToken);
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            return false;
        }
    }

    // 4. Hàm hỗ trợ lấy toàn bộ Claims từ token
    public Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(jwtSecret)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}