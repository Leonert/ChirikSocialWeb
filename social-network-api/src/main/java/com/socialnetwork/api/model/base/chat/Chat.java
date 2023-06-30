package com.socialnetwork.api.model.base.chat;

import com.socialnetwork.api.model.base.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "chats")
public class Chat {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "chat_id")
  private int chatId;

  @OneToMany(mappedBy = "chat", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Message> messages;

  @ManyToMany
  @JoinTable(
          name = "user_chat",
          joinColumns = @JoinColumn(name = "chat_id"),
          inverseJoinColumns = @JoinColumn(name = "user_id")
      )
  private List<User> users;

  public Chat() {
    this.messages = new ArrayList<>();
    this.users = new ArrayList<>();
  }

  public void addUser(User user) {
    users.add(user);
    user.getChats().add(this);
  }

  public void removeUser(User user) {
    users.remove(user);
    user.getChats().remove(this);
  }

  public void addMessage(Message message) {
    messages.add(message);
    message.setChat(this);
  }
}
