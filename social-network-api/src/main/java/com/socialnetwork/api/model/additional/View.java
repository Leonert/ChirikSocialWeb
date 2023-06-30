package com.socialnetwork.api.model.additional;

import com.socialnetwork.api.model.additional.keys.ViewPk;
import com.socialnetwork.api.model.base.Post;
import com.socialnetwork.api.model.base.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;
import javax.persistence.JoinColumn;
import javax.persistence.EmbeddedId;


@Entity
@Getter
@Setter
@Table(name = "views")
@NoArgsConstructor
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

  public View(User viewer, Post seenPost) {
    this.viewer = viewer;
    this.seenPost = seenPost;
    viewPk = new ViewPk(viewer.getId(), seenPost.getId());
  }
}
