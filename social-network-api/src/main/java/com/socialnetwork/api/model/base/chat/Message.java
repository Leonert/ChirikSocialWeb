package com.socialnetwork.api.model.base.chat;

import com.socialnetwork.api.model.base.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "messages")
public class Message {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "message_id")
  private int id;

  @ManyToOne
  @JoinColumn(name = "chat_id")
  private Chat chat;

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
