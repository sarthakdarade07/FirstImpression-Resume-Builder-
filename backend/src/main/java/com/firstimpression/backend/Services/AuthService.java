package com.firstimpression.backend.Services;

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
 
    private final UsersRepository usersRepository;

    public AuthResponse register(RegisterRequest request) {

        log.info("Inside AuthService : register() {}", request);

        if (usersRepository.existsByEmail(request.getEmail())) {
            throw new ResourceExistsException("Email already exists");
            
        }

       Users newUser = toUsers(request);

        Users savedUser = usersRepository.save(newUser);
          
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
}