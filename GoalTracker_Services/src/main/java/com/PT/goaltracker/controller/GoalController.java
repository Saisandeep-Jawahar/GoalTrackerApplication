package com.gtView.goaltracker.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.gtView.goaltracker.dto.EmployeeGoalResponseDTO;
import com.gtView.goaltracker.dto.EmployeeGoalSearchCriteriaRequestDTO;
import com.gtView.goaltracker.entity.goals.EmployeeGoal;
import com.gtView.goaltracker.entity.goals.GoalCategory;
import com.gtView.goaltracker.entity.goals.GoalStatus;
import com.gtView.goaltracker.entity.goals.GoalType;
import com.gtView.goaltracker.mapper.MapperUtils;
import com.gtView.goaltracker.service.GoalService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

/**
 * 
 *
 */
@RestController
@Tag(name = "GoalController", description = "Operations pertaining to EmployeeGoals available")
@RequestMapping("/employeeGoal")
@ResponseStatus(value = HttpStatus.OK)
public class GoalController {
	private static final Logger LOGGER = LoggerFactory.getLogger(GoalController.class);

	@Autowired
	private GoalService goalService;

	@PostMapping("/fetchAllGoalByEmployeeId")
	@Operation(summary = "View a list of Goals Details based on the Employee IDs")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Successfully retrieved list of goals"),
			@ApiResponse(responseCode = "401", description = "You are not authorized to view the resource"),
			@ApiResponse(responseCode = "403", description = "Accessing the resource you were trying to reach is forbidden"),
			@ApiResponse(responseCode = "404", description = "The resource you were trying to reach is not found") })
	public List<EmployeeGoalResponseDTO> fetchAllGoalByEmployeeId(
			@RequestBody EmployeeGoalSearchCriteriaRequestDTO searchCriteria) {
		LOGGER.debug("GoalController Search Criteria " + searchCriteria);
		List<EmployeeGoalResponseDTO> employeeGoalResponseDto = goalService.fetchAllGoalsByEmployeeId(searchCriteria);

		return employeeGoalResponseDto;
	}

	@GetMapping("/fetchGoal/{employeeId}/{goalId}")

	@Operation(summary = "View the Goal Details based on the Employee ID and Goal ID")

	@ApiResponses(value = {

			@ApiResponse(responseCode = "200", description = "Successfully retrieved the Goal details"),

			@ApiResponse(responseCode = "400", description = "Unable to process the request"),

			@ApiResponse(responseCode = "401", description = "You are not authorized to view the resource"),

			@ApiResponse(responseCode = "403", description = "Accessing the resource you were trying to reach is forbidden"),

			@ApiResponse(responseCode = "404", description = "The resource you were trying to reach is not found") })
	public EmployeeGoalResponseDTO fetchGoal(@PathVariable("employeeId") String employeeId,
			@PathVariable("goalId") Integer goalId) {

		LOGGER.info("GoalController Search Particular goal " + goalId);
		return goalService.fetchGoal(employeeId, goalId);

	}

	/**
	 * @param requestpart employeeGoal
	 * @param requestpart file
	 * @return EmployeeGoalResponseDTO
	 */
	@RequestMapping(value = "/addGoal", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	@Operation(summary = "Add a new Goal based on the Employee ID")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Successfully Added the Goal details"),
			@ApiResponse(responseCode = "400", description = "Unable to process the request"),
			@ApiResponse(responseCode = "401", description = "You are not authorized to view the resource"),
			@ApiResponse(responseCode = "403", description = "Accessing the resource you were trying to reach is forbidden"),
			@ApiResponse(responseCode = "404", description = "The resource you were trying to reach is not found") })
	public EmployeeGoalResponseDTO addGoal(@RequestPart(value = "employeeGoal") String request,
			@RequestPart(value = "file", required = false) MultipartFile file) {
		EmployeeGoal employeeGoal = MapperUtils.employeeGoalMapper(request);
		LOGGER.info("Inserting Goal for employee with employee id " + employeeGoal.getEmployeeId());
		try {
			if (!StringUtils.isEmpty(employeeGoal.getFileName()) && null != file) {
				employeeGoal.setFile(file.getBytes());
			}
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return this.goalService.addOrUpdateGoal(employeeGoal);
	}

	@RequestMapping(value = "/updateGoal", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	@Operation(summary = "Update the Goal Details based on the Employee ID and Goal ID")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Successfully updated the Goal details"),
			@ApiResponse(responseCode = "400", description = "Unable to process the request"),
			@ApiResponse(responseCode = "401", description = "You are not authorized to view the resource"),
			@ApiResponse(responseCode = "403", description = "Accessing the resource you were trying to reach is forbidden"),
			@ApiResponse(responseCode = "404", description = "The resource you were trying to reach is not found") })
	public EmployeeGoalResponseDTO updateGoal(@RequestPart(value = "employeeGoal") String request,
			@RequestPart(value = "file", required = false) MultipartFile file) {
		EmployeeGoal employeeGoal = MapperUtils.employeeGoalMapper(request);
		LOGGER.info("GoalController Search Particular goal by Employer Id and Goal Id and updates: "
				+ employeeGoal.getEmployeeId() + " & " + employeeGoal.getGoalType().getId());
		try {
			if (!StringUtils.isEmpty(employeeGoal.getFileName()) && null != file) {
				employeeGoal.setFile(file.getBytes());
			} else if(StringUtils.isEmpty(employeeGoal.getFileName())) {
				employeeGoal.setFile(null);
			}
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return goalService.addOrUpdateGoal(employeeGoal);
	}

	@PostMapping("/fetchAllGoalByEmployeeIdAndYear")
	@Operation(summary = "View a list of Goals Details based on the Employee IDs")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Successfully retrieved list of goals"),
			@ApiResponse(responseCode = "401", description = "You are not authorized to view the resource"),
			@ApiResponse(responseCode = "403", description = "Accessing the resource you were trying to reach is forbidden"),
			@ApiResponse(responseCode = "404", description = "The resource you were trying to reach is not found") })
	public List<EmployeeGoalResponseDTO> fetchAllGoalByEmployeeIdYear(
			@RequestBody EmployeeGoalSearchCriteriaRequestDTO searchCriteria) {
		LOGGER.debug("GoalController Search Criteria " + searchCriteria);
		List<EmployeeGoalResponseDTO> employeeGoalResponseDto = goalService
				.fetchAllGoalsByEmployeeIdAndYear(searchCriteria);

		return employeeGoalResponseDto;
	}

	@GetMapping("/fetchAllGoalCategories")
	@Operation(summary = "Fetch all goal categories")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Successfully retrieved list of goal categories"),
			@ApiResponse(responseCode = "401", description = "You are not authorized to view the resource"),
			@ApiResponse(responseCode = "403", description = "Accessing the resource you were trying to reach is forbidden"),
			@ApiResponse(responseCode = "404", description = "The resource you were trying to reach is not found") })
	public ResponseEntity<List<GoalCategory>> fetchAllGoalCategories() {
		List<GoalCategory> goalCategories = this.goalService.getGoalCategories();
		ResponseEntity<List<GoalCategory>> entity = new ResponseEntity<List<GoalCategory>>(goalCategories,
				HttpStatus.OK);
		return entity;
	}

	@GetMapping("/fetchAllGoalTypes")
	@Operation(summary = "Fetch all goal types")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Successfully retrieved list of goal types"),
			@ApiResponse(responseCode = "401", description = "You are not authorized to view the resource"),
			@ApiResponse(responseCode = "403", description = "Accessing the resource you were trying to reach is forbidden"),
			@ApiResponse(responseCode = "404", description = "The resource you were trying to reach is not found") })
	public ResponseEntity<List<GoalType>> fetchAllGoalTypes() {
		List<GoalType> goalTypes = this.goalService.getGoalTypes();
		ResponseEntity<List<GoalType>> entity = new ResponseEntity<List<GoalType>>(goalTypes, HttpStatus.OK);
		return entity;
	}

	@GetMapping("/fetchAllGoalStatus")
	@Operation(summary = "Fetch all goal status")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Successfully retrieved list of goal status"),
			@ApiResponse(responseCode = "401", description = "You are not authorized to view the resource"),
			@ApiResponse(responseCode = "403", description = "Accessing the resource you were trying to reach is forbidden"),
			@ApiResponse(responseCode = "404", description = "The resource you were trying to reach is not found") })
	public ResponseEntity<List<GoalStatus>> fetchAllGoalStatus() {
		List<GoalStatus> goalStatus = this.goalService.getGoalStatus();
		ResponseEntity<List<GoalStatus>> entity = new ResponseEntity<List<GoalStatus>>(goalStatus, HttpStatus.OK);
		return entity;
	}

	@GetMapping("/downloadAttachment/{goalId}")
	@Operation(summary = "Download the attachment in the goal")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Successfully downloaded the attachment"),
			@ApiResponse(responseCode = "401", description = "You are not authorized to view the resource"),
			@ApiResponse(responseCode = "403", description = "Accessing the resource you were trying to reach is forbidden"),
			@ApiResponse(responseCode = "404", description = "The resource you were trying to reach is not found") })
	public ResponseEntity<byte[]> downloadAttachment(@PathVariable(value = "goalId") Integer goalId) {
		byte[] bytes = null;
		HttpHeaders headers = new HttpHeaders();
		HttpStatus status = null;
		try {
			EmployeeGoalResponseDTO dto = this.goalService.fetchGoalByGoalID(goalId);
			if (dto == null) {
				status = HttpStatus.NO_CONTENT;
				throw new SQLException("No Data found");
			}
			bytes = dto.getFile();
			String fileName = dto.getFileName();
			if (null != bytes && !StringUtils.isEmpty(fileName)) {
				// to set the file name along with extension
				headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"");
				status = HttpStatus.OK;
			} else {
				status = HttpStatus.NO_CONTENT;
			}
		} catch (SQLException e) {
			LOGGER.warn(e.getMessage());
			return new ResponseEntity<byte[]>(bytes, status);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
			return new ResponseEntity<byte[]>(bytes, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		ResponseEntity<byte[]> responseEntity = new ResponseEntity<byte[]>(bytes, headers, status);
		return responseEntity;
	}
}
