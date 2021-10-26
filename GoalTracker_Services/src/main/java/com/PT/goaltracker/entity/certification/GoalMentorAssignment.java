package com.gtView.goaltracker.entity.certification;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "goal_mentor_assignment")
@Getter
@Setter
public class GoalMentorAssignment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pk")
	@Schema(description = "The ID specific to the Certification milestone")
	private Integer id;
	
	@Column(name = "is_certification", columnDefinition = "TINYINT")
	@Type(type = "org.hibernate.type.NumericBooleanType")
	private Boolean is_certification;
	
	@Column(name = "dt_created")
	private Date dt_created;
	
	@Column(name = "is_open", columnDefinition = "TINYINT")
	@Type(type = "org.hibernate.type.NumericBooleanType")
	private Boolean is_open;
	
	@OneToOne
	@JoinColumn(name = "certification_id")
	private EmployeeCertification empCertification;
	
}
