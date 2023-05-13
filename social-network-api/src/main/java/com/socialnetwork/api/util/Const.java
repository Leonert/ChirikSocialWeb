package com.socialnetwork.api.util;

public class Const {
  public static class Response {
    public static final String DATE_FORMAT = "yyyy-MM-dd";
    public static final String TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
    public static final int PAGE_NUMBER_DEFAULT = 0;
    public static final int RESULTS_PER_PAGE_DEFAULT = 10; //Users
    public static final Integer POSTS_PER_PAGE_DEFAULT = 3; //posts
  }

  public static class Auth {
    public static final String USERNAME_TAKEN = "User with such username already exists.";
    public static final String EMAIL_TAKEN = "User with such email address already exists.";
    public static final String BEARER = "Bearer ";
    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String NO_SUCH_EMAIL = "User with such email doesnt`t exist.";
    public static final String WRONG_PASSWORD = "You entered an incorrect password. Check the password.";
    public static final String CONFIRMATION_REQUIRED = "The account exists but needs to be activated.";
  }
}
