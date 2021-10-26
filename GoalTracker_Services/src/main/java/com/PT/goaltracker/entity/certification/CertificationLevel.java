package com.gtView.goaltracker.entity.certification;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import io.swagger.v3.oas.annotations.media.Schema;

@Entity
@Table(name = "certification_level")
@Schema(description = "Certification Level Information")
public class CertificationLevel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pk")
	@Schema(description = "The ID specific to the Certification Level")
	private Integer id;

	@Column(name = "level_name")
	@Schema(description = "The Name of the Level")
	private String name;

	@Column(name = "description")
	@Schema(description = "The Level Description")
	private String description;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
