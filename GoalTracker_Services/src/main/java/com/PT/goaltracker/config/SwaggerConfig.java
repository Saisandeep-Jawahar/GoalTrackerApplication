package com.gtView.goaltracker.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;

@Configuration
public class SwaggerConfig {
	@Value("${swagger.topic}")
	String title;
	
	@Value("${swagger.description}")
	String description;
	
	@Value("${swagger.version}")
	String version;
	
	@Value("${swagger.license.name}")
	String license;
	
	@Value("${swagger.license.url}")
	String licenseUrl;
	

	@Bean
    public OpenAPI springShopOpenAPI() {
        return new OpenAPI()
                .info(new Info().title(title)
                .description(description)
                .version(version)
                .license(new License().name(license).url(licenseUrl)));
    }

}
