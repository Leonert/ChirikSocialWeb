package com.socialnetwork.api.repository;

import com.socialnetwork.api.models.base.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
}
