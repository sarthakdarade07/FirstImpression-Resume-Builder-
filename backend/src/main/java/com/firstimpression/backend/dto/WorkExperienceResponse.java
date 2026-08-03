package com.firstimpression.backend.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WorkExperienceResponse {

    private Integer id;
    private String companyName;
    private String jobTitle;
    private String location;
    private LocalDate joinDate;
    private LocalDate endDate;
    private String description;
    private List<String> technologies;
}