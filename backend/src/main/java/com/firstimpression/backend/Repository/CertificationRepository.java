package com.firstimpression.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.firstimpression.backend.model.Certification;

public interface CertificationRepository extends JpaRepository<Certification, Integer> {
 
}
