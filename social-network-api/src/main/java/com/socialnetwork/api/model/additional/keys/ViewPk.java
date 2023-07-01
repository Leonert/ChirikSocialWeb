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
public class ViewPk implements Serializable {
  @Column(name = "user_id")
  private int userId;

  @Column(name = "post_id")
  private int postId;
}
