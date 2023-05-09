package com.socialnetwork.api.models.base;

import com.socialnetwork.api.models.additional.Bookmark;
import com.socialnetwork.api.models.additional.Like;
import com.socialnetwork.api.models.additional.Reply;
import com.socialnetwork.api.models.additional.Retweet;
import com.socialnetwork.api.models.additional.View;
import lombok.Data;

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

  @Column(name = "image")
  private String image;

  @Column(name = "created_date")
  private LocalDateTime createdDate;

  @OneToOne
  @JoinColumn(name = "original_post_id", referencedColumnName = "id")
  private Post originalPost;

  //relations
  @OneToMany(mappedBy = "seenPost")
  private List<View> views;

  @OneToMany(mappedBy = "likedPost")
  private List<Like> likes;

  @OneToMany(mappedBy = "retweetedPost")
  private List<Retweet> retweets;

  @OneToMany(mappedBy = "bookmarkedPost")
  private List<Bookmark> bookmarks;

  @OneToMany(mappedBy = "reply")
  private List<Reply> replies;

  @OneToOne(mappedBy = "replied")
  private Reply repliedTo;
}
