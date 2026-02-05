# 🔥 Firebase Setup Guide for BhoolGaya?

To connect your application to the database and authentication system, you need to provide your Firebase credentials. Please follow these steps:

## 1. Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **"Add project"**.
3. Name your project **"BhoolGaya"**.
4. Disable Google Analytics for now (optional, simpler for setup).
5. Click **"Create project"**.

## 2. Register the Web App
1. Inside your new project, looking for the text "Get started by adding Firebase to your app".
2. Click the **Web icon** (`</>`).
3. App nickname: **"BhoolGaya Web"**.
4. Click **"Register app"**.
5. **Do not run npm install**, just copy the `firebaseConfig` object values. It looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "bhoolgaya-xyz.firebaseapp.com",
  projectId: "bhoolgaya-xyz",
  storageBucket: "bhoolgaya-xyz.appspot.com",
  messagingSenderId: "123456...",
  appId: "1:12345:web:..."
};
```

## 3. Enable Authentication
1. Go to **Build** > **Authentication** in the left sidebar.
2. Click **"Get started"**.
3. Select **"Email/Password"** sign-in provider and **Enable** it. Click **Save**.
4. Click **"Add new provider"**, select **"Google"**, and **Enable** it.
   - Project support email: Select your email.
   - Click **Save**.

## 4. Enable Firestore Database
1. Go to **Build** > **Firestore Database**.
2. Click **"Create database"**.
3. Choose a location (e.g., `asia-south1` for India or `us-central1`).
4. **IMPORTANT:** Choose **"Start in test mode"** for now (we will secure it later).
5. Click **"Create"**.

## 5. Provide Credentials
Please paste your configuration values in the chat so I can configure the `web/.env.local` file for you:

- **API Key**
- **Auth Domain**
- **Project ID**
- **Storage Bucket**
- **Messaging Sender ID**
- **App ID**

---

*Once you provide these, I will connect the app to your live database!*
