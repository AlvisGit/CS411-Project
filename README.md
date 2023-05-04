# CS411-Project - Cookible (Cooking Bible)

## Work
- Prototype - All the code
- Docs - User Stories, prototype video, technologies and Final Video

## How To Run
- First clone or donwload the repository
- Fill variables in env template
- Open a terminal and instal dependencies with 'npm install'
- Start backend with 'npm run start:backend'
- Start frontend with 'npm run start:frontend'

##Possible Errors
- Check if database and project are connecting. Can be fixed by replacing database rules with '
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /favorites/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
'
- Favorites collection needed in database
