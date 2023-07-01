package com.socialnetwork.api.service.noneauthorized;

import com.socialnetwork.api.exception.custom.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.model.additional.Follow;
import com.socialnetwork.api.model.base.User;
import com.socialnetwork.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NonAuthUserService {

  private final UserRepository userRepository;
  private final ModelMapper modelMapper;

  public List<User> getFollowers(String queryUsername, int page, int usersForPage)
        throws NoUserWithSuchCredentialsException {
    return findByUsername(queryUsername).getFollowers().stream().map(Follow::getFollowerUser)
          .skip(page * usersForPage).limit(usersForPage).toList();
  }

  public List<User> getFollowed(String queryUsername, int page, int usersForPage)
        throws NoUserWithSuchCredentialsException {
    return findByUsername(queryUsername)
          .getFollowed().stream().map(Follow::getFollowedUser)
          .skip(page * usersForPage).limit(usersForPage).toList();
  }

  public User findByUsername(String username) throws NoUserWithSuchCredentialsException {
    return userRepository.findByUsername(username).orElseThrow(NoUserWithSuchCredentialsException::new);
  }
}
