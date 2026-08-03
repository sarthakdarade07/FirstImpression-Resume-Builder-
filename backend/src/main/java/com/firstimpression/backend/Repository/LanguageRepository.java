package com.firstimpression.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.firstimpression.backend.model.Language;

public interface LanguageRepository extends JpaRepository<Language, Integer> {

}
