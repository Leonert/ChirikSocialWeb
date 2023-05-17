package com.socialnetwork.api.mapper;

import com.socialnetwork.api.dto.PostDto;
import com.socialnetwork.api.dto.UserDto;
import com.socialnetwork.api.exception.custom.NoPostWithSuchIdException;
import com.socialnetwork.api.exception.custom.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class UserMapper {

  private final ModelMapper modelMapper;

  private final PostMapper postMapper;

  private final UserService userService;

  public User convertToUser(UserDto.Request.Registration userDto) {
    return modelMapper.map(userDto, User.class);
  }

  public UserDto.Response.Default convertToUserDto(User user) {
    return modelMapper.map(user, UserDto.Response.Default.class);
  }

  public List<UserDto.Response.Listing> mapForListing(List<User> users) {
    return users.stream().map(u -> modelMapper.map(u, UserDto.Response.Listing.class)).toList();
  }

  public List<UserDto.Response.Listing> mapUsersForListing(List<User> users) {
    return users.stream().map(u -> modelMapper.map(u, UserDto.Response.Listing.class)).toList();
  }

  public List<PostDto.Response.PostInfo> mapPostsForListing(List<Post> posts) {
    return posts.stream().map(p -> {
      try {
        return postMapper.convertToPostDtoDefault(p);
      } catch (NoPostWithSuchIdException e) {
        throw new RuntimeException(e);
      }
    }).toList();
  }

  public UserDto.Response.Profile mapForProfile(User user, String currentUserName) {
    UserDto.Response.Profile profile = modelMapper.map(user, UserDto.Response.Profile.class);
    profile.setFollowedCounter(user.getFollowed().size());
    profile.setFollowersCounter(user.getFollowers().size());
    try {
      profile.setCurrUserFollower(userService.isFollowed(userService.findByUsername(currentUserName), user));
    } catch (NoUserWithSuchCredentialsException e) {
      profile.setCurrUserFollower(false);
    }
    profile.setProfilePosts(user.getPosts().stream().map(p -> {
      try {
        return postMapper.convertToPostDtoProfile(p);
      } catch (NoPostWithSuchIdException e) {
        throw new RuntimeException(e);
      }
    }).toList());
    return profile;
  }
}
