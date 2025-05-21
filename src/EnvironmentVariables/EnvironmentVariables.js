const environmentVariables = {
  firebaseUrl: String ( process.env.REACT_APP_FIREBASE_URL.trim () ),
  firebaseApiKey: String ( process.env.REACT_APP_FIREBASE_API_KEY.trim () ),
  firebaseDatabaseUrl: String ( process.env.REACT_APP_FIREBASE_DATABASE_URL.trim () ),
  tinyMceApiKey: String ( process.env.REACT_APP_TINYMCE_API_KEY.trim () ),
}

export default environmentVariables;