package com.firstimpression.backend.dto;



import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PersonalInformationRequest {

	private int id;
	
    private int personalInformationId;

	@NotBlank(message = "Name required")
	@Size(min =2 ,max=20, message="Name should be between 2 to 20 characters.")
	private String name;
	private String location;
	private String role;
	@Email(message="Enter valid email")
	private String email;
	private String linkedinUrl;
	private String githubUrl;
	private String portfolioUrl;
	@Size(max= 20, message="Length invalid.")
	private String phoneNo;
	private String photoUrl;
}
