package com.firstimpression.backend.Controller;

import java.util.Map;

import javax.management.RuntimeErrorException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.firstimpression.backend.Services.AuthService;
import com.firstimpression.backend.dto.AuthResponse;
import com.firstimpression.backend.dto.RegisterRequest;
import com.firstimpression.backend.util.AppConstants;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j 
@RequiredArgsConstructor
@RequestMapping(AppConstants.AUTH_CONTROLLER)

@CrossOrigin(origins = "http://localhost:3000/")
public class AuthController {
	
	private final AuthService authService;
	
	@PostMapping(AppConstants.REGISTER)
	public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req){
		
		log.info("Inside AuthController- register():{}",req);

	 
			AuthResponse response = authService.register(req);
			log.info("Response from servie{}",response);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		
	}
	
	@GetMapping(AppConstants.VERIFY_EMAIL)
	public ResponseEntity<?> verifyEmail(@Valid @RequestParam String token){
		log.info("Inside AuthController- verifyEmail():{}",token);

		 authService.verifyEmail(token);
		  return ResponseEntity.status(HttpStatus.OK).body(Map.of("message","Email Verified Successfully")); 
	}
	

}
