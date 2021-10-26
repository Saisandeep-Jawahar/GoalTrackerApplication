package com.gtView.goaltracker.entity.goals;

import java.io.Serializable;
import javax.persistence.*;

import com.gtView.goaltracker.entity.certification.EmployeeCertification;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;


/**
 * The persistent class for the goal_mentor_assignment database table.
 * 
 */
@Entity
@Getter
@Setter
@Table(name="goal_mentor_assignment")
public class GoalMentorAssignment implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int pk;

	@Column(name="assigned_by")
	private String assignedBy;

	@Column(name="assigned_to")
	private String assignedTo;

	@Temporal(TemporalType.DATE)
	@Column(name="dt_completed")
	private Date dtCompleted;

	@Temporal(TemporalType.DATE)
	@Column(name="dt_created")
	private Date dtCreated;

	@Column(name="is_certification")
	private byte isCertification;

	@Column(name="is_open")
	private byte isOpen;

	//bi-directional many-to-one association to EmployeeCertification
	@ManyToOne
	@JoinColumn(name="certification_id")
	private EmployeeCertification employeeCertification;

	//bi-directional many-to-one association to EmployeeGoal
	@ManyToOne
	@JoinColumn(name="goal_id")
	private EmployeeGoal employeeGoal;

	public GoalMentorAssignment() {
	}

	public int getPk() {
		return this.pk;
	}

	public void setPk(int pk) {
		this.pk = pk;
	}

	public String getAssignedBy() {
		return this.assignedBy;
	}

	public void setAssignedBy(String assignedBy) {
		this.assignedBy = assignedBy;
	}

	public String getAssignedTo() {
		return this.assignedTo;
	}

	public void setAssignedTo(String assignedTo) {
		this.assignedTo = assignedTo;
	}

	public Date getDtCompleted() {
		return this.dtCompleted;
	}

	public void setDtCompleted(Date dtCompleted) {
		this.dtCompleted = dtCompleted;
	}

	public Date getDtCreated() {
		return this.dtCreated;
	}

	public void setDtCreated(Date dtCreated) {
		this.dtCreated = dtCreated;
	}

	public byte getIsCertification() {
		return this.isCertification;
	}

	public void setIsCertification(byte isCertification) {
		this.isCertification = isCertification;
	}

	public byte getIsOpen() {
		return this.isOpen;
	}

	public void setIsOpen(byte isOpen) {
		this.isOpen = isOpen;
	}

	public EmployeeCertification getEmployeeCertification() {
		return this.employeeCertification;
	}

	public void setEmployeeCertification(EmployeeCertification employeeCertification) {
		this.employeeCertification = employeeCertification;
	}

	public EmployeeGoal getEmployeeGoal() {
		return this.employeeGoal;
	}

	public void setEmployeeGoal(EmployeeGoal employeeGoal) {
		this.employeeGoal = employeeGoal;
	}

}