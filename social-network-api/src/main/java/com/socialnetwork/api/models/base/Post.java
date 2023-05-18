package com.socialnetwork.api.models.base;

import com.socialnetwork.api.models.additional.Bookmark;
import com.socialnetwork.api.models.additional.Like;
import com.socialnetwork.api.models.additional.View;
import lombok.Data;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "posts")
@Data
public class Post {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Integer id;

  @ManyToOne
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  private User author;

  @Column(name = "text")
  private String text;

  @Column(name = "image", length = 1250000)
  private String image;

  @Column(name = "created_date")
  private LocalDateTime createdDate;

  @OneToOne
  @JoinColumn(name = "original_post_id", referencedColumnName = "id")
  private Post originalPost;

  @OneToMany(mappedBy = "seenPost")
  private List<View> views;

  @OneToMany(mappedBy = "likedPost", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Like> likes;

  @OneToMany(mappedBy = "bookmarkedPost", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Bookmark> bookmarks;

  public Post() {
  }

  public Post(int id) {
    this.id = id;
  }
}
