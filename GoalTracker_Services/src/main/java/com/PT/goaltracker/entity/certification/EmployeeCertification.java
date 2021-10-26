package com.gtView.goaltracker.entity.certification;


import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "employee_certification")
@Getter
@Setter
public class EmployeeCertification {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pk")
	@Schema(description = "The ID specific to the employee certification")
	private Integer id;
	
	@Column(name = "employee_id")
	private String employeeId;
	
	@Column(name = "is_goal", columnDefinition = "TINYINT")
	@Type(type = "org.hibernate.type.NumericBooleanType")
	private Boolean isGoal;
	
	@Column(name = "goal_id")
	@Schema(description = "The ID specific to the employee certification")
	private Integer goalId;
	
	@Column(name = "mentor_id")
	@Schema(description = "The ID specific to the mentor")
	private String mentorId;
	
	@Column(name = "start_date")
	private Date startDate;
	
	@Column(name = "target_date")
	private Date targetDate;
	
	@Column(name = "dt_created")
	private Date dtCreated;
	
	@Column(name = "completed_date")
	private Date completedDate;
	
	@OneToOne
	@JoinColumn(name = "certification_id")
	private CertificationDetails certification;
	
	@OneToOne
	@JoinColumn(name = "milestone_id")
	private CertificationMilestone milestone;
	
	@Column(name = "created_by")
	private String createdBy;
	
	@Column(name = "self_comment")
	private String selfComment;
	
	@Column(name = "self_evaluation")
	private Integer selfEvaluation;
	
	@Column(name = "score")
	private Integer score;
	
	@OneToMany
	@JoinColumn(name = "certification_id", referencedColumnName = "pk")
	private List<CertificationComment> comments;

}
