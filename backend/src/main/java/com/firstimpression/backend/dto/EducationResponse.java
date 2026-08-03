package com.firstimpression.backend.dto;

import java.math.BigDecimal;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EducationResponse {

    private Integer id;
    private String educationType;
    private String instituteName;
    private String scoreType;
    private BigDecimal score;
    private Integer startYear;
    private Integer endYear;
    private String boardOrUniversity;
    private String specialization;
}