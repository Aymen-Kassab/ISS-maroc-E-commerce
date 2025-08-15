package com.aymen.iss.maroc.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/news_pictures/**")
                .addResourceLocations("file:news_pictures/");
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }
}

