package com.socialnetwork.api.models.additional.keys;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
public class RetweetPk implements Serializable {
  @Column(name = "user_id")
  private int userId;
  @Column(name = "post_id")
  private int postId;
}
