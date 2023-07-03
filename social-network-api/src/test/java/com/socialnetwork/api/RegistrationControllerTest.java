package com.socialnetwork.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.socialnetwork.api.dto.authorized.UserDto;
import com.socialnetwork.api.mapper.authorized.UserMapper;
import com.socialnetwork.api.model.base.User;
import com.socialnetwork.api.service.authorized.UserService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.time.LocalDateTime;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static com.socialnetwork.api.util.Constants.Auth.OK;
import static com.socialnetwork.api.util.Constants.Auth.EMAIL_TAKEN;
import static com.socialnetwork.api.util.Constants.Auth.USERNAME_TAKEN;

@AutoConfigureMockMvc
@SpringBootTest
public class RegistrationControllerTest {

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private UserMapper userMapper;

  @MockBean
  private UserService userService;

  @Test
  public void checkIfEmailExists_StatusOk_EmailDoesNotExist() throws Exception {
    when(userService.existsByEmailAddress("nonexistent@gmail.com")).thenReturn(false);
    mockMvc.perform(get("/api/registration/email?q=nonexistent@gmail.com"))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().string(containsString(OK)));
  }

  @Test
  public void checkIfEmailExists_StatusConflict_EmailExists() throws Exception {
    when(userService.existsByEmailAddress("someemail@gmail.com")).thenReturn(true);
    mockMvc.perform(get("/api/registration/email?q=someemail@gmail.com"))
            .andDo(print())
            .andExpect(status().isConflict())
            .andExpect(content().string(containsString(EMAIL_TAKEN)));
  }

  @Test
  public void checkIfUsernameExists_StatusOk_UsernameDoesNotExist() throws Exception {
    when(userService.existsByUsername("Denys")).thenReturn(false);
    mockMvc.perform(get("/api/registration/username?q=Denys"))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().string(containsString(OK)));
  }

  @Test
  public void checkIfUsernameExists_StatusConflict_UsernameExists() throws Exception {
    when(userService.existsByUsername("Denys")).thenReturn(true);
    mockMvc.perform(get("/api/registration/username?q=Denys"))
            .andDo(print())
            .andExpect(status().isConflict())
            .andExpect(content().string(containsString(USERNAME_TAKEN)));
  }

  @Test
  public void saveUser_StatusOk_UserDtoCorrect() throws Exception {
    UserDto.Request.Registration userDto = createUserDto();
    User user = userMapper.convertToUser(userDto);
    User savedUser = userMapper.convertToUser(createUserDto());
    savedUser.setCreatedDate(LocalDateTime.now());
    when(userService.save(user)).thenReturn(savedUser);

    mockMvc.perform(post("/api/registration")
                    .content(jsonFrom(userDto))
                    .contentType(MediaType.APPLICATION_JSON))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().string(containsString(OK)));

    assertThat(savedUser.getCreatedDate()).isNotNull();
  }

  @Test
  public void saveUser_MethodArgumentNotValidException_UserDtoEmpty() throws Exception {
    UserDto.Request.Registration userDto = new UserDto.Request.Registration();

    mockMvc.perform(post("/api/registration")
                    .content(jsonFrom(userDto))
                    .contentType(MediaType.APPLICATION_JSON))
            .andDo(print())
            .andExpect(status().isBadRequest())
            .andExpect(result -> assertTrue(result.getResolvedException() instanceof MethodArgumentNotValidException));
  }

  private UserDto.Request.Registration createUserDto() {
    UserDto.Request.Registration userDto = new UserDto.Request.Registration();
    userDto.setUsername("Denys");
    userDto.setEmailAddress("denys@gmail.com");
    userDto.setName("John Doe");
    userDto.setPassword("denys123");
    userDto.setBirthDate(null);
    return userDto;
  }

  private <T> String jsonFrom(T object) throws JsonProcessingException {
    return objectMapper.writeValueAsString(object);
  }
}