package com.gtView.goaltracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gtView.goaltracker.entity.goals.GoalCategory;

public interface GoalCategoryRepository extends JpaRepository<GoalCategory, Integer> {

}
