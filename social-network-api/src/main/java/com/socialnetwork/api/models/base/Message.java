package com.socialnetwork.api.models.base;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;
@Data
@Entity
@Table(name = "messages")
public class Message {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "messages_seq")
  @SequenceGenerator(name = "messages_seq", sequenceName = "messages_seq", initialValue = 100, allocationSize = 1)
  @Column(name = "id")
  private int id;

  @ManyToOne
  @JoinColumn(name = "sender_id", referencedColumnName = "id")
  private User sender;

  @ManyToOne
  @JoinColumn(name = "recipient_id", referencedColumnName = "id")
  private User recipient;

  @Column(name = "date")
  private LocalDateTime date;

  @Column(name = "message")
  private String message;

  @Column(name = "timestamp")
  private LocalDateTime timestamp;

  @Column(name = "is_read")
  private boolean read;

  public Message() {
    this.date = LocalDateTime.now();
  }
}