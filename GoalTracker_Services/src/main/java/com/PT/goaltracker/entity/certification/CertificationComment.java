package com.gtView.goaltracker.entity.certification;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "certification_comment")
@Schema(description = "Certification comment Information")
@Getter
@Setter
public class CertificationComment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pk")
	@Schema(description = "The ID specific to the Certification comment")
	private Integer id;
	
	@Column(name = "certification_id")
	@Schema(description = "The ID specific to the employee Certification")
	private Integer enrollmentId;
	
	@Column(name = "employee_id")
	@Schema(description = "The id of the employee")
	private String employeeId;
	
	@Column(name = "comment")
	@Schema(description = "The comment specifit to the certificate completion")
	private String comment;
	
	@Column(name = "dt_created")
	private Date dtCreated;
}