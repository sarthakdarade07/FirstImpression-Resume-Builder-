package com.firstimpression.backend.dto;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileResponse {

	private AuthResponse authResponse;
    private PersonalInformationResponse personalInformation;

    private List<EducationResponse> educations;

    private List<WorkExperienceResponse> workExperiences;

    private List<ProjectResponse> projects;

    private List<SkillResponse> skills;

    private List<CertificationResponse> certifications;

    private List<LanguageResponse> languages;
}