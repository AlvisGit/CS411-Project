# CS411-Project - Cookible (Cooking Bible)

## Technologies
- React (Frontend), Node.js (Backend) and Firebase (Authentication and Database)
- Apis : Spoonacular and Youtube

## Work
- Prototype - All the code
- Docs - User Stories, prototype video, technologies and Final Video

## How To Run
- First clone or donwload the repository
- Fill variables in env template
- Open a terminal and instal dependencies with 'npm install'
- Start backend with 'npm run start:backend'
- Start frontend with 'npm run start:frontend'

## Possible Errors
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

## Demonstration
https://www.youtube.com/watch?v=TOxwlQwjPxg

## Login Page

![Screen Shot 2023-05-05 at 11 45 47 PM](https://user-images.githubusercontent.com/43320407/236598023-f0b92000-fc6b-4404-ad0f-9fcc94c24f10.png)


## Home Page

![Screen Shot 2023-05-05 at 11 38 43 PM](https://user-images.githubusercontent.com/43320407/236598065-6dad0058-2804-4abe-b42f-82a989e8bc92.png)


## Search Results Page

![Screen Shot 2023-05-05 at 11 39 02 PM](https://user-images.githubusercontent.com/43320407/236598118-9011ffff-be00-48aa-b2ba-e524ac141b55.png)

## Recipe Page

![Screen Shot 2023-05-05 at 11 42 41 PM](https://user-images.githubusercontent.com/43320407/236598148-cb577083-a41a-4b18-a044-049df11faa74.png)

## Favorites Page

![Screen Shot 2023-05-05 at 11 42 33 PM](https://user-images.githubusercontent.com/43320407/236598205-69d7d6d6-5453-49f0-9d0a-f211982aea36.png)

