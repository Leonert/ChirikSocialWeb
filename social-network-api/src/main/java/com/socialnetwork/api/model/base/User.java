package com.socialnetwork.api.model.base;

import com.socialnetwork.api.model.additional.Bookmark;
import com.socialnetwork.api.model.additional.Follow;
import com.socialnetwork.api.model.additional.Like;
import com.socialnetwork.api.model.additional.View;
import com.socialnetwork.api.security.oauth2.AuthProvider;
import com.socialnetwork.api.model.base.chat.Chat;
import com.socialnetwork.api.model.base.chat.Message;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.Enumerated;
import javax.persistence.EnumType;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.socialnetwork.api.util.Constants.Validation.USERNAME_MAX_LENGTH;
import static com.socialnetwork.api.util.Constants.Validation.PASSWORD_MIN_LENGTH;
import static com.socialnetwork.api.util.Constants.Validation.USERNAME_TOO_BIG;
import static com.socialnetwork.api.util.Constants.Validation.USERNAME_NULL;
import static com.socialnetwork.api.util.Constants.Validation.USERNAME_BLANK;
import static com.socialnetwork.api.util.Constants.Validation.NAME_NULL;
import static com.socialnetwork.api.util.Constants.Validation.NAME_BLANK;
import static com.socialnetwork.api.util.Constants.Validation.EMAIL_NULL;
import static com.socialnetwork.api.util.Constants.Validation.EMAIL_NOT_VALID;
import static com.socialnetwork.api.util.Constants.Validation.EMAIL_REGEXP;
import static com.socialnetwork.api.util.Constants.Validation.PASSWORD_NULL;
import static com.socialnetwork.api.util.Constants.Validation.PASSWORD_TOO_SMALL;


@Getter
@Setter
@Entity
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private int id;

  @NotBlank(message = USERNAME_BLANK)
  @NotNull(message = USERNAME_NULL)
  @Size(message = USERNAME_TOO_BIG, max = USERNAME_MAX_LENGTH)
  @Column(name = "username")
  private String username;

  @NotBlank(message = NAME_BLANK)
  @NotNull(message = NAME_NULL)
  @Column(name = "name")
  private String name;

  @NotNull(message = PASSWORD_NULL)
  @Size(message = PASSWORD_TOO_SMALL, min = PASSWORD_MIN_LENGTH)
  @Column(name = "password")
  private String password;

  @Email(message = EMAIL_NOT_VALID, regexp = EMAIL_REGEXP)
  @NotNull(message = EMAIL_NULL)
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

  @Column(name = "profile_background_image", length = 300)
  private String profileBackgroundImage;

  @Column(name = "profile_image", length = 300)
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

  @Column(name = "is_enabled")
  private boolean isEnabled;

  @Transient
  private boolean isCurrUserFollower;

  @Enumerated(EnumType.STRING)
  private AuthProvider provider;

  private String googleId;

  @ManyToMany(mappedBy = "users")
  private List<Chat> chats;

  public User() {
  }

  public User(int id) {
    this.id = id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public List<Chat> getChats() {
    List<Chat> chats = new ArrayList<>();

    if (chats != null) {
      chats.addAll(this.chats);
    }

    return chats;
  }

}
