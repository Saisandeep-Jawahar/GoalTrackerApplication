package com.gtView.goaltracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gtView.goaltracker.entity.goals.GoalType;

public interface GoalTypeRepository extends JpaRepository<GoalType, Integer> {

}
