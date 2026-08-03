package com.firstimpression.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.firstimpression.backend.model.Education;

public interface EducationRepository extends JpaRepository<Education, Integer> {

}
