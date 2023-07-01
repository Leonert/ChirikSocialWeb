package com.socialnetwork.api.service.noneauthorized;

import com.socialnetwork.api.exception.custom.NoPostWithSuchIdException;
import com.socialnetwork.api.model.base.Post;
import com.socialnetwork.api.model.base.User;
import com.socialnetwork.api.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NonAuthPostService {
  private final PostRepository postRepository;

  public List<Post> getPosts(int page, int postsNumber) {
    return postRepository.findAll(PageRequest.of(
            page, postsNumber, Sort.by(Sort.Direction.DESC, "createdDate")
    )).toList();
  }

  public List<Post> getReplies(int id, int page, int usersForPage)
        throws NoPostWithSuchIdException {
    Post post = getReferenceById(id);
    return postRepository.findAllByOriginalPostAndTextIsNotNull(
          post,
          PageRequest.of(page, usersForPage, Sort.by(Sort.Direction.DESC, "createdDate")));
  }

  public List<User> getRetweets(int id, int page, int usersForPage) throws NoPostWithSuchIdException {
    if (!postRepository.existsById(id)) {
      throw new NoPostWithSuchIdException();
    }
    return postRepository.findUsersByRetweetedPost(id).stream()
          .skip(page * usersForPage).limit(usersForPage).toList();
  }

  public Post getReferenceById(int id) throws NoPostWithSuchIdException {
    if (!postRepository.existsById(id)) {
      throw new NoPostWithSuchIdException();
    }
    return postRepository.getReferenceById(id);
  }

  public int countPostRetweets(int id) {
    return postRepository.countAllByOriginalPostAndTextNullAndImageNull(new Post(id));
  }

  public int countPostReplies(int id) {
    return postRepository.countAllByOriginalPostAndTextNotNullAndImageNull(new Post(id));
  }
}
