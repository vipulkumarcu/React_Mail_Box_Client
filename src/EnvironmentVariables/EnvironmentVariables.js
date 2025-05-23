const environmentVariables = {
  appwriteEndpointUrl: String ( process.env.REACT_APP_APPWRITE_ENDPOINT_URL ) ,
  appwriteProjectId: String ( process.env.REACT_APP_APPWRITE_PROJECT_ID ),
  appwriteDatabaseId: String ( process.env.REACT_APP_APPWRITE_DATABASE_ID ),
  appwriteUsersCollectionId: String ( process.env.REACT_APP_APPWRITE_USERS_COLLECTION_ID ),
  appwriteEmailsCollectionId: String ( process.env.REACT_APP_APPWRITE_EMAILS_COLLECTION_ID ),
  appwriteStorageId: String ( process.env.REACT_APP_APPWRITE_STORAGE_ID ),
  tinymceApiKey: String ( process.env.REACT_APP_TINYMCE_API_KEY ),
}

export default environmentVariables;