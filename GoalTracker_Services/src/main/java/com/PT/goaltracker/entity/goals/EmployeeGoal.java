package com.gtView.goaltracker.entity.goals;

import java.util.Date;

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

@Entity
@Table(name = "employee_goal")
public class EmployeeGoal implements java.io.Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer pk;
	
	@ManyToOne
	@JoinColumn(name="status_id")
	private GoalStatus goalStatus;
	
	@ManyToOne
	@JoinColumn(name="goal_type_id")
	private GoalType goalType;
	
	@Column(name = "employee_id")
	private String employeeId;
	
	@Column(name = "goal_title")
	private String goalTitle;
	
	@Column(name = "score")
	private Integer score;
	
	@Column(name = "start_date")
	private Date startDate;
	
	@Column(name = "completed_date")
	private Date completedDate;
	
	@Column(name = "target_date")
	private Date targetDate;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "tags")
	private String tags;
	
	@Column(name = "notify_email")
	private String notifyEmail;
	
	@Column(name = "additional_notifiers")
	private String additionalNotifiers;
	
	@Column(name = "related_url")
	private String relatedUrl;
	
	@Lob
	@Type(type="org.hibernate.type.ImageType")
	@Column(name = "file")
	private byte[] file;
	
	@Column(name = "file_name")
	private String fileName;
	
	@Column(name = "dt_created")
	private Date dtCreated;
	
	@Column(name = "dt_modified")
	private Date dtModified;
	
	@Column(name = "created_by")
	private String createdBy;
	
	@Column(name = "modified_by")
	private String modifiedBy;
	
	@Column(name = "mentor_id")
	private String mentorId;
	
	@Column(name = "is_editable")
	private Byte isEditable;
	
	@Column(name = "self_comments")
	private String selfComments;
	
	@Column(name = "self_evaluation")
	private Integer selfEvaluation;
	
	@Column(name = "instances")
	private Integer instances;
	
	public EmployeeGoal() {
	}

	public EmployeeGoal(GoalType goalType, String employeeId, String goalTitle) {
		this.goalType = goalType;
		this.employeeId = employeeId;
		this.goalTitle = goalTitle;
	}

	public EmployeeGoal(GoalStatus goalStatus, GoalType goalType, String employeeId, String goalTitle, Integer score,
			Date startDate, Date completedDate, Date targetDate, String description, String tags, String notifyEmail,
			String additionalNotifiers, String relatedUrl, byte[] file, Date dtCreated, Date dtModified,
			String createdBy, String modifiedBy, String mentorId, Byte isEditable, String selfComments,
			Integer selfEvaluation, Integer instances,GoalMentorAssignment goalMentorAssignment) {
		this.goalStatus = goalStatus;
		this.goalType = goalType;
		this.employeeId = employeeId;
		this.goalTitle = goalTitle;
		this.score = score;
		this.startDate = startDate;
		this.completedDate = completedDate;
		this.targetDate = targetDate;
		this.description = description;
		this.tags = tags;
		this.notifyEmail = notifyEmail;
		this.additionalNotifiers = additionalNotifiers;
		this.relatedUrl = relatedUrl;
		this.file = file;
		this.dtCreated = dtCreated;
		this.dtModified = dtModified;
		this.createdBy = createdBy;
		this.modifiedBy = modifiedBy;
		this.mentorId = mentorId;
		this.isEditable = isEditable;
		this.selfComments = selfComments;
		this.selfEvaluation = selfEvaluation;
		this.instances = instances;
	}

	public Integer getPk() {
		return this.pk;
	}

	public void setPk(Integer pk) {
		this.pk = pk;
	}

	public GoalStatus getGoalStatus() {
		return this.goalStatus;
	}

	public void setGoalStatus(GoalStatus goalStatus) {
		this.goalStatus = goalStatus;
	}

	public GoalType getGoalType() {
		return this.goalType;
	}

	public void setGoalType(GoalType goalType) {
		this.goalType = goalType;
	}

	public String getEmployeeId() {
		return this.employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	public String getGoalTitle() {
		return this.goalTitle;
	}

	public void setGoalTitle(String goalTitle) {
		this.goalTitle = goalTitle;
	}

	public Integer getScore() {
		return this.score;
	}

	public void setScore(Integer score) {
		this.score = score;
	}

	public Date getStartDate() {
		return this.startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getCompletedDate() {
		return this.completedDate;
	}

	public void setCompletedDate(Date completedDate) {
		this.completedDate = completedDate;
	}

	public Date getTargetDate() {
		return this.targetDate;
	}

	public void setTargetDate(Date targetDate) {
		this.targetDate = targetDate;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTags() {
		return this.tags;
	}

	public void setTags(String tags) {
		this.tags = tags;
	}

	public String getNotifyEmail() {
		return this.notifyEmail;
	}

	public void setNotifyEmail(String notifyEmail) {
		this.notifyEmail = notifyEmail;
	}

	public String getAdditionalNotifiers() {
		return this.additionalNotifiers;
	}

	public void setAdditionalNotifiers(String additionalNotifiers) {
		this.additionalNotifiers = additionalNotifiers;
	}

	public String getRelatedUrl() {
		return this.relatedUrl;
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

	public Date getDtCreated() {
		return this.dtCreated;
	}

	public void setDtCreated(Date dtCreated) {
		this.dtCreated = dtCreated;
	}

	public Date getDtModified() {
		return this.dtModified;
	}

	public void setDtModified(Date dtModified) {
		this.dtModified = dtModified;
	}

	public String getCreatedBy() {
		return this.createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getModifiedBy() {
		return this.modifiedBy;
	}

	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}

	public String getMentorId() {
		return this.mentorId;
	}

	public void setMentorId(String mentorId) {
		this.mentorId = mentorId;
	}

	public Byte getIsEditable() {
		return this.isEditable;
	}

	public void setIsEditable(Byte isEditable) {
		this.isEditable = isEditable;
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

	public Integer getInstances() {
		return this.instances;
	}

	public void setInstances(Integer instances) {
		this.instances = instances;
	}


}
