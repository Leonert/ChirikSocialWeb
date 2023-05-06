package com.socialnetwork.api.models.additional.keys;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class ReplyPK implements Serializable {
  @Column(name = "reply_id")
  private int replyId;
  @Column(name = "replied_id")
  private int repliedId;
}

