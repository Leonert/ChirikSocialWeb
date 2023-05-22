package com.socialnetwork.api.controller;

import com.socialnetwork.api.dto.DtoInterface;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

public class Controller {
  public ResponseEntity<List<? extends DtoInterface>> getListResponseEntity(List<? extends DtoInterface> list) {
    return ResponseEntity.status(list.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK).body(list);
  }
}
