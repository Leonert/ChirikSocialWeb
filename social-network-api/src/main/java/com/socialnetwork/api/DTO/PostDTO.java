package com.socialnetwork.api.DTO;

import com.socialnetwork.api.model.User;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostDTO {
  private int id;
  private User user;
  private String text;
  private String image;
  private int likes;
  private LocalDateTime createdDate;
}
