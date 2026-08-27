package com.company.backend_api.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class OrderControllerTest {
    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        // Đồng bộ hoàn toàn tên service là "mysql-db" với file ci.yml
        String dbHost = System.getenv("CI") != null ? "mysql-db" : "localhost";

        registry.add("spring.datasource.url", () ->
                "jdbc:mysql://" + dbHost + ":3306/backend_db?allowPublicKeyRetrieval=true&useSSL=false&serverTimezone=UTC"
        );

        // Bắt buộc phải có 2 dòng này để khớp mật khẩu trên GitHub Actions
        registry.add("spring.datasource.username", () -> "root");
        registry.add("spring.datasource.password", () -> System.getenv("CI") != null ? "" : "root123");
    }
    // MockMvc giống như một chiếc Postman thu nhỏ được nhúng sẵn vào code
    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser(username = "testuser", roles = {"USER"}) // Giả lập có người đã đăng nhập hợp lệ
    public void testGetAllOrders_ShouldReturnPaginationData() throws Exception {

        // Thực hiện hành động gọi API GET y hệt như Postman
        mockMvc.perform(get("/api/orders?page=0&size=3"))

                // 1. Kiểm tra xem mã trả về có phải là 200 OK không
                .andExpect(status().isOk())

                // 2. Kiểm tra xem trong cục JSON trả về có mảng "content" không
                .andExpect(jsonPath("$.content").exists())

                // 3. Kiểm tra xem có cấu trúc "pageable" không
                .andExpect(jsonPath("$.pageable").exists());
    }
}