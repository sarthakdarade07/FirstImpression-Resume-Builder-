package com.firstimpression.backend.Services;

import java.security.SecureRandom;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class OtpService { 
	

    private static final SecureRandom random = new SecureRandom();

    public static String generateOtp() {
    	log.info("Inside OtpService-generateOtp():{}");

        return String.valueOf(100000 + random.nextInt(900000));
    }
}