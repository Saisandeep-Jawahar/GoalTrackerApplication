package com.gtView.goaltracker.mapper;


import org.mapstruct.Mapper;

import com.gtView.goaltracker.dto.EmployeeGoalResponseDTO;
import com.gtView.goaltracker.entity.goals.EmployeeGoal;

/**
 *
 */
@Mapper(
    componentModel = "spring"
)
public interface MapStructMapper {

	EmployeeGoalResponseDTO EmployeeGoalToEmployeeGoalResponseDto(EmployeeGoal employeeGoal);
}