package com.socialnetwork.api.model.base;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;

@Getter
@Setter
@Entity
@Table(name = "hashtags")
public class Hashtag {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "name")
  private String name;

  @Column(name = "quantity")
  private int quantity;

  public Hashtag() {}

  public Hashtag(String name, int quantity) {
    this.name = name;
    this.quantity = quantity;
  }
}
