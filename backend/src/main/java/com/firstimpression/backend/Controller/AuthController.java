package com.firstimpression.backend.Controller;

import java.io.IOException;
import java.util.Map;
import java.util.Objects;
import java.net.URI;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.firstimpression.backend.Services.AuthService;
import com.firstimpression.backend.Services.FileUploadService;
import com.firstimpression.backend.dto.AuthResponse;
import com.firstimpression.backend.dto.LoginRequest;
import com.firstimpression.backend.dto.OtpVerificationResponse;
import com.firstimpression.backend.dto.ProfileResponse;
import com.firstimpression.backend.dto.RegisterRequest;
import com.firstimpression.backend.model.Users;
import com.firstimpression.backend.util.AppConstants;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor; 
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j 
@RequiredArgsConstructor
@RequestMapping(AppConstants.AUTH_CONTROLLER)


public class AuthController {
	
	private final AuthService authService;
	private final FileUploadService fileUploadService;

	
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
		  
		 return ResponseEntity.status(HttpStatus.FOUND)
                 .location(URI.create("http://localhost:3000/?verified=true"))
                 .build();
	}
	
	@PostMapping(AppConstants.UPLOAD_IMAGE)
	public ResponseEntity<?> uploadImage(@Valid @RequestPart("image")MultipartFile file) throws IOException{
		log.info("Inside AuthController- uplaodImage():{}",file);

		Map<String,String> response =fileUploadService.uploadImage(file);
		
		return ResponseEntity.ok(response);
		
	}
	
	@PostMapping(AppConstants.LOGIN)
	public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req){
		
		AuthResponse response =authService.login(req);
		
		return ResponseEntity.ok(Map.of("message","Login Successfull!","response",response));
		
		
	}  
 
	
	@GetMapping(AppConstants.VALIDATE_TKN)
	public String testValidationToken() {
		return "Token is Working";
	}
	
	
	@PostMapping(AppConstants.RESEND_VERIFICATION)
	
	public ResponseEntity<?> resendVerification(@Valid @RequestBody Map<String,String> body){
		
		log.info("Inside AuthController - resendVerification():{} ",body);

		//1.get email
		String email = body.get("email");
		
         
		//2.Verify if email is there
		if(Objects.isNull(email)) {
			return ResponseEntity.badRequest().body(Map.of("Message","Email is required"));
		}
		
		authService.resendVerification(email);
		
		return ResponseEntity.ok().body(Map.of("message","Verification link sent on registered email."));
		
	}
	
	@GetMapping(AppConstants.GET_ACCOUNT_DETAILS)
	public ResponseEntity<?> getAccountDetails(Authentication authentication) {

	    Users user = (Users) authentication.getPrincipal();

	    return ResponseEntity.ok(authService.getAccountDetails(user));
	}
	
	@GetMapping(AppConstants.GET_PROFILE)
	public ResponseEntity<?> getProfile(Authentication authentication){
		log.info("Inside AuthController - getProfile():{}",authentication);
		//1.get user
		Object principalObject =  authentication.getPrincipal();
		
		//2. Call the service Method
		ProfileResponse currentProfile = authService.getProfile(principalObject);
		
		//3. return response
		return ResponseEntity.ok().body(Map.of("message",currentProfile));
	}
	 

	@PostMapping(AppConstants.FORGOT_PASSWORD)
	public ResponseEntity<?> forgotPassword(@RequestBody Map<String,String> req) throws IOException, MessagingException{
		log.info("Inside AuthController - resetPassword():{}",req);
		
		String email = req.get("email");
		if(Objects.nonNull(email)) {
			authService.forgotPassword(email);
		}else {
			throw new RuntimeException("Email Required.");
		}
		return ResponseEntity.ok().body(Map.of("message","Otp sent on registered Email."));

	}
	
	@PostMapping(AppConstants.VERIFY_OTP)
	public ResponseEntity<?> verifyOtp(@RequestBody Map<String,String> req){
		log.info("Inside AuthController - verifyOtp():{}",req);
		
		OtpVerificationResponse res =	authService.verifyOtp(req.get("email"),req.get("otp"));
		return ResponseEntity.ok().body(Map.of("message","Otp is Verified","response",res));

	}
	
	@PostMapping(AppConstants.RESET_PASSWORD)
	public ResponseEntity<?> resetPassword(@RequestBody Map<String,String> req){
		log.info("Inside AuthController - resetPassword():{}",req);
           
		authService.resetPassword(req.get("resetToken"), req.get("newPassword"));
		return ResponseEntity.ok().body(Map.of("message","Password Changed."));
		
	}

}
