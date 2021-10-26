package com.gtView.goaltracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gtView.goaltracker.entity.goals.EmployeeGoal;
import com.gtView.goaltracker.entity.goals.GoalType;


/**
 *
 *
 */
@Repository
public interface GoalRepository extends JpaRepository<EmployeeGoal, Integer> {

	public List<EmployeeGoal> findByEmployeeId(@Param("employeeId") String employeeId);
	

	@Query("SELECT g FROM EmployeeGoal g  WHERE g.employeeId = :employeeId AND year(startDate)= :year")
	public List<EmployeeGoal> findByEmployeeIdAndYear(@Param("employeeId") String employeeId,@Param("year") Integer year);
	
	public EmployeeGoal findByEmployeeIdAndGoalType(@Param("employeeId") String employeeId,@Param("goalType") GoalType goalType);
	
	public EmployeeGoal findByPk(Integer id);

}
