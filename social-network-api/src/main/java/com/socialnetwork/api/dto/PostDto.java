package com.socialnetwork.api.dto;

import com.socialnetwork.api.model.User;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostDto {
  private int id;
  private User user;
  private String text;
  private String image;
  private int likes;
  private LocalDateTime createdDate;
  private int repostedId;
}
