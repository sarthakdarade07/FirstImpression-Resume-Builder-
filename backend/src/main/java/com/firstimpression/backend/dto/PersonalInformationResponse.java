package com.firstimpression.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PersonalInformationResponse {

    private String name;
    private String location;
    private String role;
    private String email;
    private String linkedinUrl;
    private String githubUrl;
    private String portfolioUrl;
    private String phoneNo;
    private String photoUrl;
}
