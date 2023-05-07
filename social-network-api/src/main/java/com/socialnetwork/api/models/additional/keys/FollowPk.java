package com.socialnetwork.api.models.additional.keys;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
public class FollowPk implements Serializable {
  @Column(name = "follower_id")
  private int followerId;

  @Column(name = "followed_id")
  private int followedId;
}
