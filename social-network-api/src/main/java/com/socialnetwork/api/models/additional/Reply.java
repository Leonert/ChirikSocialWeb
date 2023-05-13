package com.socialnetwork.api.models.additional;

import com.socialnetwork.api.models.additional.keys.ReplyPk;
import com.socialnetwork.api.models.base.Post;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "replies")
public class Reply {
  @EmbeddedId
  private ReplyPk replyPk;

  @ManyToOne
  @JoinColumn(name = "reply_id")
  @MapsId("replyId")
  private Post reply;

  @OneToOne
  @JoinColumn(name = "replied_id")
  @MapsId("repliedId")
  private Post replied;
}