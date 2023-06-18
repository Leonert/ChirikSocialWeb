package com.socialnetwork.api.configs;

import com.socialnetwork.api.filter.JwtAuthFilter;
import com.socialnetwork.api.security.jwt.JwtAuthenticationEntryPoint;
import com.socialnetwork.api.security.oauth2.CustomOAuth2UserService;
import com.socialnetwork.api.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import com.socialnetwork.api.security.oauth2.OAuth2AuthenticationFailureHandler;
import com.socialnetwork.api.security.oauth2.OAuth2AuthenticationSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  private final CustomOAuth2UserService customOAuth2UserService;
  private final OAuth2AuthenticationSuccessHandler oauth2AuthenticationSuccessHandler;
  private final OAuth2AuthenticationFailureHandler oauth2AuthenticationFailureHandler;
  private final HttpCookieOAuth2AuthorizationRequestRepository httpOAuth2RequestRepository;
  private final JwtAuthFilter jwtAuthFilter;
  private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

  @Bean
  public PasswordEncoder encoder() {
    return new BCryptPasswordEncoder();
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
            .cors()
            .and()
            .httpBasic()
            .disable()
            .csrf()
            .disable()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
            .antMatchers("/",
                    "/error",
                    "/favicon.ico",
                    "/**/*.png",
                    "/**/*.gif",
                    "/**/*.svg",
                    "/**/*.jpg",
                    "/**/*.html",
                    "/**/*.css",
                    "/**/*.js")
            .permitAll()
            .antMatchers(
                    "/oauth/**",
                    "/oauth2/**",
                    "/h2-console/**",
                    "/api/login/**",
                    "/api/registration/**",
                    "/api/trends/**")
            .permitAll()
            .antMatchers(HttpMethod.GET, "/api/users/**", "/api/posts/**", "/api/search/**")
            .permitAll()
            .anyRequest()
            .authenticated()
            .and()
            .exceptionHandling()
            .authenticationEntryPoint(jwtAuthenticationEntryPoint)
            .and()
            .oauth2Login()
            .authorizationEndpoint()
            .baseUri("/oauth2/authorize")
            .authorizationRequestRepository(httpOAuth2RequestRepository)
            .and()
            .redirectionEndpoint()
            .baseUri("/oauth2/callback/*")
            .and()
            .userInfoEndpoint()
            .userService(customOAuth2UserService)
            .and()
            .successHandler(oauth2AuthenticationSuccessHandler)
            .failureHandler(oauth2AuthenticationFailureHandler);

    http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
  }
}