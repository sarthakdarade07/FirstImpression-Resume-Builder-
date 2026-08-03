package com.firstimpression.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LanguageResponse {

    private Integer id;
    private String language;
    private String level;
}