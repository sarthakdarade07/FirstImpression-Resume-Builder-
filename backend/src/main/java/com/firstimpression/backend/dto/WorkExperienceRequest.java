package com.firstimpression.backend.dto;

import java.time.LocalDate;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class WorkExperienceRequest {

	    private int id;
		@NotBlank(message = "company Name is required")
		@Size(min=2, max =50 , message= "Company name should between 2 to 50.")
		private String companyName;
		@NotBlank(message = "Job title is required")
		@Size(max =50 , message= "Company name should not be greater than 50.")
		private String jobTitle;
		@Size(max =20 , message= "Company name should not be greater than 20.")
		private String location;
		private LocalDate joinDate;
		private LocalDate endDate;
		@Size(max =1000 , message= "Description should not be greater than 1000 characters.")
		private String description;
		private List<String>  technologies;	
}
