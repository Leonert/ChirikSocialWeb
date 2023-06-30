package com.socialnetwork.api.repository;

import com.socialnetwork.api.model.base.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
}
