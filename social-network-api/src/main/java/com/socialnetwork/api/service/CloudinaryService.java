package com.socialnetwork.api.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import java.io.IOException;

import static com.socialnetwork.api.util.Constants.Cloudinary.CLOUDINARY_SCHEME;
import static com.socialnetwork.api.util.Constants.Cloudinary.AVATAR_PRESET;
import static com.socialnetwork.api.util.Constants.Cloudinary.BACKGROUND_PRESET;
import static com.socialnetwork.api.util.Constants.Cloudinary.POSTS_PRESET;
import static com.socialnetwork.api.util.Constants.Cloudinary.POSTS_ID;

@Service
@PropertySource("classpath:application.properties")
public class CloudinaryService {

  private final Cloudinary cloudinary;

  public CloudinaryService(
          @Value("${cloudinary.api-key}") String apiKey,
          @Value("${cloudinary.api-secret}") String apiSecret,
          @Value("${cloudinary.cloud-name}") String cloudName) {
    this.cloudinary = new Cloudinary(CLOUDINARY_SCHEME + apiKey + ":" + apiSecret + "@" + cloudName);
  }

  public String uploadProfilePic(String base64Img, String publicId) {
    return upload(base64Img, AVATAR_PRESET, publicId);
  }

  public String uploadBackgroundPic(String base64Img, String publicId) {
    return upload(base64Img, BACKGROUND_PRESET, publicId);
  }

  public String uploadPostPic(String base64Img, String publicId) {
    return upload(base64Img, POSTS_PRESET, publicId);
  }

  public void deletePostPic(String id) {
    try {
      cloudinary.uploader().destroy(POSTS_ID + id, ObjectUtils.emptyMap());
    } catch (IOException ex) {
      System.out.println(ex.getMessage());
    }
  }

  private String upload(String base64Img, String uploadPreset, String publicId) {
    try {
      return cloudinary.uploader().upload(
              base64Img,
              ObjectUtils.asMap(
                      "public_id", publicId,
                      "upload_preset", uploadPreset,
                      "overwrite", true,
                      "invalidate", true)
      ).get("secure_url").toString();
    } catch (IOException ex) {
      System.out.println(ex.getMessage());
    }
    return null;
  }
}