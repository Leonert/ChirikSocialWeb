package com.socialnetwork.api.service;

import com.socialnetwork.api.dto.PostDto;
import com.socialnetwork.api.exception.NoPostWithSuchIdException;
import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {
  private final PostRepository postRepository;
  private final LikeService likeService;
  private final BookmarkService bookmarkService;
  private final ModelMapper modelMapper;

  public void save(Post post) {
    post.setCreatedDate(LocalDateTime.now());
    postRepository.save(post);
  }

  public List<PostDto.Response.Default> getSomePosts(Integer page, Integer postsNumber) {
    return postRepository.findAll(PageRequest.of(page, postsNumber, Sort.by("createdDate")))
            .stream()
            .map(this::convertToPostDto)
            .toList();
  }

  public boolean existsById(Integer postId) {
    return postRepository.existsById(postId);
  }

  public void delete(Post post) {
    postRepository.delete(post);
  }

  public Optional<Post> findById(int id) {
    return postRepository.findById(id);
  }

  public Post getReferenceById(int id) throws NoPostWithSuchIdException {
    if (!postRepository.existsById(id)) {
      throw new NoPostWithSuchIdException();
    }
    return postRepository.getReferenceById(id);
  }

  public PostDto.Response.Default convertToPostDto(Post post) {
    TypeMap<Post, PostDto.Response.Default> propertyMapper =
            modelMapper.getTypeMap(Post.class, PostDto.Response.Default.class);

    if (propertyMapper == null) {
      propertyMapper = modelMapper.createTypeMap(Post.class, PostDto.Response.Default.class);
      propertyMapper.addMappings(modelMapper -> modelMapper.skip(PostDto.Response.Default::setLikes));
      propertyMapper.addMappings(modelMapper -> modelMapper.skip(PostDto.Response.Default::setBookmarks));
    }

    PostDto.Response.Default postDto = modelMapper.map(post, PostDto.Response.Default.class);

    postDto.setLikes(likeService.getUsersLikesIdsForPost(post));
    postDto.setBookmarks(bookmarkService.getUsersBookmarksIdsForPost(post));

    if (postDto.getOriginalPost() != null) {
      Post originalPost = findById(postDto.getOriginalPost().getId()).get();
      postDto.getOriginalPost().setLikes(likeService.getUsersLikesIdsForPost(originalPost));
      postDto.getOriginalPost().setBookmarks(bookmarkService.getUsersBookmarksIdsForPost(originalPost));
    }

    return postDto;
  }
}
