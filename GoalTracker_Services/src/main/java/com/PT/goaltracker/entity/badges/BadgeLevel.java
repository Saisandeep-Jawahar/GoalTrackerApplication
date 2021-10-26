package com.gtView.goaltracker.entity.badges;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "badge_level")
public class BadgeLevel implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1892391689965984062L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pk")
	private Integer id;

	@Column(name = "level")
	private Integer level;

	@Column(name = "level_name")
	private String levelName;

	@Column(name = "description")
	private String description;
	
	@OneToMany(mappedBy = "badgeLevel", fetch = FetchType.EAGER)
	private Set<Badge> badges;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public String getLevelName() {
		return levelName;
	}

	public void setLevelName(String levelName) {
		this.levelName = levelName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Set<Badge> getBadges() {
		return badges;
	}

	public void setBadges(Set<Badge> badges) {
		this.badges = badges;
	}

	

}
