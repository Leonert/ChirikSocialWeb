package com.socialnetwork.api.repository;


import com.socialnetwork.api.models.additional.Retweet;
import com.socialnetwork.api.models.additional.keys.RetweetPk;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RetweetRepository extends JpaRepository<Retweet, RetweetPk> {
}
