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

@Entity
@Table(name = "certification_topic")
@Schema(description = "Certification Topic Information")
public class CertificationTopic {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pk")
	@Schema(description = "The ID specific to the Certification Topic")
	private Integer id;

	@Column(name = "topic_name")
	@Schema(description = "The Name of the Topic")
	private String name;

	@OneToOne
	@JoinColumn(name = "category_id")
	@Schema(description = "The Category of the Topic")
	private CertificationCategory category;

	@OneToOne
	@JoinColumn(name = "vendor_id")
	@Schema(description = "The Vendor of the Topic")
	private CertificationVendor vendor;

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

	public CertificationCategory getCategory() {
		return category;
	}

	public void setCategory(CertificationCategory category) {
		this.category = category;
	}

	public CertificationVendor getVendor() {
		return vendor;
	}

	public void setVendor(CertificationVendor vendor) {
		this.vendor = vendor;
	}

}
