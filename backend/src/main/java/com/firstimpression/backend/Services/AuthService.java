package com.firstimpression.backend.Services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.firstimpression.backend.Exception.ResourceExistsException;
import com.firstimpression.backend.Repository.UsersRepository;
import com.firstimpression.backend.dto.AuthResponse;
import com.firstimpression.backend.dto.RegisterRequest;
import com.firstimpression.backend.model.Users;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
 
	@Value("${app.base.url}")
	private String appBaseUrl;
    private final UsersRepository usersRepository;
    private final EmailService emailService;

    public AuthResponse register(RegisterRequest request) {

        log.info("Inside AuthService : register() {}", request);

        if (usersRepository.existsByEmail(request.getEmail())) {
            throw new ResourceExistsException("Email already exists");
            
        }

       Users newUser = toUsers(request);
         
       //save in database
        Users savedUser = usersRepository.save(newUser);
        
        //Send mail for verification
        sendVerificationEmail(newUser);
          
        return toResponse(savedUser);
       
    }
    
    private AuthResponse toResponse(Users savedUser) {
    	 return AuthResponse.builder()
                 .id(savedUser.getId())
                 .name(savedUser.getName())
                 .email(savedUser.getEmail())
                 .profileImageUrl(savedUser.getProfileImageUrl())
                 .subscriptionPlan(savedUser.getSubscriptionPlan())
                 .emailVerified(savedUser.isEmailVerified())
                 .verificationToken(savedUser.getVerificationToken())
                 .verificationExpires(savedUser.getVerificationExpires())
                 .createdAt(savedUser.getCreatedAt())
                 .updatedAt(savedUser.getUpdatedAt())
                 .build();
    }
    
    private Users toUsers(RegisterRequest request) {
    	 Users newUser = Users.builder()
                 .name(request.getName())
                 .email(request.getEmail())
                 .password(request.getPassword())
                 .profileImageUrl(request.getProfileImageUrl())
                 .subscriptionPlan(request.getSubscriptionPlan())
                 .build();
    	 
    	 return newUser;
    }
    
    private void sendVerificationEmail(Users newUser) {
    	try {
    		String link = appBaseUrl+"/api/auth/verify-email?token="+newUser.getVerificationToken();
    		String subject = "Verification mail for firstimpress";
    		String html = """
    			    <div style="font-family: sans-serif; color: #333333; line-height: 1.5; text-align: center;">
    			        
    			        <!-- Add your image here -->
    			        <img src="https://i.postimg.cc/3NL560RX/loginpage.webp" alt="First Impression Logo" style="max-width: 250px; margin-bottom: 20px;">
    			        
    			        <h2>Verify your email</h2>
    			        <p>Hi %s,</p>
    			        <p>Please confirm your email address to activate your account by clicking the button below:</p>
    			        <p>
    			            <a href="%s" style="display: inline-block; padding: 10px 16px; background-color: #6366f1; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: bold; margin: 10px 0;">
    			                Verify Email
    			            </a>
    			        </p>
    			        <p>Or copy and paste this link into your browser:</p>
    			        <p><a href="%s" style="color: #6366f1;">%s</a></p>
    			        <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">This link expires in 24 hours.</p>
    			    </div>
    			    """.formatted(newUser.getName(), link, link, link);
    		
    		emailService.sendHtmlEmail(newUser.getEmail(), subject, html);
    		
    	}catch(Exception e) {
    		
    		throw new RuntimeException("Faild to send verification mail"+e.getMessage());
    	}
    }
}