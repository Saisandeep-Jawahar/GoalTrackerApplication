package com.gtView.goaltracker.entity.goals;
import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Table(name="goal_status")
public class GoalStatus implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pk")
	private int pk;

	@Column(name = "description")
	private String description;

	@Column(name = "status")
	private String status;

	//bi-directional many-to-one association to EmployeeGoalTracker
	@OneToMany(mappedBy="goalStatus")
	private List<EmployeeGoalTracker> employeeGoalTrackers;

	public int getPk() {
		return pk;
	}

	public void setPk(int pk) {
		this.pk = pk;
	}

	public String getDescription() {
		return description;
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

	public List<EmployeeGoalTracker> getEmployeeGoalTrackers() {
		return employeeGoalTrackers;
	}

	public void setEmployeeGoalTrackers(List<EmployeeGoalTracker> employeeGoalTrackers) {
		this.employeeGoalTrackers = employeeGoalTrackers;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}