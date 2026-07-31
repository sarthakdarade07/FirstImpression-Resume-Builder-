package com.firstimpression.backend.util;

import java.security.Key;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	@Value("${jwt.secret}")
	private String jwtSecret;
	
	@Value("${jwt.expiration}")
	private long jwtExpiration;
	
	
	public  String generateToken(String userId) {

		Date now = new Date();
		
		Date expiryDate = new Date(now.getTime()+jwtExpiration);
		
		return Jwts.builder()
		        .subject(userId)
		        .issuedAt(now) 
		        .expiration(expiryDate)
		        .signWith(getSigningKey())
		        .compact();
		 
       }
	
	public String getUserIdFromToken(String token) {
		Claims claims = Jwts.parser()
		        .verifyWith((SecretKey) getSigningKey())
		        .build()
		        .parseSignedClaims(token)
		        .getPayload();	
		
		return claims.getSubject();
		
	}
	
	public boolean validateToken(String token) {
		try {
			Jwts.parser()
	        .verifyWith((SecretKey) getSigningKey())
	        .build()
	        .parseSignedClaims(token);
			
			return true;
			
			
		}catch(JwtException | IllegalArgumentException e) {
			return false;
		}
	}
	 
	
	public boolean isTokenExpired(String token) {
		try {
			
			Claims claims = Jwts.parser()
			        .verifyWith((SecretKey) getSigningKey())
			        .build()
			        .parseSignedClaims(token)
			        .getPayload();	
			  
			
			
			return claims.getExpiration().before(new Date());
			
		}catch(JwtException | IllegalArgumentException e) {
			return false;
		}
	}
	private Key getSigningKey() {
		
		return Keys.hmacShaKeyFor(jwtSecret.getBytes());
	}
}
