package com.socialnetwork.api.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;
import javax.persistence.Column;
import javax.persistence.OneToOne;
import java.time.LocalDateTime;

@Entity
@Table(name = "posts")
@Data
public class Post {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer postId;

  @ManyToOne
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  private User user;

  @Column(name = "text")
  private String text;

  @Column(name = "image")
  private String image;

  @Column(name = "created_date")
  private LocalDateTime createdDate;

  @Column(name = "likes")
  private Integer likes;

  @OneToOne
  @JoinColumn(name = "reposted_id")
  private Post reposted;
}
