package com.zompany.employeesystem;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/employees/**")  // Apply to your employees endpoint
                .allowedOrigins("http://localhost:5173") // Allow the React frontend on localhost:5173
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // If you need to allow credentials (cookies or HTTP authentication)
    }
}
