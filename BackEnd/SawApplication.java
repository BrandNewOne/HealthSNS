package com.brandnew.saw;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing // Auditing 활성화
@SpringBootApplication
public class SawApplication {

	public static void main(String[] args) {
		SpringApplication.run(SawApplication.class, args);
	}

}
