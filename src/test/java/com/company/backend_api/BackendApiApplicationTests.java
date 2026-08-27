package com.company.backend_api;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;

@SpringBootTest
class BackendApiApplicationTests {

	@DynamicPropertySource
	static void configureProperties(DynamicPropertyRegistry registry) {
		String dbHost = System.getenv("CI") != null ? "mysql-db" : "localhost";

		registry.add("spring.datasource.url", () ->
				"jdbc:mysql://" + dbHost + ":3306/backend_db?allowPublicKeyRetrieval=true&useSSL=false&serverTimezone=UTC"
		);
		registry.add("spring.datasource.username", () -> "root");
		registry.add("spring.datasource.password", () -> System.getenv("CI") != null ? "" : "root123");
	}

	@Test
	void contextLoads() {
	}

}