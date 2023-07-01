package com.socialnetwork.api.mapper.noneauthorized;

import com.socialnetwork.api.dto.noneauthorized.NonAuthPostDto;
import com.socialnetwork.api.dto.noneauthorized.NonAuthUserDto;
import com.socialnetwork.api.exception.custom.NoPostWithSuchIdException;
import com.socialnetwork.api.model.base.Post;
import com.socialnetwork.api.model.base.User;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class NonAuthUserMapper {

  private final ModelMapper modelMapper;

  private final NonAuthPostMapper nonAuthPostMapper;

  public List<NonAuthUserDto.Response.Listing> mapForListing(List<User> users) {
    return users.stream().map(u -> modelMapper.map(u, NonAuthUserDto.Response.Listing.class)).toList();
  }

  public List<NonAuthUserDto.Response.Listing> mapUsersForListing(List<User> users) {
    return users.stream().map(u -> modelMapper.map(u, NonAuthUserDto.Response.Listing.class)).toList();
  }

  public List<NonAuthPostDto.Response.WithAuthor> mapPostsForListing(List<Post> posts) {
    return posts.stream().map(p -> {
      try {
        return nonAuthPostMapper.convertToPostDtoDefault(p);
      } catch (NoPostWithSuchIdException e) {
        throw new RuntimeException(e);
      }
    }).toList();
  }

  public NonAuthUserDto.Response.Profile mapForProfile(User user) {
    NonAuthUserDto.Response.Profile profile = modelMapper.map(user, NonAuthUserDto.Response.Profile.class);
    profile.setFollowedCounter(user.getFollowed().size());
    profile.setFollowersCounter(user.getFollowers().size());
    profile.setWithoutAuthorPosts(user.getPosts().stream().map(p -> {
      try {
        return nonAuthPostMapper.convertToPostDtoProfile(p);
      } catch (NoPostWithSuchIdException e) {
        throw new RuntimeException(e);
      }
    }).toList());
    return profile;
  }
}
