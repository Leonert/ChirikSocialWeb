package com.socialnetwork.api.models.additional;

import com.socialnetwork.api.models.additional.keys.ViewPk;
import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.models.base.User;
import lombok.Data;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Entity
@Data
@Table(name = "views")
public class View {
  @ManyToOne
  @MapsId("userId")
  @JoinColumn(name = "user_id")
  User viewer;
  @ManyToOne
  @MapsId("postId")
  @JoinColumn(name = "post_id")
  Post seenPost;
  @EmbeddedId
  private ViewPk viewPk;
}
