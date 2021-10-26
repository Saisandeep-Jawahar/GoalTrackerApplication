package com.gtView.goaltracker.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.gtView.goaltracker.dto.EmployeeGoalResponseDTO;
import com.gtView.goaltracker.dto.EmployeeGoalSearchCriteriaRequestDTO;
import com.gtView.goaltracker.entity.goals.EmployeeGoal;
import com.gtView.goaltracker.entity.goals.GoalCategory;
import com.gtView.goaltracker.entity.goals.GoalStatus;
import com.gtView.goaltracker.entity.goals.GoalType;
import com.gtView.goaltracker.exception.ResourceNotFoundException;
import com.gtView.goaltracker.mapper.MapStructMapper;
import com.gtView.goaltracker.repository.GoalCategoryRepository;
import com.gtView.goaltracker.repository.GoalRepository;
import com.gtView.goaltracker.repository.GoalStatusRepository;
import com.gtView.goaltracker.repository.GoalTypeRepository;

/**
 *
 *
 */
@Service
public class GoalService {

	private static final Logger LOGGER = LoggerFactory.getLogger(GoalService.class);
	@Autowired
	private GoalRepository goalRepository;
	
	@Autowired
	private GoalCategoryRepository goalCategoryRepository;

	@Autowired
	private GoalTypeRepository goalTypeRepository;
	
	@Autowired
	private GoalStatusRepository goalStatusRepository;
	
	@Autowired
	private MapStructMapper mapper;

	public List<EmployeeGoalResponseDTO> fetchAllGoalsByEmployeeId(EmployeeGoalSearchCriteriaRequestDTO searchCriteria) {
		LOGGER.debug("Searching Employee Goals with search criteria: " + searchCriteria);
	List<EmployeeGoal> employeeGoals=	goalRepository.findByEmployeeId(searchCriteria.getEmployeeId());
	List<EmployeeGoalResponseDTO> employeeGoalResponseDto=new ArrayList<EmployeeGoalResponseDTO>();
		if(!employeeGoals.isEmpty()) {
			employeeGoals.forEach(eg ->{
				employeeGoalResponseDto.add(mapper.EmployeeGoalToEmployeeGoalResponseDto(eg));
			
			  }); 
		}
		return employeeGoalResponseDto;

	}

	public EmployeeGoalResponseDTO fetchGoal(String employeeId, Integer goalId) {
		GoalType goalType = new GoalType();
		goalType.setId(goalId);
		EmployeeGoalResponseDTO fetchGoal= mapper.EmployeeGoalToEmployeeGoalResponseDto(goalRepository.findByEmployeeIdAndGoalType(employeeId, goalType));
		return fetchGoal;
	}

	public EmployeeGoalResponseDTO addOrUpdateGoal(EmployeeGoal employeeGoal) {
		EmployeeGoalResponseDTO employeeGoalResponseDTO = mapper
				.EmployeeGoalToEmployeeGoalResponseDto(goalRepository.save(employeeGoal));
		return employeeGoalResponseDTO;
	}
	
	public List<EmployeeGoalResponseDTO> fetchAllGoalsByEmployeeIdAndYear(EmployeeGoalSearchCriteriaRequestDTO searchCriteria) {
		LOGGER.debug("Searching Employee Goals with search criteria: " + searchCriteria);
	List<EmployeeGoal> employeeGoals=	goalRepository.findByEmployeeIdAndYear(searchCriteria.getEmployeeId(),searchCriteria.getYear());
	List<EmployeeGoalResponseDTO> employeeGoalResponseDto=new ArrayList<EmployeeGoalResponseDTO>();
		if(!employeeGoals.isEmpty()) {
			employeeGoals.forEach(eg ->{
				employeeGoalResponseDto.add(mapper.EmployeeGoalToEmployeeGoalResponseDto(eg));
			
			  }); 
		}
		return employeeGoalResponseDto;

	}
	
	public List<GoalCategory> getGoalCategories() {
		List<GoalCategory> goalCategories = goalCategoryRepository.findAll();
		if(CollectionUtils.isEmpty(goalCategories)) {
			throw new ResourceNotFoundException("No data found");
		}
		return goalCategories;
	}
	
	public List<GoalType> getGoalTypes() {
		List<GoalType> goalTypes = goalTypeRepository.findAll();
		if(CollectionUtils.isEmpty(goalTypes)) {
			throw new ResourceNotFoundException("No data found");
		}
		return goalTypes;
	}
	
	public List<GoalStatus> getGoalStatus() {
		List<GoalStatus> goalStatus = goalStatusRepository.findAll();
		if(CollectionUtils.isEmpty(goalStatus)) {
			throw new ResourceNotFoundException("No data found");
		}
		return goalStatus;
	}
	
	public EmployeeGoalResponseDTO fetchGoalByGoalID(Integer id) {
		EmployeeGoal employeeGoal = goalRepository.findByPk(id);
			return mapper.EmployeeGoalToEmployeeGoalResponseDto(employeeGoal);
	}
	
}
