package com.gtView.goaltracker.mapper;


import org.springframework.stereotype.Component;

import com.gtView.goaltracker.dto.EmployeeGoalResponseDTO;
import com.gtView.goaltracker.entity.goals.EmployeeGoal;

/**
 *
 *
 */
@Component
public class MapStructMapperImpl implements MapStructMapper {
	
	@Override
	  public EmployeeGoalResponseDTO EmployeeGoalToEmployeeGoalResponseDto(EmployeeGoal employeeGoal) {
		if(employeeGoal ==null)
			return null;
		EmployeeGoalResponseDTO employeeGoalResponseDTO= new EmployeeGoalResponseDTO();
		employeeGoalResponseDTO.setPk(employeeGoal.getPk());
		employeeGoalResponseDTO.setEmployeeId(employeeGoal.getEmployeeId());
		employeeGoalResponseDTO.setGoalTitle(employeeGoal.getGoalTitle());
		employeeGoalResponseDTO.setCategoryName(employeeGoal.getGoalType().getGoalCategory().getName());
		employeeGoalResponseDTO.setTemplate(employeeGoal.getGoalType().getName());
		employeeGoalResponseDTO.setDescription(employeeGoal.getDescription());
		employeeGoalResponseDTO.setStatus(employeeGoal.getGoalStatus().getStatus());
		employeeGoalResponseDTO.setCreatedDate(employeeGoal.getDtCreated());
		employeeGoalResponseDTO.setTargetDate(employeeGoal.getTargetDate());
		employeeGoalResponseDTO.setCompletedDate(employeeGoal.getCompletedDate());
		employeeGoalResponseDTO.setTags(employeeGoal.getTags());
		employeeGoalResponseDTO.setAdditionalNotifiers(employeeGoal.getAdditionalNotifiers());
		employeeGoalResponseDTO.setRelatedUrl(employeeGoal.getRelatedUrl());
		employeeGoalResponseDTO.setSelfComments(employeeGoal.getSelfComments());
		employeeGoalResponseDTO.setSelfEvaluation(employeeGoal.getSelfEvaluation());
		employeeGoalResponseDTO.setFile(employeeGoal.getFile());
		employeeGoalResponseDTO.setFileName(employeeGoal.getFileName());
		employeeGoalResponseDTO.setMentorId(employeeGoal.getMentorId());
		return employeeGoalResponseDTO;
	}

    
}
