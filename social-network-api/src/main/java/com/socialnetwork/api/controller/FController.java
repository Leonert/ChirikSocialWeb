package com.socialnetwork.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/something")
public class FController {
  @GetMapping("lol")
  public ResponseEntity<String> handler() {
    return ResponseEntity.ok("No Way");
  }
}
