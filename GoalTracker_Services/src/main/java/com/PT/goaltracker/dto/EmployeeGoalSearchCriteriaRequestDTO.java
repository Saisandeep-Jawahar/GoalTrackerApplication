package com.gtView.goaltracker.dto;

import javax.validation.constraints.NotNull;

public class EmployeeGoalSearchCriteriaRequestDTO {
	
	@NotNull
	private String employeeId;
	
	@NotNull
	private int goalTypeId;
	
	@NotNull
	private int year;

	public String getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	public int getGoalTypeId() {
		return goalTypeId;
	}

	public void setGoalTypeId(int goalTypeId) {
		this.goalTypeId = goalTypeId;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}
	

}
