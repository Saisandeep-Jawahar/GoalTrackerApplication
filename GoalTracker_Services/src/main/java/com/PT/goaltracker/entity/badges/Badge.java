package com.gtView.goaltracker.entity.badges;

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

@Entity
@Table(name = "badge")
public class Badge implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -3523005856694523447L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pk")
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "level_id", referencedColumnName = "level")
	private BadgeLevel badgeLevel;

	@Column(name = "badge_name")
	private String badgeName;

	@Column(name = "required_score")
	private Integer requiredScore;

	@Column(name = "description")
	private String description;
	
	@Lob
	@Type(type="org.hibernate.type.ImageType")
	private byte[] image;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getBadgeName() {
		return badgeName;
	}

	public void setBadgeName(String badgeName) {
		this.badgeName = badgeName;
	}

	public Integer getRequiredScore() {
		return requiredScore;
	}

	public void setRequiredScore(Integer requiredScore) {
		this.requiredScore = requiredScore;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BadgeLevel getBadgeLevel() {
		return badgeLevel;
	}

	public void setBadgeLevel(BadgeLevel badgeLevel) {
		this.badgeLevel = badgeLevel;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	
	

}
