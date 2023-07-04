package com.socialnetwork.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.socialnetwork.api.security.jwt.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static com.socialnetwork.api.util.Constants.Auth.BEARER;

@DirtiesContext
@AutoConfigureMockMvc
@SpringBootTest
public class ControllerTest {

  @Autowired
  protected MockMvc mockMvc;

  @Autowired
  protected JwtTokenUtil jwtTokenUtil;

  @Autowired
  protected ObjectMapper objectMapper;

  protected <T> String jsonFrom(T object) throws JsonProcessingException {
    return objectMapper.writeValueAsString(object);
  }

  protected String generateToken(String username) {
    return BEARER + " " + jwtTokenUtil.generateToken(username, true);
  }
}
