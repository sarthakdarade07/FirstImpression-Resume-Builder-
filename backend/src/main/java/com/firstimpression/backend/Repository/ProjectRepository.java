package com.firstimpression.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.firstimpression.backend.model.Project;

public interface ProjectRepository  extends JpaRepository<Project, Integer>{

}
