package com.socialnetwork.api.models.additional;

import com.socialnetwork.api.models.additional.keys.FollowPk;
import com.socialnetwork.api.models.base.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;
import javax.persistence.JoinColumn;
import javax.persistence.EmbeddedId;



@Entity
@Data
@Table(name = "follows")
@NoArgsConstructor
public class Follow {
  @ManyToOne
  @MapsId("followerId")
  @JoinColumn(name = "follower_id")
  User followerUser;
  @ManyToOne
  @MapsId("followedId")
  @JoinColumn(name = "followed_id")
  User followedUser;
  @EmbeddedId
  private FollowPk followPk;

  public Follow(User followerUser, User followedUser) {
    this.followerUser = followerUser;
    this.followedUser = followedUser;
    this.followPk = new FollowPk(followerUser.getId(), followedUser.getId());
  }
}
