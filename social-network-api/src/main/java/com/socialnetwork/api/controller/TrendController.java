package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.DtoInterface;
import com.socialnetwork.api.mapper.authorized.HashtagMapper;
import com.socialnetwork.api.service.HashtagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

import static com.socialnetwork.api.util.Constants.Request.PAGE_NUMBER_QUERY;
import static com.socialnetwork.api.util.Constants.Request.RESULTS_PER_PAGE_QUERY;
import static com.socialnetwork.api.util.Constants.Response.PAGE_NUMBER_DEFAULT;
import static com.socialnetwork.api.util.Constants.Response.RESULTS_PER_PAGE_DEFAULT;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/trends")
public class TrendController extends Controller {

  private final HashtagService hashtagService;
  private final HashtagMapper hashtagMapper;

  @GetMapping("hashtags")
  public ResponseEntity<List<? extends DtoInterface>>
    getTrends(@RequestParam(PAGE_NUMBER_QUERY) Optional<Integer> pageParam,
              @RequestParam(RESULTS_PER_PAGE_QUERY) Optional<Integer> hashtagsQuantityParam) {
    int page = pageParam.orElse(PAGE_NUMBER_DEFAULT);
    int hashtagsQuantity = hashtagsQuantityParam.orElse(RESULTS_PER_PAGE_DEFAULT);
    return getListResponseEntity(hashtagMapper.mapHashtags(hashtagService.getHashtags(page, hashtagsQuantity)));
  }
}
