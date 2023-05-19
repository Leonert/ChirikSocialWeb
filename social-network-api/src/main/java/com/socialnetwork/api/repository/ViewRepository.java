package com.socialnetwork.api.repository;

import com.socialnetwork.api.models.additional.View;
import com.socialnetwork.api.models.additional.keys.ViewPk;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ViewRepository extends JpaRepository<View, ViewPk> {
}
