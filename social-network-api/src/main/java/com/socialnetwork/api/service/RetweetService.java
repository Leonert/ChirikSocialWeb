package com.socialnetwork.api.service;

import com.socialnetwork.api.models.additional.Retweet;
import com.socialnetwork.api.models.additional.keys.RetweetPk;
import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.repository.RetweetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RetweetService {
  private final RetweetRepository retweetRepository;

  public void save(Post post, Post retweetedPost) {
    Retweet retweet = new Retweet();
    RetweetPk retweetPk = new RetweetPk();

    retweetPk.setPostId(post.getId());
    retweetPk.setRetweetedPostId(retweetedPost.getId());

    retweet.setRetweetPk(retweetPk);
    retweet.setPost(post);
    retweet.setRetweetedPost(retweetedPost);

    retweetRepository.save(retweet);
  }
}
