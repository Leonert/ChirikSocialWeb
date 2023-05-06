package com.socialnetwork.api.models.additional;

import com.socialnetwork.api.models.additional.keys.FollowPK;
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
@Table(name = "follows")
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
  private FollowPK followPK;
}
