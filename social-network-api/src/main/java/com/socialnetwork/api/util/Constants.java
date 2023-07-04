package com.socialnetwork.api.util;

public class Constants {
  public static class Response {
    public static final String DATE_FORMAT = "yyyy-MM-dd";
    public static final String TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
    public static final int PAGE_NUMBER_DEFAULT = 0;
    public static final int RESULTS_PER_PAGE_DEFAULT = 10;
    public static final Integer POSTS_PER_PAGE_DEFAULT = 3;
  }

  public static class Cloudinary {
    public static final String CLOUDINARY_SCHEME = "cloudinary://";
    public static final String AVATAR_PRESET = "avatarPicsPreset";
    public static final String BACKGROUND_PRESET = "backgroundPicsPreset";
    public static final String POSTS_PRESET = "postPicsPreset";
    public static final String POSTS_ID = "postPics/";
  }

  public static class Request {
    public static final String QUERY = "q";
    public static final String PAGE_NUMBER_QUERY = "p";
    public static final String RESULTS_PER_PAGE_QUERY = "n";
    public static final String ID_QUERY = "id";
    public static final String TOKEN_PARAMETER = "token";
  }

  public static class Validation {
    public static final int USERNAME_MAX_LENGTH = 35;
    public static final String USERNAME_TOO_BIG = "Username cannot exceed 35 characters.";
    public static final String USERNAME_BLANK = "Username cannot be blank.";
    public static final String USERNAME_NULL = "Username cannot be null.";
    public static final String NAME_NULL = "Name cannot be null.";
    public static final String NAME_BLANK = "Name cannot be blank.";
    public static final String EMAIL_REGEXP = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$";
    public static final String EMAIL_NOT_VALID = "Email is not valid.";
    public static final String EMAIL_NULL = "Email cannot be null.";
    public static final String PASSWORD_NULL = "Password cannot be null.";
    public static final String PASSWORD_TOO_SMALL = "Password cannot be less than 8 characters.";
    public static final int PASSWORD_MIN_LENGTH = 8;
  }

  public static class Auth {
    public static final String OK = "Ok";
    public static final String OAUTH_REDIRECT_URL = "https://chirik.vercel.app/google-authorization";
    public static final String USERNAME_TAKEN = "User with such username already exists.";
    public static final String EMAIL_TAKEN = "User with such email address already exists.";
    public static final String BEARER = "Bearer ";
    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String WRONG_PASSWORD = "You entered an incorrect password. Check the password.";
    public static final String CONFIRMATION_REQUIRED = "The account exists but needs to be activated.";
  }

  public static class WebSocket {
    public static final String TOPIC_POSTS = "/topic/posts";
    public static final String TOPIC_MESSAGES = "/topic/messages";
    public static final String TOPIC_MESSAGE = "/topic/message";
    public static final String QUEUE_NOTIFICATION = "/queue/notification";
  }

  public static class Exception {
    public static final String USER_NOT_FOUND = "User with such credentials was not found.";
    public static final String POST_NOT_FOUND = "Post with such id was not found";
    public static final String ACCESS_DENIED = "Access denied.";
    public static final String MISSING_REQUEST_PARAMETER = " parameter is missing.";
    public static final String MISSING_PATH_VARIABLE = " path variable is missing.";
    public static final String TOKEN_INVALID = "Token is invalid";
    public static final String EMPTY_POST = "Attempt to create an empty post";
  }

  public static class Image {
    public static final String BASE_64_PREFIX = "data:image";
  }
}
