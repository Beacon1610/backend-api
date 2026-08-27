package com.company.backend_api.security;

import com.company.backend_api.controller.AuthController;
import com.company.backend_api.dto.LoginDto;
import com.company.backend_api.entity.UserEntity;
import com.company.backend_api.repository.UserRepository;
import com.company.backend_api.security.JwtTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AuthControllerTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtTokenProvider tokenProvider;

    @InjectMocks
    private AuthController authController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // --- TEST 1: Đăng ký thành công tài khoản User thường ---
    @Test
    void testRegister_SuccessUser() {
        LoginDto dto = new LoginDto();
        dto.setUsername("normal_user");
        dto.setPassword("123456");

        when(userRepository.findByUsername("normal_user")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("123456")).thenReturn("encoded_password");
        when(userRepository.save(any(UserEntity.class))).thenReturn(new UserEntity());

        String response = authController.register(dto);

        assertNotNull(response);
        assertTrue(response.contains("Đăng ký thành công"));
        assertTrue(response.contains("ROLE_USER"));
        verify(userRepository, times(1)).save(any(UserEntity.class));
    }

    // --- TEST 2: Đăng ký thành công tài khoản Admin (chứa chữ admin) ---
    @Test
    void testRegister_SuccessAdmin() {
        LoginDto dto = new LoginDto();
        dto.setUsername("admin_boss");
        dto.setPassword("123456");

        when(userRepository.findByUsername("admin_boss")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("123456")).thenReturn("encoded_password");
        when(userRepository.save(any(UserEntity.class))).thenReturn(new UserEntity());

        String response = authController.register(dto);

        assertNotNull(response);
        assertTrue(response.contains("ROLE_ADMIN"));
    }

    // --- TEST 3: Đăng ký thất bại do trùng Username ---
    @Test
    void testRegister_UsernameAlreadyExists() {
        LoginDto dto = new LoginDto();
        dto.setUsername("existing_user");
        dto.setPassword("123456");

        when(userRepository.findByUsername("existing_user")).thenReturn(Optional.of(new UserEntity()));

        String response = authController.register(dto);

        assertEquals("Username đã tồn tại trong hệ thống!", response);
        verify(userRepository, never()).save(any(UserEntity.class));
    }

    // --- TEST 4: Đăng nhập thành công trả về Token ---
    @Test
    void testLogin_Success() {
        LoginDto dto = new LoginDto();
        dto.setUsername("admin_pro");
        dto.setPassword("123456");

        UserEntity mockUser = new UserEntity();
        mockUser.setUsername("admin_pro");
        mockUser.setPassword("encoded_password");
        mockUser.setRole("ROLE_ADMIN");

        when(userRepository.findByUsername("admin_pro")).thenReturn(Optional.of(mockUser));
        when(passwordEncoder.matches("123456", "encoded_password")).thenReturn(true);
        when(tokenProvider.generateToken("admin_pro", "ROLE_ADMIN")).thenReturn("mocked_jwt_token");

        String response = authController.login(dto);

        assertNotNull(response);
        assertTrue(response.startsWith("Bearer "));
        assertTrue(response.contains("mocked_jwt_token"));
    }

    // --- TEST 5: Đăng nhập thất bại do sai mật khẩu ---
    @Test
    void testLogin_WrongPassword() {
        LoginDto dto = new LoginDto();
        dto.setUsername("admin_pro");
        dto.setPassword("wrong_password");

        UserEntity mockUser = new UserEntity();
        mockUser.setUsername("admin_pro");
        mockUser.setPassword("encoded_password");

        when(userRepository.findByUsername("admin_pro")).thenReturn(Optional.of(mockUser));
        when(passwordEncoder.matches("wrong_password", "encoded_password")).thenReturn(false);

        Exception exception = assertThrows(RuntimeException.class, () -> {
            authController.login(dto);
        });

        assertEquals("Sai tài khoản hoặc mật khẩu!", exception.getMessage());
    }
}