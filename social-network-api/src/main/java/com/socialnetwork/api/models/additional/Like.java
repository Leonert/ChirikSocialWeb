package com.socialnetwork.api.models.additional;

import com.socialnetwork.api.models.additional.keys.LikePk;
import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.models.base.User;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "likes")
public class Like {
  @EmbeddedId
  private LikePk likePk;

  @ManyToOne
  @JoinColumn(name = "user_id")
  @MapsId("userId")
  private User likedBy;
  @ManyToOne
  @JoinColumn(name = "post_id")
  @MapsId("postId")
  private Post likedPost;

  public Like() {
  }

  public Like(User likedBy, Post likedPost) {
    this.likePk = new LikePk(likedBy.getId(), likedPost.getId());
    this.likedBy = likedBy;
    this.likedPost = likedPost;
  }
}
