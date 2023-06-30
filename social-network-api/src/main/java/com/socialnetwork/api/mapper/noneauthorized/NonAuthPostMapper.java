package com.socialnetwork.api.mapper.noneauthorized;

import com.socialnetwork.api.dto.noneauthorized.NonAuthPostDto;
import com.socialnetwork.api.exception.custom.NoPostWithSuchIdException;
import com.socialnetwork.api.model.base.Post;
import com.socialnetwork.api.service.BookmarkService;
import com.socialnetwork.api.service.noneauthorized.NonAuthLikeService;
import com.socialnetwork.api.service.noneauthorized.NonAuthPostService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class NonAuthPostMapper {

  private final ModelMapper modelMapper;
  private final NonAuthLikeService nonAuthLikeService;
  private final BookmarkService bookmarkService;
  private final NonAuthPostService nonAuthPostService;

  public NonAuthPostDto.Response.WithAuthor convertToPostDtoDefault(Post post) throws NoPostWithSuchIdException {
    NonAuthPostDto.Response.WithAuthor postDto = modelMapper.map(post, NonAuthPostDto.Response.WithAuthor.class);
    fillMissingFields(postDto);
    return postDto;
  }

  public NonAuthPostDto.Response.WithoutAuthor convertToPostDtoProfile(Post post) throws NoPostWithSuchIdException {
    NonAuthPostDto.Response.WithoutAuthor postDto = modelMapper.map(post, NonAuthPostDto.Response.WithoutAuthor.class);
    fillMissingFields(postDto);
    return postDto;
  }

  public List<NonAuthPostDto.Response.WithAuthor> mapForListing(List<Post> posts) {
    return posts.stream().map(p -> {
      try {
        return convertToPostDtoDefault(p);
      } catch (NoPostWithSuchIdException e) {
        throw new RuntimeException(e);
      }
    }).toList();
  }

  private void fillMissingFields(NonAuthPostDto.Response.WithoutAuthor postDto) {
    if (postDto.getOriginalPost() != null) {
      setPostDtoDetails(postDto.getOriginalPost());
      if (postDto.getText() != null || postDto.getImage() != null) {
        setPostDtoDetails(postDto);
      }
    } else {
      setPostDtoDetails(postDto);
    }
  }

  private void setPostDtoDetails(NonAuthPostDto.Response.WithoutAuthor postDto) {
    int id = postDto.getId();
    postDto.setLikesNumber(nonAuthLikeService.countPostLikes(id));
    postDto.setBookmarksNumber(bookmarkService.countPostBookmarks(id));
    postDto.setRetweetsNumber(nonAuthPostService.countPostRetweets(id));
    postDto.setRepliesNumber(nonAuthPostService.countPostReplies(id));
  }

  private void copyPostDtoDetails(NonAuthPostDto.Response.WithoutAuthor postToCopyFrom,
                                  NonAuthPostDto.Response.WithoutAuthor targetPost) {
    targetPost.setLikesNumber(postToCopyFrom.getLikesNumber());
    targetPost.setBookmarksNumber(postToCopyFrom.getBookmarksNumber());
    targetPost.setRepliesNumber(postToCopyFrom.getRepliesNumber());
    targetPost.setRepliesNumber(postToCopyFrom.getRepliesNumber());
  }
}
