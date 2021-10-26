package com.gtView.goaltracker.entity.certification;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "certification_milestone_history")
@Schema(description = "Certification milestone Information")
@Getter
@Setter
public class CertificationMilestoneHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pk")
	@Schema(description = "The ID specific to the Certification milestone")
	private Integer id;
	
	@OneToOne
	@JoinColumn(name = "certification_id")
	private EmployeeCertification empCertification;

	@Column(name = "milestone_id")
	@Schema(description = "The id associated to the milestone")
	private Integer milestoneId;

}
