package com.company.backend_api.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(properties = "spring.datasource.url=jdbc:mysql://localhost:3306/backend_db?allowPublicKeyRetrieval=true&useSSL=false&serverTimezone=UTC")
@AutoConfigureMockMvc
public class OrderControllerTest {

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