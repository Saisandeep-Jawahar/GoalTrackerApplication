package com.gtView.goaltracker.dto;

import java.util.Date;

import javax.validation.constraints.NotNull;

public class EmployeeGoalResponseDTO {
	
	@NotNull
	private Integer pk;
	@NotNull
	private String employeeId;
	@NotNull
	private String goalTitle;
	@NotNull
	private String categoryName;
	@NotNull
	private String template;
	
	@NotNull
	private String description;
	
	@NotNull
	private String status;
	
    private Date createdDate;
	
	private Date targetDate;

	private Date completedDate;
	
	private String tags;
	
	private String additionalNotifiers;
	
	private String relatedUrl;
	
	private String selfComments;
	
	private Integer selfEvaluation;
	
	private byte[] file;
	
	private String fileName;
	
	private String mentorId;
	
	private String assignedBy;
	
	public String getEmployeeId() {
		return employeeId;
	}
	
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
	
	public String getGoalTitle() {
		return goalTitle;
	}
	public void setGoalTitle(String goalTitle) {
		this.goalTitle = goalTitle;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public String getTemplate() {
		return template;
	}
	public void setTemplate(String template) {
		this.template = template;
	}
	
	public String getDescription() {
		return description;
	}
	
	public String getAdditionalNotifiers() {
		return additionalNotifiers;
	}
	
	public String getRelatedUrl() {
		return relatedUrl;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public Date getTargetDate() {
		return targetDate;
	}
	public void setTargetDate(Date targetDate) {
		this.targetDate = targetDate;
	}
	
	public Date getCompletedDate() {
		return completedDate;
	}
	
	public String getSelfComments() {
		return this.selfComments;
	}

	public void setSelfComments(String selfComments) {
		this.selfComments = selfComments;
	}

	public Integer getSelfEvaluation() {
		return this.selfEvaluation;
	}

	public void setSelfEvaluation(Integer selfEvaluation) {
		this.selfEvaluation = selfEvaluation;
	}
	
	public void setCompletedDate(Date completedDate) {
		this.completedDate = completedDate;
	}
	public String getTags() {
		return tags;
	}
	public void setTags(String tags) {
		this.tags = tags;
	}
	
	public void setAdditionalNotifiers(String additionalNotifiers) {
		this.additionalNotifiers = additionalNotifiers;
	}
	
	public void setRelatedUrl(String relatedUrl) {
		this.relatedUrl = relatedUrl;
	}
	
	public byte[] getFile() {
		return this.file;
	}

	public void setFile(byte[] file) {
		this.file = file;
	}
	
	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getMentorId() {
		return this.mentorId;
	}

	public void setMentorId(String mentorId) {
		this.mentorId = mentorId;
	}
	
	public String getAssignedBy() {
		return this.assignedBy;
	}

	public void setAssignedBy(String assignedBy) {
		this.assignedBy = assignedBy;
	}
	
	public Integer getPk() {
		return this.pk;
	}

	public void setPk(Integer pk) {
		this.pk = pk;
	}
	
	
}
