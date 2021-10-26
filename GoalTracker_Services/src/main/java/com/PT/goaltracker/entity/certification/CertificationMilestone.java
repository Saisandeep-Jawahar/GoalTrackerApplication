package com.gtView.goaltracker.entity.certification;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "certification_milestone")
@Schema(description = "Certification milestone Information")
@Getter
@Setter
public class CertificationMilestone {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pk")
	@Schema(description = "The ID specific to the Certification milestone")
	private Integer id;

	@Column(name = "milestone_name")
	@Schema(description = "The Name of the milestone")
	private String name;
	
	@Lob
	@Type(type="org.hibernate.type.ImageType")
	private byte[] image;

}