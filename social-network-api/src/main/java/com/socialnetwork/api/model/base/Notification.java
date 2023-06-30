package com.socialnetwork.api.model.base;

import com.socialnetwork.api.model.additional.NotificationType;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Getter
@Setter
public class Notification {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private int id;

  @ManyToOne
  @JoinColumn(name = "recipient", referencedColumnName = "id")
  private User recipient;

  @ManyToOne
  @JoinColumn(name = "initiator", referencedColumnName = "id")
  private User initiator;

  @ManyToOne
  @JoinColumn(name = "post", referencedColumnName = "id")
  private Post post;

  @Column(name = "notification_type")
  @Enumerated(EnumType.STRING)
  private NotificationType notificationType;

  @Column(name = "timestamp")
  private LocalDateTime timestamp;

  public Notification(User recipient, User initiator, Post post, NotificationType notificationType) {
    this.recipient = recipient;
    this.initiator = initiator;
    this.post = post;
    this.notificationType = notificationType;
    timestamp = LocalDateTime.now();
  }

  public Notification() {

  }
}
