package com.socialnetwork.api.models.base;

import com.socialnetwork.api.models.additional.Bookmark;
import com.socialnetwork.api.models.additional.Follow;
import com.socialnetwork.api.models.additional.Like;
import com.socialnetwork.api.models.additional.View;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private int id;

  @Column(name = "username")
  private String username;

  @Column(name = "name")
  private String name;

  @Column(name = "password")
  private String password;

  @Column(name = "email_address")
  private String emailAddress;

  @Column(name = "created_date")
  private LocalDateTime createdDate;

  @Column(name = "bio")
  private String bio;

  @Column(name = "location")
  private String location;

  @Column(name = "website")
  private String website;

  @Column(name = "birth_date")
  private LocalDateTime birthDate;

  @Column(name = "profile_background_image", length = 1250000)
  private String profileBackgroundImage;

  @Column(name = "profile_image", length = 1250000)
  private String profileImage;

  //relations
  @OneToMany(mappedBy = "author")
  private List<Post> posts;

  @OneToMany(mappedBy = "followedUser")
  private List<Follow> followers;

  @OneToMany(mappedBy = "followerUser")
  private List<Follow> followed;

  @OneToMany(mappedBy = "seenPost")
  private List<View> seenPosts;

  @OneToMany(mappedBy = "likedBy")
  private List<Like> likedPosts;

  @OneToMany(mappedBy = "bookmarkedBy")
  private List<Bookmark> bookmarkedPosts;

  @OneToMany(mappedBy = "sender")
  private List<Message> sentMessages;

  @OneToMany(mappedBy = "recipient")
  private List<Message> receivedMessages;

  @OneToMany(mappedBy = "recipient")
  private List<Notification> notifications;

  private boolean isEnabled;

  @Transient
  private boolean isCurrUserFollower;

  public User() {

  }

  public User(int id) {
    this.id = id;
  }

  private void setId(int id) {
    this.id = id;
  }
}
