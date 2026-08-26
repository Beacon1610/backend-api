package com.company.backend_api.controller;

import com.company.backend_api.dto.LoginDto;
import com.company.backend_api.entity.UserEntity;
import com.company.backend_api.repository.UserRepository;
import com.company.backend_api.security.JwtTokenProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    // 1. API Đăng ký tài khoản mẫu
    @PostMapping("/register")
    public String register(@RequestBody LoginDto registerDto) {
        if(userRepository.findByUsername(registerDto.getUsername()).isPresent()) {
            return "Username đã tồn tại trong hệ thống!";
        }

        UserEntity user = new UserEntity();
        user.setUsername(registerDto.getUsername());
        // Bắt buộc phải mã hóa mật khẩu bằng BCrypt trước khi lưu vào DB
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setRole("ROLE_USER");
// Nếu username bạn nhập vào có chữ "admin", hệ thống tự động cho quyền ROLE_ADMIN
        if (registerDto.getUsername().toLowerCase().contains("admin")) {
            user.setRole("ROLE_ADMIN");
        } else {
            user.setRole("ROLE_USER");
        }
        userRepository.save(user);
        return "Đăng ký thành công tài khoản: " + registerDto.getUsername() + " với quyền: " + user.getRole();
    }

    // 2. API Đăng nhập để nhận Token (JWT)
    @PostMapping("/login")
    public String login(@RequestBody LoginDto loginDto) {
        // Tìm user trong DB
        UserEntity user = userRepository.findByUsername(loginDto.getUsername())
                .orElseThrow(() -> new RuntimeException("Sai tài khoản hoặc mật khẩu!"));

        // Kiểm tra mật khẩu (so sánh mật khẩu thô user nhập với mật khẩu đã băm trong DB)
        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Sai tài khoản hoặc mật khẩu!");
        }

        // Đăng nhập đúng -> Cấp vé JWT!
        String token = tokenProvider.generateToken(user.getUsername(), user.getRole());
        return "Bearer " + token; // Trả về token cho Client
    }
}