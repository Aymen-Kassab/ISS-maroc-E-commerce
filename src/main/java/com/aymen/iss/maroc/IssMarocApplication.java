package com.aymen.iss.maroc;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.MultipartProperties;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class IssMarocApplication {

	public static void main(String[] args) {
		SpringApplication.run(IssMarocApplication.class, args);
	}

	@Bean
	public CommandLineRunner checkConfig(MultipartProperties multipartProperties) {
		return args -> {
			System.out.println("Max file size: " + multipartProperties.getMaxFileSize());
			System.out.println("Max request size: " + multipartProperties.getMaxRequestSize());
		};
	}
}