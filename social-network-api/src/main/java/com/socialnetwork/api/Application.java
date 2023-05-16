package com.socialnetwork.api;

import com.socialnetwork.api.configs.AppProperties;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
//@EnableConfigurationProperties(AppProperties.class)
public class Application {
  public static void main(String[] args) {
    SpringApplication.run(Application.class);
  }

  @Bean
  public ModelMapper modelMapper() {
    return new ModelMapper();
  }
}
