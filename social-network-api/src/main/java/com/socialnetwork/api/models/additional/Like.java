package com.socialnetwork.api.models.additional;

import com.socialnetwork.api.models.additional.keys.LikePK;
import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.models.base.User;
import lombok.Data;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "likes")
public class Like {
  @EmbeddedId
  private LikePK likePK;

  @ManyToOne
  @JoinColumn(name = "user_id")
  @MapsId("userId")
  private User likedBy;
  @ManyToOne
  @JoinColumn(name = "post_id")
  @MapsId("postId")
  private Post likedPost;
}
