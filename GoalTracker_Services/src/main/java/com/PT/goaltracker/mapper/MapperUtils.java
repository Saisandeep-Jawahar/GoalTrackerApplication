package com.gtView.goaltracker.mapper;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gtView.goaltracker.entity.goals.EmployeeGoal;

public class MapperUtils {
	public static EmployeeGoal employeeGoalMapper(String jsonObj) {
		ObjectMapper mapper = new ObjectMapper();
		EmployeeGoal employeeGoal = null;
		try {
			employeeGoal = mapper.readValue(jsonObj, EmployeeGoal.class);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return employeeGoal;
	}
}
