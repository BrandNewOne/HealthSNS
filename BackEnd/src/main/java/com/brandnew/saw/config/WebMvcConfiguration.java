package com.brandnew.saw.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry){
        System.out.println("addResourceHandlers 들어옴");
        registry.addResourceHandler("/img/**").addResourceLocations("file:////Users/brandnew1/SpringProject/img/");
    }
}
