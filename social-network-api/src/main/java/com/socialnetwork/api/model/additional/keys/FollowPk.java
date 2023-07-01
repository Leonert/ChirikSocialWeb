package com.socialnetwork.api.model.additional.keys;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FollowPk implements Serializable {
  @Column(name = "follower_id")
  private int followerId;

  @Column(name = "followed_id")
  private int followedId;
}
