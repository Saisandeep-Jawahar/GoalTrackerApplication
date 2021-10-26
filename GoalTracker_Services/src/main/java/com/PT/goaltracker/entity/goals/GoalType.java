package com.gtView.goaltracker.entity.goals;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "goal_type")
public class GoalType {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pk")
	private Integer id;

	@Column(name = "name")
	private String name;

	@Column(name = "max_credit")
	private Integer maxCredit;

	@Column(name = "median1_credit")
	private Integer median1Credit;

	@Column(name = "median2_credit")
	private Integer median2Credit;

	@Column(name = "min_credit")
	private Integer minCredit;

	@Column(name = "max_credit_description")
	private String maxCreditDescription;

	@Column(name = "median1_credit_description")
	private String median1CreditDescription;

	@Column(name = "median2_credit_description")
	private String median2CreditDescription;

	@Column(name = "min_credit_description")
	private String minCreditDescription;

	@OneToOne
	@JoinColumn(name = "category_id")
	private GoalCategory goalCategory;

	@Column(name = "mandatory", columnDefinition = "TINYINT")
	@Type(type = "org.hibernate.type.NumericBooleanType")
	private Boolean mandatory;

	@Column(name = "description")
	private String description;
	
	@Column(name = "order")
	private Integer order;

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

	public Integer getMaxCredit() {
		return maxCredit;
	}

	public void setMaxCredit(Integer maxCredit) {
		this.maxCredit = maxCredit;
	}

	public Integer getMedian1Credit() {
		return median1Credit;
	}

	public void setMedian1Credit(Integer median1Credit) {
		this.median1Credit = median1Credit;
	}

	public Integer getMedian2Credit() {
		return median2Credit;
	}

	public void setMedian2Credit(Integer median2Credit) {
		this.median2Credit = median2Credit;
	}

	public Integer getMinCredit() {
		return minCredit;
	}

	public void setMinCredit(Integer minCredit) {
		this.minCredit = minCredit;
	}

	public String getMaxCreditDescription() {
		return maxCreditDescription;
	}

	public void setMaxCreditDescription(String maxCreditDescription) {
		this.maxCreditDescription = maxCreditDescription;
	}

	public String getMedian1CreditDescription() {
		return median1CreditDescription;
	}

	public void setMedian1CreditDescription(String median1CreditDescription) {
		this.median1CreditDescription = median1CreditDescription;
	}

	public String getMedian2CreditDescription() {
		return median2CreditDescription;
	}

	public void setMedian2CreditDescription(String median2CreditDescription) {
		this.median2CreditDescription = median2CreditDescription;
	}

	public String getMinCreditDescription() {
		return minCreditDescription;
	}

	public void setMinCreditDescription(String minCreditDescription) {
		this.minCreditDescription = minCreditDescription;
	}

	public GoalCategory getGoalCategory() {
		return goalCategory;
	}

	public void setGoalCategory(GoalCategory category) {
		this.goalCategory = category;
	}

	public Boolean getMandatory() {
		return mandatory;
	}

	public void setMandatory(Boolean mandatory) {
		this.mandatory = mandatory;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getOrder() {
		return order;
	}

	public void setOrder(Integer order) {
		this.order = order;
	}
	
}
