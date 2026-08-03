package com.firstimpression.backend.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LanguageRequest {

	    private int id;
	    @NotBlank(message = "Language is required")
	    private String language;
	    @NotBlank(message = "Level is required")
	    private String level;
}
