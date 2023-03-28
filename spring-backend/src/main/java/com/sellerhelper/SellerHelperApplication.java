package com.sellerhelper;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

@SpringBootApplication
@EnableJpaRepositories
public class SellerHelperApplication {
	public static void main(String[] args) {
		SpringApplication.run(SellerHelperApplication.class, args);
	}
}
