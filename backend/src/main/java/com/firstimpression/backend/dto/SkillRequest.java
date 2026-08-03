package com.firstimpression.backend.dto;



import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class SkillRequest {
	 private int id;

	    @NotBlank(message = "Skill title is required")
	    private String title;

	    @NotBlank(message = "Skill level is required")
	    private String level;
}
