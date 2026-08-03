package com.firstimpression.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.firstimpression.backend.model.Skill;

public interface SkillRepository extends JpaRepository<Skill, Integer> {

}
