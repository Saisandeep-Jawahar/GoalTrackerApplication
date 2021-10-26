package com.gtView.goaltracker.entity.goals;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the goal_comment database table.
 * 
 */
@Entity
@Table(name="goal_comment")
public class GoalComment implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int pk;

	private String comment;

	@Temporal(TemporalType.DATE)
	@Column(name="comment_date")
	private Date commentDate;

	@Column(name="employee_id")
	private String employeeId;

	//bi-directional many-to-one association to EmployeeGoal
	@ManyToOne
	@JoinColumn(name="goal_id")
	private EmployeeGoal employeeGoal;

	public GoalComment() {
	}

	public int getPk() {
		return this.pk;
	}

	public void setPk(int pk) {
		this.pk = pk;
	}

	public String getComment() {
		return this.comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Date getCommentDate() {
		return this.commentDate;
	}

	public void setCommentDate(Date commentDate) {
		this.commentDate = commentDate;
	}

	public String getEmployeeId() {
		return this.employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	public EmployeeGoal getEmployeeGoal() {
		return this.employeeGoal;
	}

	public void setEmployeeGoal(EmployeeGoal employeeGoal) {
		this.employeeGoal = employeeGoal;
	}

}