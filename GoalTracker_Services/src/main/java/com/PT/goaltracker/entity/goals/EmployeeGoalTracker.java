package com.gtView.goaltracker.entity.goals;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Type;


/**
 * The persistent class for the employee_goal_tracker database table.
 * 
 */
@Entity
@Table(name="employee_goal_tracker")
public class EmployeeGoalTracker implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int pk;

	@Column(name="employee_id")
	private String employeeId;

	@Lob
	@Type(type="org.hibernate.type.ImageType")
	private byte[] file;

	@Column(name="mentor_id")
	private String mentorId;

	@Column(name="related_url")
	private String relatedUrl;

	private int score;
	
	@Column(name = "goal_category")
	private Integer goalCategory;

	@Column(name="self_comment")
	private String selfComment;

	@Column(name="self_evaluation")
	private int selfEvaluation;

	//bi-directional many-to-one association to EmployeeGoal
	@ManyToOne
	@JoinColumn(name="goal_id")
	private EmployeeGoal employeeGoal;

	//bi-directional many-to-one association to GoalStatus
	@ManyToOne
	@JoinColumn(name="status_id")
	private GoalStatus goalStatus;

	public EmployeeGoalTracker() {
	}

	public int getPk() {
		return pk;
	}

	public void setPk(int pk) {
		this.pk = pk;
	}

	public String getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	public byte[] getFile() {
		return file;
	}

	public void setFile(byte[] file) {
		this.file = file;
	}

	public String getMentorId() {
		return mentorId;
	}

	public void setMentorId(String mentorId) {
		this.mentorId = mentorId;
	}

	public String getRelatedUrl() {
		return relatedUrl;
	}

	public void setRelatedUrl(String relatedUrl) {
		this.relatedUrl = relatedUrl;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public String getSelfComment() {
		return selfComment;
	}

	public void setSelfComment(String selfComment) {
		this.selfComment = selfComment;
	}

	public int getSelfEvaluation() {
		return selfEvaluation;
	}

	public void setSelfEvaluation(int selfEvaluation) {
		this.selfEvaluation = selfEvaluation;
	}

	public EmployeeGoal getEmployeeGoal() {
		return employeeGoal;
	}

	public void setEmployeeGoal(EmployeeGoal employeeGoal) {
		this.employeeGoal = employeeGoal;
	}

	public GoalStatus getGoalStatus() {
		return goalStatus;
	}

	public void setGoalStatus(GoalStatus goalStatus) {
		this.goalStatus = goalStatus;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}