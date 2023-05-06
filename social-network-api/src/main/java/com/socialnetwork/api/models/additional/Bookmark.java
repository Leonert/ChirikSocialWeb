package com.socialnetwork.api.models.additional;

import com.socialnetwork.api.models.additional.keys.BookmarkPk;
import com.socialnetwork.api.models.base.Post;
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
@Table(name = "bookmarks")
public class Bookmark {
  @EmbeddedId
  private BookmarkPk bookmarkPK;
  @ManyToOne
  @JoinColumn(name = "user_id")
  @MapsId("userId")
  private User bookmarkedBy;

  @ManyToOne
  @JoinColumn(name = "post_id")
  @MapsId("postId")
  private Post bookmarkedPost;
}
