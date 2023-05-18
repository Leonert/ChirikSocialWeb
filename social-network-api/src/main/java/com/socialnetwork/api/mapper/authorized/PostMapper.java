package com.socialnetwork.api.mapper.authorized;

import com.socialnetwork.api.dto.authorized.PostDto;
import com.socialnetwork.api.exception.custom.NoPostWithSuchIdException;
import com.socialnetwork.api.exception.custom.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.service.BookmarkService;
import com.socialnetwork.api.service.authorized.LikeService;
import com.socialnetwork.api.service.authorized.PostService;
import com.socialnetwork.api.service.noneauthorized.NonAuthUserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class PostMapper {

  private final ModelMapper modelMapper;

  private final LikeService likeService;

  private final BookmarkService bookmarkService;

  private final PostService postService;
  private final NonAuthUserService nonAuthUserService;

  public Post convertToPost(PostDto.Request.Created postDto, User user)
          throws NoPostWithSuchIdException {
    Integer originalPostId = postDto.getOriginalPostId();
    Post post = modelMapper.map(postDto, Post.class);
    post.setAuthor(user);

    if (originalPostId != null && postService.existsById(originalPostId)) {
      post.setOriginalPost(postService.getReferenceById(originalPostId));
    }

    return post;
  }

  public Post convertToPost(PostDto.Request.Editable postDto) {
    return modelMapper.map(postDto, Post.class);
  }

  public Post convertToPost(PostDto.Request.Default postDto) {
    return modelMapper.map(postDto, Post.class);
  }

  public List<PostDto.Response.WithAuthor> mapForListing(List<Post> posts, String currentUserUsername) {
    return posts.stream().map(p -> {
      try {
        return convertToPostDtoDefault(p, currentUserUsername);
      } catch (NoPostWithSuchIdException | NoUserWithSuchCredentialsException e) {
        throw new RuntimeException(e);
      }
    }).toList();
  }

  public PostDto.Response.WithAuthor convertToPostDtoDefault(Post post, String currentUserUsername)
          throws NoPostWithSuchIdException, NoUserWithSuchCredentialsException {
    User currentUser = nonAuthUserService.findByUsername(currentUserUsername);
    PostDto.Response.WithAuthor postDto = modelMapper.map(post, PostDto.Response.WithAuthor.class);
    fillMissingFields(postDto, post, currentUser);
    return postDto;
  }

  public PostDto.Response.WithoutAuthor convertToPostDtoProfile(Post post, User currentUser)
      throws NoPostWithSuchIdException {
    PostDto.Response.WithoutAuthor postDto = modelMapper.map(post, PostDto.Response.WithoutAuthor.class);
    fillMissingFields(postDto, post, currentUser);
    return postDto;
  }

  private void fillMissingFields(PostDto.Response.WithoutAuthor postDto, Post post, User currentUser)
          throws NoPostWithSuchIdException {
    setPostDtoDetailsEnhanced(postDto, post, currentUser);

    if (postDto.getOriginalPost() != null) {
      Post originalPost = postService.getReferenceById(postDto.getOriginalPost().getId());
      setPostDtoDetails(postDto.getOriginalPost(), originalPost);
    }
  }

  private void setPostDtoDetailsEnhanced(PostDto.Response.WithoutAuthor postDto, Post post, User currentUser) {
    postDto.setLikesNumber(likeService.countPostLikes(post));
    postDto.setBookmarksNumber(bookmarkService.countPostBookmarks(post));
    postDto.setRetweetsNumber(postService.countPostRetweets(post));
    postDto.setRepliesNumber(postService.countPostReplies(post));

    postDto.setBookmarked(bookmarkService.existsByIds(currentUser.getId(), postDto.getId()));
    postDto.setLiked(likeService.existsByIds(currentUser.getId(), postDto.getId()));
    postDto.setRetweeted(postService.isRetweetedByUser(currentUser.getId(), postDto.getId()));
  }

  private void setPostDtoDetails(PostDto.Response.WithoutAuthor postDto, Post post) {
    postDto.setLikesNumber(likeService.countPostLikes(post));
    postDto.setBookmarksNumber(bookmarkService.countPostBookmarks(post));
    postDto.setRetweetsNumber(postService.countPostRetweets(post));
    postDto.setRepliesNumber(postService.countPostReplies(post));
  }
}
