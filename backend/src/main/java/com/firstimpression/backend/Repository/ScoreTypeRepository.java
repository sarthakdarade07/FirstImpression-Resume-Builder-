package com.firstimpression.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.firstimpression.backend.model.ScoreType;

public interface ScoreTypeRepository  extends JpaRepository<ScoreType, Integer>{
 
}
