package com.gtView.goaltracker.entity.certification;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import lombok.Getter;
import lombok.Setter;
@Entity
@Getter
@Setter
@Table(name = "certification")
public class CertificationDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pk")
	private Integer certificationId;

	@Column(name = "certification_name")
	private String certificationName;

	@Column(name = "description")
	private String description;

	@Column(name = "url")
	private String url;
	
	@Column(name = "tags")
	private String tags;

	@Column(name = "required_experience")
	private Integer requiredExperience;

	@Column(name = "exam_reqiured", columnDefinition = "TINYINT")
	@Type(type = "org.hibernate.type.NumericBooleanType")
	private Boolean examRequired;

	@OneToOne
	@JoinColumn(name = "topic_id")
	private CertificationTopic topic;

	@OneToOne
	@JoinColumn(name = "site_id")
	private CertificationSite site;

	@OneToOne
	@JoinColumn(name = "level_id")
	private CertificationLevel level;

}
