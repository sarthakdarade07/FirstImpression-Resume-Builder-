package com.firstimpression.backend.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EducationRequest {

	 private int educationId;
	    @NotNull(message = "Education type is required")
	    private int educationTypeId;
	    @NotBlank(message = "Institute name is required")
	    private String instituteName;
	    @NotNull(message = "Score type is required")
	    private int scoreTypeId;
	    @NotNull(message = "Score is required")
	    private BigDecimal score;
	    private int startYear;
	    private int endYear;
	    private String boardOrUniversity;
	    private String specialization;
}
