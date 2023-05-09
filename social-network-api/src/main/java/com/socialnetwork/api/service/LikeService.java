package com.socialnetwork.api.service;

import com.socialnetwork.api.dto.LikeDto;
import com.socialnetwork.api.dto.PostDto;
import com.socialnetwork.api.models.additional.Like;
import com.socialnetwork.api.models.additional.keys.LikePk;
import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikeService {
  private final LikeRepository likeRepository;
  private final ModelMapper modelMapper;

  public void save(User user, Post post) {
    Like like = new Like();
    LikePk likePk = new LikePk();

    likePk.setUserId(user.getId());
    likePk.setPostId(post.getId());

    like.setLikePk(likePk);
    like.setLikedBy(user);
    like.setLikedPost(post);

    likeRepository.save(like);
  }

  public void delete(Like like) {
    likeRepository.delete(like);
  }

  public boolean existsByUserAndPost(User user, Post post) {
    return likeRepository.existsByLikedByAndLikedPost(user, post);
  }

  public Optional<Like> findByUserAndPost(User user, Post post) {
    return likeRepository.findByLikedByAndLikedPost(user, post);
  }

  // returns a list of ids of users who liked that post
  public List<Integer> getUsersLikesIdsForPost(Post post) {
    return likeRepository.findAllByLikedPost(post)
            .stream()
            .map(like -> like.getLikedBy().getId())
            .toList();
  }

  public LikeDto.Response.LikesList getUsersIdsDtoForPost(Post post) {
    LikeDto.Response.LikesList likesList = new LikeDto.Response.LikesList();
    List<Integer> usersLikesIds =  getUsersLikesIdsForPost(post);
    likesList.setLikes(usersLikesIds);
    return likesList;
  }
}
