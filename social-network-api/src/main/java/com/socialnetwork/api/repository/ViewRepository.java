package com.socialnetwork.api.repository;

import com.socialnetwork.api.model.additional.View;
import com.socialnetwork.api.model.additional.keys.ViewPk;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ViewRepository extends JpaRepository<View, ViewPk> {
}
