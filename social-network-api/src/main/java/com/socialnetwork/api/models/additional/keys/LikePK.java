package com.socialnetwork.api.models.additional.keys;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class LikePK implements Serializable {
  @Column(name = "user_id")
  private int userId;
  @Column(name = "post_id")
  private int postId;
}
