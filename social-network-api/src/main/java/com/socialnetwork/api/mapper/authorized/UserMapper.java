package com.socialnetwork.api.mapper.authorized;

import com.socialnetwork.api.dto.authorized.UserDto;
import com.socialnetwork.api.exception.custom.NoPostWithSuchIdException;
import com.socialnetwork.api.exception.custom.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.model.base.User;
import com.socialnetwork.api.service.authorized.UserService;
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

  public List<UserDto.Response.Listing> mapForListing(List<User> users, String currentUserUsername)
        throws NoUserWithSuchCredentialsException {
    User currentUser = userService.findByUsername(currentUserUsername);
    return users.stream().map(u -> modelMapper.map(u, UserDto.Response.Listing.class))
          .peek(u -> u.setCurrUserFollower(userService.isFollowed(currentUser, new User(u.getId()))))
          .toList();
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
    profile.setWithoutAuthorPosts(user.getPosts().stream().map(p -> {
      try {
        return postMapper.convertToPostDtoProfile(p, user);
      } catch (NoPostWithSuchIdException e) {
        throw new RuntimeException(e);
      }
    }).toList());
    return profile;
  }

  public UserDto.Response.AccountData convertToAccountData(User user, String token) {
    UserDto.Response.AccountData userDtoResponse = new UserDto.Response.AccountData();
    userDtoResponse.setUser(convertToUserDto(user));
    userDtoResponse.setProvider(String.valueOf(user.getProvider()));
    userDtoResponse.setJwt(token);
    return userDtoResponse;
  }
}
