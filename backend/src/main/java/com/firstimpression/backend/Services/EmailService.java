package com.firstimpression.backend.Services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

	@Value("${spring.mail.properties.mail.smtp.from}")
	private String fromEmail;
	
	private final JavaMailSender mailSender;
	
	public void sendHtmlEmail(String to , String subject , String htmlContent) throws MessagingException {
		
		log.info("Inside EmailSevice sendHtmlEmail():{} {} {}",to,subject,htmlContent);
		 MimeMessage mimemessage = mailSender.createMimeMessage();
		 MimeMessageHelper helper = new MimeMessageHelper(mimemessage,true , "UTF-8");
		 
		 helper.setFrom(fromEmail);
		 helper.setTo(to);
		 helper.setSubject(subject);
		 
		 helper.setText(htmlContent,true); //true->we using HTML
		 mailSender.send(mimemessage);
		 
		 
	}
}
