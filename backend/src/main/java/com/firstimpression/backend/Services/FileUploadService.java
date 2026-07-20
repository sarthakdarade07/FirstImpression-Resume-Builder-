package com.firstimpression.backend.Services;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileUploadService {
	

	private final Cloudinary cloudinary;
	
	public Map<String, String> uploadImage (MultipartFile file) throws IOException{
		
		log.info("Inside FileUploadSerive- uplaodImage():{}",file);

		
		Map<String,Object> imageUploadRes = cloudinary.uploader().upload(file.getBytes(),ObjectUtils.asMap("resource_type","image"));
		
		return Map.of("image_url",imageUploadRes.get("secure_url").toString());
	}
	
}
