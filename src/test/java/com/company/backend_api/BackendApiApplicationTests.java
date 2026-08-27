package com.company.backend_api;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;

@SpringBootTest
class BackendApiApplicationTests {
	@DynamicPropertySource
	static void configureProperties(DynamicPropertyRegistry registry) {
		// Nếu đang chạy trên GitHub Actions, nó sẽ tự hiểu "mysql" là tên service.
		// Còn ở máy cá nhân, nếu không tìm thấy "mysql", nó sẽ tự fallback về "localhost".
		String dbHost = System.getenv("CI") != null ? "mysql" : "localhost";
		registry.add("spring.datasource.url", () ->
				"jdbc:mysql://" + dbHost + ":3306/backend_db?allowPublicKeyRetrieval=true&useSSL=false&serverTimezone=UTC"
		);
	}
	@Test
	void contextLoads() {
	}

}
