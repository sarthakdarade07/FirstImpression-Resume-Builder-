package com.firstimpression.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SkillResponse {

    private Integer id;
    private String title;
    private String level;
}