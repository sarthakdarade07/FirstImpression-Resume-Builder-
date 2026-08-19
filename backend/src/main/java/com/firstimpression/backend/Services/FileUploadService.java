package com.firstimpression.backend.Services;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.firstimpression.backend.Repository.UsersRepository;
import com.firstimpression.backend.model.Users;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileUploadService {
	

	private final Cloudinary cloudinary;
	private final UsersRepository usersRepository;
	
	public Map<String, String> uploadImage (MultipartFile file,Users user) throws IOException{
		
		log.info("Inside FileUploadSerive- uplaodImage():{}",file);

		
		Map<String,Object> imageUploadRes = cloudinary.uploader().upload(file.getBytes(),ObjectUtils.asMap(
				"resource_type","image",
				"public_id", "profile_images/" + user.getId(),
		        "overwrite", true
				));
		
		String imageUrl =imageUploadRes.get("secure_url").toString();
		user.setProfileImageUrl(imageUrl);
		usersRepository.save(user);
		return Map.of("image_url",imageUrl);
		
	}
	 
	public void removeImage(Users user) throws IOException{
		log.info("Inside FileUploadSerive- removeImage():{}");
		
		Map res = cloudinary.uploader().destroy("profile_images/"+user.getId(), ObjectUtils.emptyMap());
		
		user.setProfileImageUrl(null);
		usersRepository.save(user);
		
	}
	
}

