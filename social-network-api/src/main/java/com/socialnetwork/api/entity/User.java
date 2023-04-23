package com.socialnetwork.api.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String username;

  private String password;

  private String emailAddress;

  @Column(name = "created_date")
  private LocalDateTime createdDate;

  private String name;

  @Column(name = "profile_background_image_url")
  private String profileBackgroundImageUrl;

  @Column(name = "profile_image_url")
  private String profileImageUrl;

  private boolean isEnabled;
}
