package com.socialnetwork.api.security;

import com.socialnetwork.api.filter.JwtAuthFilter;
import com.socialnetwork.api.security.oauth2.CustomOAuth2UserService;
import com.socialnetwork.api.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import com.socialnetwork.api.security.oauth2.OAuth2AuthenticationFailureHandler;
import com.socialnetwork.api.security.oauth2.OAuth2AuthenticationSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  private final JwtAuthFilter jwtAuthFilter;

  private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

  private final CustomOAuth2UserService customOAuth2UserService;

  private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

  private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

  private final HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;

  @Bean
  public HttpCookieOAuth2AuthorizationRequestRepository cookieAuthorizationRequestRepository() {
    return new HttpCookieOAuth2AuthorizationRequestRepository();
  }

  @Bean
  public PasswordEncoder encoder() {
    return new BCryptPasswordEncoder();
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.cors().and()
            .csrf().disable()
            .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint)
            .and()
            .headers().frameOptions().disable();

    http.authorizeRequests()
            .antMatchers("/auth/**", "/oauth2/**")
            .permitAll()
            .anyRequest()
            .authenticated();

    http.oauth2Login()
            .authorizationEndpoint()
            .baseUri("/oauth2/authorize")
            .authorizationRequestRepository(cookieAuthorizationRequestRepository())
            .and()
            .redirectionEndpoint()
            .baseUri("/oauth2/callback/*")
            .and()
            .userInfoEndpoint()
            .userService(customOAuth2UserService)
            .and()
            .successHandler(oAuth2AuthenticationSuccessHandler)
            .failureHandler(oAuth2AuthenticationFailureHandler);

    http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
  }
}