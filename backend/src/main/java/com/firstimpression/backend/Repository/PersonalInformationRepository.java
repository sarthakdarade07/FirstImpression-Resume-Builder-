package com.firstimpression.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.firstimpression.backend.model.PersonalInformation;

public interface PersonalInformationRepository extends JpaRepository<PersonalInformation, Integer> {

}
