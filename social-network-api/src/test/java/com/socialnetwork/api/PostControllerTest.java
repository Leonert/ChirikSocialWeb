package com.socialnetwork.api;

import com.socialnetwork.api.dto.authorized.PostDto;
import com.socialnetwork.api.exception.custom.NoPostWithSuchIdException;
import com.socialnetwork.api.mapper.authorized.PostMapper;
import com.socialnetwork.api.model.base.Post;
import com.socialnetwork.api.model.base.User;
import com.socialnetwork.api.repository.PostRepository;
import com.socialnetwork.api.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static com.socialnetwork.api.util.Constants.Auth.AUTHORIZATION_HEADER;

public class PostControllerTest extends ControllerTest {

  @Autowired
  private PostMapper postMapper;

  @MockBean
  private UserRepository userRepository;

  @MockBean
  private PostRepository postRepository;

  @Test
  public void getById_ReturnsOk_PostExists() throws Exception {
    int id = 600;
    User user = createTestUser();
    Post post = createTestPost();

    when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
    when(postRepository.existsById(id)).thenReturn(true);
    when(postRepository.getReferenceById(id)).thenReturn(post);

    mockMvc.perform(get("/api/posts/" + id)
                    .header(AUTHORIZATION_HEADER, generateToken(user.getUsername())))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().string(jsonFrom(postMapper.convertToPostDtoDefault(post, user.getUsername()))));
  }

  @Test
  public void getById_ReturnsNoPostWithSuchIdException_PostDoesNotExist() throws Exception {
    int id = 1;

    when(postRepository.existsById(id)).thenReturn(false);

    mockMvc.perform(get("/api/posts/" + id))
            .andDo(print())
            .andExpect(status().isNotFound())
            .andExpect(result -> assertTrue(result.getResolvedException() instanceof NoPostWithSuchIdException));
  }

  @Test
  public void addPost_ReturnsCreatedAndPostDto_PostDtoValid() throws Exception {
    User user = createTestUser();
    PostDto.Request.Created postDto = createPostCreationDto();
    Post post = postMapper.convertToPost(postDto, user);

    when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
    when(postRepository.save(any(Post.class))).thenReturn(post);

    mockMvc.perform(post("/api/posts")
                    .header(AUTHORIZATION_HEADER, generateToken(user.getUsername()))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(jsonFrom(postDto)))
            .andDo(print())
            .andExpect(status().isCreated())
            .andExpect(content().string(jsonFrom(postMapper.convertToPostDtoDefault(post, user.getUsername()))));

    assertEquals(post.getAuthor(), user);
  }

  @Test
  public void deletePostById_ReturnsNoContent_PostExists() throws Exception {
    Post post = createTestPost();
    User user = post.getAuthor();

    when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
    when(postRepository.existsById(post.getId())).thenReturn(true);
    when(postRepository.getReferenceById(post.getId())).thenReturn(post);

    mockMvc.perform(delete("/api/posts/" + post.getId())
                    .header(AUTHORIZATION_HEADER, generateToken(user.getUsername())))
            .andDo(print())
            .andExpect(status().isNoContent());

    when(postRepository.existsById(post.getId())).thenReturn(false);

    assertFalse(postRepository.existsById(post.getId()));
  }

  private PostDto.Request.Created createPostCreationDto() {
    PostDto.Request.Created postDto = new PostDto.Request.Created();
    postDto.setOriginalPost(null);
    postDto.setImage(null);
    postDto.setText("Just Post");

    return postDto;
  }

  private Post createTestPost() {
    Post post = new Post();
    post.setId(600);
    post.setText("Hello world!");
    post.setAuthor(createTestUser());

    return post;
  }

  private User createTestUser() {
    User user = new User();
    user.setId(600);
    user.setUsername("user");
    user.setPassword("password");

    return user;
  }
}
