package com.socialnetwork.api.mapper;

import com.socialnetwork.api.dto.PostDto;
import com.socialnetwork.api.exception.custom.NoPostWithSuchIdException;
import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.service.BookmarkService;
import com.socialnetwork.api.service.LikeService;
import com.socialnetwork.api.service.PostService;
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

  public List<PostDto.Response.PostInfo> mapForListing(List<Post> posts) {
    return posts.stream().map(p -> {
      try {
        return convertToPostDtoDefault(p);
      } catch (NoPostWithSuchIdException e) {
        throw new RuntimeException(e);
      }
    }).toList();
  }

  public PostDto.Response.PostInfo convertToPostDtoDefault(Post post) throws NoPostWithSuchIdException {
    PostDto.Response.PostInfo postDto = modelMapper.map(post, PostDto.Response.Default.class);
    fillMissingFields(postDto, post);
    return postDto;
  }

  public PostDto.Response.PostInfo convertToPostDtoProfile(Post post) throws NoPostWithSuchIdException {
    PostDto.Response.PostInfo postDto = modelMapper.map(post, PostDto.Response.Profile.class);
    fillMissingFields(postDto, post);
    return postDto;
  }

  private void fillMissingFields(PostDto.Response.PostInfo postDto, Post post) throws NoPostWithSuchIdException {
    setPostDtoDetails(postDto, post);

    if (postDto.getOriginalPost() != null) {
      Post originalPost = postService.getReferenceById(postDto.getOriginalPost().getId());
      setPostDtoDetails(postDto.getOriginalPost(), originalPost);
    }
  }

  private void setPostDtoDetails(PostDto.Response.PostInfo postDto, Post post) {
    postDto.setLikesNumber(likeService.countPostLikes(post));
    postDto.setBookmarksNumber(bookmarkService.countPostBookmarks(post));
    postDto.setRetweetsNumber(postService.countPostRetweets(post));
    postDto.setRepliesNumber(postService.countPostReplies(post));
  }
}
