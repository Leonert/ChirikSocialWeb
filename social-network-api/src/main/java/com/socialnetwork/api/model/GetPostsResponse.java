package com.socialnetwork.api.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record GetPostsResponse(@JsonProperty(value = "posts", required = true) List<Post> posts,
                               @JsonProperty(value = "reposts", required = true) List<Post> reposts) {

}
