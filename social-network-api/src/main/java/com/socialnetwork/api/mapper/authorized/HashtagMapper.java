package com.socialnetwork.api.mapper.authorized;

import com.socialnetwork.api.dto.HashtagDto;
import com.socialnetwork.api.model.base.Hashtag;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class HashtagMapper {

  private final ModelMapper modelMapper;

  public List<HashtagDto.Response.Default> mapHashtags(List<Hashtag> hashtags) {
    return hashtags.stream().map(h -> modelMapper.map(h, HashtagDto.Response.Default.class)).toList();
  }
}
