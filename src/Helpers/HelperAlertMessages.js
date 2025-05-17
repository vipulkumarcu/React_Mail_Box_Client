export const errorMessages = {

  /* ─── AUTHENTICATION ERRORS ───────────────────── */
  EMAIL_EXISTS:                "This email is already registered.",
  OPERATION_NOT_ALLOWED:       "Password sign-in is disabled.",
  TOO_MANY_ATTEMPTS_TRY_LATER: "Too many attempts. Please try again later.",
  EMAIL_NOT_FOUND:             "No user found with this email address.",
  INVALID_PASSWORD:            "Incorrect password.",
  USER_DISABLED:               "This account has been disabled.",
  INVALID_EMAIL:               "Invalid email address.",
  MISSING_PASSWORD:            "Password field is required.",
  WEAK_PASSWORD:               "Password must be at least 6 characters.",
  INVALID_ID_TOKEN:            "Session expired. Please log in again.",
  USER_NOT_FOUND:              "User no longer exists.",
  TOKEN_EXPIRED:               "Session expired. Please log in again.",
  CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "Please re-authenticate to proceed.",
  INVALID_REFRESH_TOKEN:       "Session refresh failed. Please log in again.",
  INVALID_GRANT_TYPE:          "Invalid grant type.",
  MISSING_EMAIL:               "Email is required.",
  UNAUTHORIZED_DOMAIN:         "Unauthorized domain. Please check Firebase settings.",

  /* ─── DATABASE ERRORS ───────────────── */
  PERMISSION_DENIED:           "Permission denied. Please check your database rules.",
  AUTHENTICATION_REQUIRED:     "You must be logged in to access this data.",
  INVALID_AUTH:                "Invalid authentication credentials.",
  INVALID_PATH:                "Invalid database path.",
  INVALID_DATA:                "The data provided is invalid.",
  QUOTA_EXCEEDED:              "Too many requests. Please try again later.",
  NETWORK_ERROR:               "Network error. Please check your internet connection.",
  DISCONNECTED:                "Lost connection. Retrying...",
  WRITE_CANCELED:              "Write operation was canceled.",
  UNAVAILABLE:                 "Firebase service is currently unavailable. Try again soon.",
  USER_CREATION_FAILED:        "Failed to create user.",
  USER_PROFILE_UPDATE:         "User created, but failed to update profile",
  USER_DATA_FETCH_FAILED:      "Failed to fetch user data.",

  /* ─── FORM ERRORS ───────────────── */
  EMPTY_FIELDS:                "Please complete all fields before submitting.",
  PASSWORDS_DO_NOT_MATCH:      "Password and Confirm Password do not match.",
  SIGNUP_FALLBACK:             "Signup failed. Please check your credentials and try again.",
  LOGIN_FALLBACK:              "Login failed. Please check your credentials and try again.",
  EMPTY_RECIPIENT:             "Please enter a recipient.",
  EMPTY_SUBJECT:               "Please enter a subject.",
  EMPTY_MESSAGE:               "Please enter your message.",

  /* ─── EMAIL ERRORS ───────────────── */
  MAIL_SEND_FAILED:            "Failed to send mail.",
  MAIL_NOT_FOUND:              "Mail not found.",
  MAIL_TRASH_FAILED:           "Failed to move mail to trash.",
  MAIL_DELETION_FAILED:        "Failed to delete mail.",

  /* ─── DEFAULT ERROR ───────────────── */
  DEFAULT:                    "An unexpected error occurred. Please try again.",
};

export const successMessages = {

  /* ─── AUTHENTICATION SUCCESS ───────────────── */
  SIGNUP_SUCCESS:              "Account created successfully!",
  LOGIN_SUCCESS:               "Logged in successfully!",
  PROFILE_UPDATED:             "Profile updated successfully.",
  TOKEN_REFRESHED:             "Session refreshed.",

  /* ─── DATABASE SUCCESS ───────────────── */
  USER_CREATED:                "User data initialized successfully.",
  USER_DATA_RETRIEVED:         "User data fetched successfully.",
  EMAIL_SENT:                  "Email sent successfully.",
  EMAIL_DELETED:               "Email deleted successfully.",
  EMAIL_MOVED_TO_TRASH:        "Email moved to trash.",

  /* ─── DEFAULT ERROR ───────────────── */
  DEFAULT:                    "An unexpected error occurred. Please try again.",
};