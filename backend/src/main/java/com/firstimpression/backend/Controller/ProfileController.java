package com.firstimpression.backend.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.firstimpression.backend.Services.ProfileService;
import com.firstimpression.backend.dto.CertificationRequest;
import com.firstimpression.backend.dto.EducationRequest;
import com.firstimpression.backend.dto.LanguageRequest;
import com.firstimpression.backend.dto.PersonalInformationRequest;
import com.firstimpression.backend.dto.ProjectRequest;
import com.firstimpression.backend.dto.SkillRequest;
import com.firstimpression.backend.dto.WorkExperienceRequest;
import com.firstimpression.backend.model.Users;
import com.firstimpression.backend.util.AppConstants;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping(AppConstants.PROFILE_CONTROLLER)
public class ProfileController {

	private final ProfileService profileService;

	@PostMapping(AppConstants.SAVE_PERSONAL_INFORMATION)
	public ResponseEntity<?> savePersonalInformation(@RequestBody PersonalInformationRequest req,
			Authentication authentication) {

		log.info("Inside ProfileController - savePersonalInformation():{}");

		Users user = (Users) authentication.getPrincipal();
		profileService.savePersonalInformation(req, user);

		return ResponseEntity.status(HttpStatus.ACCEPTED)
				.body(Map.of("message", "Personal Infromation saved sucessfuly.")); 

	}
	
	@PostMapping(AppConstants.SAVE_EDUCATION)
	public ResponseEntity<?> saveEducation(@RequestBody List<EducationRequest> req, Authentication authentication){
		
		log.info("Inside ProfileController - saveEducation():{}");

		
		Users user = (Users) authentication.getPrincipal();
		 
		profileService.saveEducation(req,user);
		
		return ResponseEntity.status(HttpStatus.ACCEPTED)
				.body(Map.of("message", "Education Infromation saved sucessfuly."));
	}
	
	@PostMapping(AppConstants.SAVE_CERTIFICATIONS)
	public ResponseEntity<?> saveCertifications(
	        @RequestBody List<CertificationRequest> req,
	        Authentication authentication) {

	    log.info("Inside ProfileController - saveCertifications()");

	    Users user = (Users) authentication.getPrincipal();

	    profileService.saveCertifications(req, user);

	    return ResponseEntity.status(HttpStatus.ACCEPTED)
	            .body(Map.of("message", "Certifications saved successfully."));
	}
	
	
	@PostMapping(AppConstants.SAVE_LANGUAGES)
	public ResponseEntity<?> saveLanguages(
	        @RequestBody List<LanguageRequest> req,
	        Authentication authentication) {

	    log.info("Inside ProfileController - saveLanguages()");

	    Users user = (Users) authentication.getPrincipal();

	    profileService.saveLanguages(req, user);

	    return ResponseEntity.status(HttpStatus.ACCEPTED)
	            .body(Map.of("message", "Languages saved successfully."));
	}
	
	@PostMapping(AppConstants.SAVE_PROJECTS)
	public ResponseEntity<?> saveProjects(
	        @RequestBody List<ProjectRequest> req,
	        Authentication authentication) {

	    log.info("Inside ProfileController - saveProjects()");

	    Users user = (Users) authentication.getPrincipal();

	    profileService.saveProjects(req, user);

	    return ResponseEntity.status(HttpStatus.ACCEPTED)
	            .body(Map.of("message", "Projects saved successfully."));
	}
	
	@PostMapping(AppConstants.SAVE_SKILLS)
	public ResponseEntity<?> saveSkills(
	        @RequestBody List<SkillRequest> req,
	        Authentication authentication) {

	    log.info("Inside ProfileController - saveSkills()");

	    Users user = (Users) authentication.getPrincipal();

	    profileService.saveSkills(req, user);

	    return ResponseEntity.status(HttpStatus.ACCEPTED)
	            .body(Map.of("message", "Skills saved successfully."));
	}
	
	@PostMapping(AppConstants.SAVE_WORK_EXPERIENCE)
	public ResponseEntity<?> saveWorkExperience(
	        @RequestBody List<WorkExperienceRequest> req,
	        Authentication authentication) {

	    log.info("Inside ProfileController - saveWorkExperience()");

	    Users user = (Users) authentication.getPrincipal();

	    profileService.saveWorkExperience(req, user);

	    return ResponseEntity.status(HttpStatus.ACCEPTED)
	            .body(Map.of("message", "Work experience saved successfully."));
	}

}
