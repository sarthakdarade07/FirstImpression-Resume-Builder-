package com.firstimpression.backend.dto;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CertificationResponse {

    private Integer id;
    private String title;
    private String issuedBy;
    private LocalDate issueDate;
    private LocalDate expiryDate;
    private String url;
}