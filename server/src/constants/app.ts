

import dotenv from "dotenv";
dotenv.config();


export const { BASE_API_ENDPOINT, MAIN_APP_URL } = process.env;
export const SSO_CALLBACK_URL = `${MAIN_APP_URL}/sso-callback`
export const SOCIAL_AUTH_GOOGLE_URL = `${BASE_API_ENDPOINT}/auth/google/redirect`;
export const API_OBJECTS = {
  Base: "Base",
  Auth: "Auth",
  Account: "Account",
  OTP: 'OTP',
  Token: 'Token',
  Role: 'Role',
};
export const APP_NAME = "Start"
export const DEFAULT_PAGE_SIZE = 25;
export const VERIFICATION_TOEKN_LENGTH = 6;
export const ACCESS_TOKEN_NAME = "start_token"