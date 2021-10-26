package com.gtView.goaltracker.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ErrorMessage {
	private int statusCode;
	private String message;
	private String description;

}
