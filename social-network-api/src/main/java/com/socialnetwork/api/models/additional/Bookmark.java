package com.socialnetwork.api.models.additional;

import com.socialnetwork.api.models.additional.keys.BookmarkPk;
import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.models.base.User;
import lombok.Data;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;



@Entity
@Data
@Table(name = "bookmarks")
public class Bookmark {
  @EmbeddedId
  private BookmarkPk bookmarkPk;
  @ManyToOne
  @JoinColumn(name = "user_id")
  @MapsId("userId")
  private User bookmarkedBy;

  @ManyToOne
  @JoinColumn(name = "post_id")
  @MapsId("postId")
  private Post bookmarkedPost;

  public Bookmark() {
  }

  public Bookmark(User bookmarkedBy, Post bookmarkedPost) {
    this.bookmarkPk = new BookmarkPk(bookmarkedBy.getId(), bookmarkedPost.getId());
    this.bookmarkedBy = bookmarkedBy;
    this.bookmarkedPost = bookmarkedPost;
  }
}
