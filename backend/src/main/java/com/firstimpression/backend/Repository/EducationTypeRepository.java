package com.firstimpression.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.firstimpression.backend.model.EducationType;

public interface EducationTypeRepository extends JpaRepository<EducationType, Integer>  {

}
