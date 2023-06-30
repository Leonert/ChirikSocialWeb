package com.socialnetwork.api.model.base;

import com.socialnetwork.api.model.additional.Bookmark;
import com.socialnetwork.api.model.additional.Like;
import com.socialnetwork.api.model.additional.View;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "posts")
@Getter
@Setter
public class Post {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Integer id;

  @ManyToOne
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  private User author;

  @Column(name = "text", length = 280)
  private String text;

  @Column(name = "image", length = 350)
  private String image;

  @Column(name = "created_date")
  private LocalDateTime createdDate;

  @ManyToOne
  @JoinColumn(name = "original_post_id", referencedColumnName = "id")
  private Post originalPost;

  @OneToMany(mappedBy = "seenPost", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<View> views;

  @OneToMany(mappedBy = "likedPost", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Like> likes;

  @OneToMany(mappedBy = "bookmarkedPost", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Bookmark> bookmarks;

  @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Notification> notifications;

  // needed only for post deleting
  @OneToMany(mappedBy = "originalPost", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Post> retweetsAndReplies;

  public Post() {
  }

  public Post(int id) {
    this.id = id;
  }
}
