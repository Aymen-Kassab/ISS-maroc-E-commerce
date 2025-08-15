package com.aymen.iss.maroc.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "ddkmvz16e",
                "api_key", "753996525744593",
                "api_secret", "JQP41jtF5U217Wi-Qk86F46MzC8"
        ));
    }
}

