package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.PostDto;
import com.socialnetwork.api.exception.AccessDeniedException;
import com.socialnetwork.api.exception.NoPostWithSuchIdException;
import com.socialnetwork.api.exception.NoUserWithSuchCredentialsException;
import com.socialnetwork.api.models.additional.Response;
import com.socialnetwork.api.models.base.Post;
import com.socialnetwork.api.models.base.User;
import com.socialnetwork.api.security.JwtTokenUtil;
import com.socialnetwork.api.service.BookmarkService;
import com.socialnetwork.api.service.LikeService;
import com.socialnetwork.api.service.PostService;
import com.socialnetwork.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {
  private static final String AUTHORIZATION_HEADER = "Authorization";
  private static final Integer PAGE_NUMBER_DEFAULT = 0;
  private static final Integer POSTS_NUMBER_DEFAULT = 3;
  private final PostService postService;
  private final LikeService likeService;
  private final BookmarkService bookmarkService;
  private final UserService userService;
  private final JwtTokenUtil jwtTokenUtil;
  private final ModelMapper modelMapper;

  @GetMapping("/{id}")
  public PostDto.Response.Default getPostById(@PathVariable("id") Integer id)  throws NoPostWithSuchIdException {
    return convertToPostDto(postService.getReferenceById(id));
  }

  @GetMapping()
  public List<PostDto.Response.Default>
    getPosts(@RequestParam("p") Optional<Integer> page, @RequestParam("n") Optional<Integer> posts) {
    int pageNum = page.orElse(PAGE_NUMBER_DEFAULT);
    int postsNum = posts.orElse(POSTS_NUMBER_DEFAULT);

    return postService.getPosts(pageNum, postsNum)
            .stream()
            .map(this::convertToPostDto)
            .toList();
  }

  @PostMapping()
  public Response addPost(@RequestBody PostDto.Request.Created postDto, HttpServletRequest request)
          throws NoUserWithSuchCredentialsException, NoPostWithSuchIdException, AccessDeniedException {
    User user = userService.getReferenceById(postDto.getUser().getId());
    Integer originalPostId = postDto.getOriginalPostId();
    Post post = convertToPost(postDto, user, originalPostId);
    String header = request.getHeader(AUTHORIZATION_HEADER);

    jwtTokenUtil.verifyUsernames(header, user.getUsername());
    postService.save(post);
    return new Response("Post was created");
  }

  @PostMapping("/bookmark")
  public PostDto.Response.Default
    saveBookmark(@RequestBody PostDto.Request.Action postDto, HttpServletRequest request)
          throws NoUserWithSuchCredentialsException, NoPostWithSuchIdException, AccessDeniedException {
    User user = userService.getReferenceById(postDto.getUser().getId());
    Post post = postService.getReferenceById(postDto.getPost().getId());
    String header = request.getHeader(AUTHORIZATION_HEADER);

    jwtTokenUtil.verifyUsernames(header, user.getUsername());

    if (bookmarkService.existsByUserAndPost(user, post)) {
      bookmarkService.delete(user, post);
    } else {
      bookmarkService.save(user, post);
    }

    return convertToPostDto(post);
  }

  @PostMapping("/like")
  public PostDto.Response.Default
    saveLike(@RequestBody PostDto.Request.Action postDto, HttpServletRequest request)
          throws NoUserWithSuchCredentialsException, NoPostWithSuchIdException, AccessDeniedException {
    User user = userService.getReferenceById(postDto.getUser().getId());
    Post post = postService.getReferenceById(postDto.getPost().getId());
    String header = request.getHeader(AUTHORIZATION_HEADER);

    jwtTokenUtil.verifyUsernames(header, user.getUsername());

    if (likeService.existsByUserAndPost(user, post)) {
      likeService.delete(user, post);
    } else {
      likeService.save(user, post);
    }

    return convertToPostDto(post);
  }

  private Post convertToPost(PostDto.Request.Created postDto, User user, Integer originalPostId)
          throws NoPostWithSuchIdException {
    Post post = modelMapper.map(postDto, Post.class);
    post.setAuthor(user);

    if (originalPostId != null && postService.existsById(originalPostId)) {
      post.setOriginalPost(postService.getReferenceById(originalPostId));
    }

    return post;
  }


  private PostDto.Response.Default convertToPostDto(Post post) {
    PostDto.Response.Default postDto = modelMapper.map(post, PostDto.Response.Default.class);
    postDto.setLikesNumber(likeService.countPostLikes(post));
    postDto.setBookmarksNumber(bookmarkService.countPostBookmarks(post));

    if (postDto.getOriginalPost() != null) {
      Post originalPost = postService.findById(postDto.getOriginalPost().getId()).get();
      postDto.getOriginalPost().setLikesNumber(likeService.countPostLikes(originalPost));
      postDto.getOriginalPost().setBookmarksNumber(bookmarkService.countPostBookmarks(originalPost));
    }

    return postDto;
  }
}
