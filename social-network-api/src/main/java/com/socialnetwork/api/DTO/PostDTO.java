package com.socialnetwork.api.DTO;

import com.socialnetwork.api.model.User;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
@Data
public class PostDTO {
  private int id;
  private User user;
  private String text;
  private String image;
}
