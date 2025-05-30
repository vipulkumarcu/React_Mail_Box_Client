/* ─── ERROR MESSAGES ───────────────────────────── */
export const errorMessages = {
  /* ── AUTH / ACCOUNT (AppwriteException.type) ─────────────────── */
  USER_EMAIL_ALREADY_EXISTS:     "This email is already registered.",
  USER_PASSWORD_INVALID:         "Incorrect password.",
  USER_INVALID_CREDENTIALS:      "Incorrect email or password.",
  USER_NOT_FOUND:                "No user found with this email address.",
  USER_DISABLED:                 "This account has been disabled.",
  GET_USER_FALLBACK:             "Unable to fetch user data at the moment. Please try again.",
  USER_EMAIL_NOT_VERIFIED:       "Please verify your email before logging in.",
  USER_SESSION_ALREADY_EXISTS:   "You are already logged in.",
  USER_SESSION_NOT_FOUND:        "Session not found. Please log in again.",
  UPDATE_SESSION_FALLBACK:       "Failed to update session. Please log in again.",
  JWT_INVALID:                   "Session expired. Please log in again.",
  JWT_EXPIRED:                   "Session expired. Please log in again.",
  GENERAL_RATE_LIMIT_EXCEEDED:   "Too many attempts. Please try again later.",
  GENERAL_UNAUTHORIZED:          "You must be logged in to access this resource.",
  GENERAL_FORBIDDEN:             "You do not have permission to perform this action.",
  GENERAL_NOT_FOUND:             "Requested resource was not found.",
  GENERAL_SERVER_ERROR:          "Server error. Please try again later.",

  /* ── DATABASE (Databases API) ────────────────────────────────── */
  DATABASE_WRITE_DENIED:         "Permission denied. Please check your database rules.",
  DATABASE_READ_DENIED:          "Permission denied. Please check your database rules.",
  DATABASE_COLLECTION_NOT_FOUND: "Requested collection was not found.",
  DATABASE_DOCUMENT_NOT_FOUND:   "Document not found.",
  DATABASE_INVALID_QUERY:        "Invalid database query parameters.",

  /* ── STORAGE (Buckets / Files) ───────────────────────────────── */
  STORAGE_BUCKET_NOT_FOUND:      "Storage bucket not found.",
  STORAGE_FILE_NOT_FOUND:        "File not found.",
  STORAGE_INVALID_FILE_TYPE:     "Invalid file type.",
  STORAGE_INVALID_FILE_SIZE:     "File is too large.",
  STORAGE_QUOTA_EXCEEDED:        "Storage quota exceeded.",
  FILE_UPLOAD_FAILED:            "Failed to upload file.",
  FILE_DELETION_FAILED:          "Failed to delete file.",
  FILE_META_FAILED:              "Failed to fetch file metadata.",
  FILE_INFO_FAILED:              "Failed to fetch file info.",
  EMPTY_FILES:                   "No files selected.",

  /* ── FORM-LEVEL & APP-LEVEL (manual) ─────────────────────────── */
  INVALID_EMAIL:                 "Invalid email address.",
  MISSING_EMAIL:                 "Email is required.",
  MISSING_PASSWORD:              "Password field is required.",
  WEAK_PASSWORD:                 "Password must be at least 6 characters.",
  EMPTY_FIELDS:                  "Please complete all fields before submitting.",
  PASSWORDS_DO_NOT_MATCH:        "Password and Confirm Password do not match.",
  SIGNUP_FALLBACK:               "Signup failed. Please check your credentials and try again.",
  LOGIN_FALLBACK:                "Login failed. Please check your credentials and try again.",
  EMPTY_RECIPIENTS:               "Please enter recipient's details",
  EMPTY_SUBJECT:                 "Please enter a subject.",
  EMPTY_MESSAGE:                 "Please enter your message.",

  /* ── EMAIL OPERATIONS (manual) ───────────────────────────────── */
  MAIL_SEND_FAILED:              "Failed to send mail.",
  MAIL_NOT_FOUND:                "Mail not found.",
  MAIL_TRASH_FAILED:             "Failed to move mail to trash.",
  MAIL_RESTORE_FAILED:           "Failed to restore mail.",
  MAIL_UPDATE_FAILED:            "Failed to update mail.",
  MAIL_DELETION_FAILED:          "Failed to delete mail.",
  GET_INBOX_FAILED:              "Failed to fetch inbox.",
  GET_SENT_FAILED:               "Failed to fetch sent emails.",
  GET_TRASH_FAILED:              "Failed to fetch trash emails.",

  /* ── FALLBACK ───────────────────────────────────────────────── */
  DEFAULT:                       "An unexpected error occurred. Please try again.",
};


/* ─── SUCCESS MESSAGES ──────────────── */
export const successMessages = {
  /* AUTH */
  SIGNUP_SUCCESS:      "Account created successfully!",
  LOGIN_SUCCESS:       "Logged in successfully!",
  LOGOUT_SUCCESS:      "Logged out successfully!",
  GET_USER_SUCCESS:    "User data fetched successfully.",
  PROFILE_UPDATED:     "Profile updated successfully.",
  TOKEN_REFRESHED:     "Session refreshed.",

  /* DATABASE / EMAIL */
  USER_CREATED:        "User data initialized successfully.",
  USER_DATA_RETRIEVED: "User data fetched successfully.",
  EMAIL_SENT:          "Email sent successfully.",
  EMAIL_DELETED:       "Email deleted successfully.",
  EMAIL_MOVED_TO_TRASH:"Email moved to trash.",
  EMAIL_UPDATED:       "Email updated successfully.",
  EMAIL_RESTORED:      "Email restored successfully.",
  GET_INBOX_SUCCESS:   "Inbox fetched successfully.",
  GET_SENT_SUCCESS:    "Sent emails fetched successfully.",
  GET_TRASH_SUCCESS:   "Trash emails fetched successfully.",

  /* STORAGE */
  FILE_UPLOADED:       "File uploaded successfully.",
  FILE_DELETED:        "File deleted successfully.",
  FILE_META_FETCHED:   "File metadata fetched successfully.",

  /* FALLBACK */
  DEFAULT:             "Operation completed successfully.",
};