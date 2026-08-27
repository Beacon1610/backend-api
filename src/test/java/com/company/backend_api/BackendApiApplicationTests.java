package com.company.backend_api;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = "spring.datasource.url=jdbc:mysql://localhost:3306/backend_db?allowPublicKeyRetrieval=true&useSSL=false&serverTimezone=UTC")
class BackendApiApplicationTests {

	@Test
	void contextLoads() {
	}

}
