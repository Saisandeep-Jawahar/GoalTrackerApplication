package com.gtView.goaltracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gtView.goaltracker.entity.goals.GoalStatus;

public interface GoalStatusRepository extends JpaRepository<GoalStatus, Integer> {

}
