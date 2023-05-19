package com.socialnetwork.api.mapper.noneauthorized;

import com.socialnetwork.api.dto.noneauthorized.NonAuthPostDto;
import com.socialnetwork.api.exception.custom.NoPostWithSuchIdException;
import com.socialnetwork.api.models.base.Post;
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
    fillMissingFields(postDto, post);
    return postDto;
  }

  public NonAuthPostDto.Response.WithoutAuthor convertToPostDtoProfile(Post post) throws NoPostWithSuchIdException {
    NonAuthPostDto.Response.WithoutAuthor postDto = modelMapper.map(post, NonAuthPostDto.Response.WithoutAuthor.class);
    fillMissingFields(postDto, post);
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

  private void fillMissingFields(NonAuthPostDto.Response.WithoutAuthor postDto, Post post) throws NoPostWithSuchIdException {
    setPostDtoDetails(postDto, post);

    if (postDto.getOriginalPost() != null) {
      Post originalPost = nonAuthPostService.getReferenceById(postDto.getOriginalPost().getId());
      setPostDtoDetails(postDto.getOriginalPost(), originalPost);
    }
  }

  private void setPostDtoDetails(NonAuthPostDto.Response.WithoutAuthor postDto, Post post) {
    postDto.setLikesNumber(nonAuthLikeService.countPostLikes(post));
    postDto.setBookmarksNumber(bookmarkService.countPostBookmarks(post));
    postDto.setRetweetsNumber(nonAuthPostService.countPostRetweets(post));
    postDto.setRepliesNumber(nonAuthPostService.countPostReplies(post));
  }
}
