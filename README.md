<img src="Frontend/public/logo/logoColor.png" alt="Logo" width="200" height="200">

**Filog** is a dynamic blogging platform, thoughtfully designed to provide a streamlined, secure, and immersive experience for bloggers and readers. Developed with **ReactJS** on the frontend and **Appwrite** as a backend-as-a-service (BaaS), Filog enables users to create, share, and interact with blog content through an intuitive and visually pleasing interface. Filog emphasizes robust security, user-controlled access, and a scalable structure suitable for both single users and extensive communities.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
  - [Appwrite Cloud Functions](#appwrite-cloud-functions)
  - [Vercel Functions](#vercel-functions)
  - [Staged Actions and the Action Class](#staged-actions-and-the-action-class)
  - [When to Use Appwrite Cloud Functions vs. Vercel Functions](#when-to-use-appwrite-cloud-functions-vs-vercel-functions)
- [Challenges and Solutions](#challenges-and-solutions)

## Features

- **User Authentication and Profile Management:** Secure account creation, login, logout, and profile customization. Filog uses Appwrite’s secure authentication with Google OAuth and custom methods, ensuring each user can authenticate safely.

- **Blog Creation and Management:** Users can create, edit, and delete blog posts with options to add text, images, and other media.

- **Interactions and Engagement:** Users can like and comment on posts, follow other profiles, and view posts from followed users. Every interaction is tracked in Appwrite, and blog-specific metrics (likes, comments) are stored within the user’s profile document.

- **Customizable Modals for UX Enhancements:** Reusable modals enable notifications, forms, and alerts, adding to a streamlined user experience.

- **GSAP Animations:** The interface includes smooth animations for an engaging visual experience, crafted to work well across various devices without relying on heavy 3D libraries like Three.js.

- **Secure Backend Processing:** Filog employs controlled backend operations that allow only authorized tasks to be performed, reducing the risk of unauthorized access.

- **Avatar Management:** Using the updated DiceBear API, each user receives a unique avatar, enhancing visual identity on the platform.

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/dev-raghvendramisra/filog.git
   cd filog
   ```


Install Dependencies:
```bash
npm install
```

Environment Setup: Configure your .env file with the necessary Appwrite credentials:

```bash
REACT_APP_APPWRITE_URL=your_appwrite_url
REACT_APP_PROJECT_ID=your_project_id
REACT_APP_DATABASE_ID=your_database_id
REACT_APP_COLLECTION_ID=your_collection_id
REACT_APP_BUCKET_ID=your_bucket_id
```

Start the Development Server:

```bash
npm run dev
```

# Filog Project Structure and Key Functions

## Project Structure

Filog’s project structure is organized into cohesive modules:

- **Redux Slices**: Includes `auth`, `alert`, `blog`, `form`, `draft`, `userPosts`, and `search` slices for state management.
- **Configuration Directory**: The `conf` directory holds configuration settings, managed through the `conf.js` file.
- **Services**: Organized into classes and modularized for reusability, such as authentication and interaction services.

## Documentation

### Appwrite Cloud Functions

Filog’s backend operations are secured and processed through **Appwrite Cloud Functions**, which handle sensitive tasks that should remain protected from direct user access.

#### Key Functions

- **Profile Management and User Interactions**: Manages profile changes like follow/unfollow and liking posts. Uses the `stagedAction` attribute in user profiles to safely authorize actions.
    - *Example*: When a user likes a post, the `stagedAction` attribute updates to a JSON command, which triggers the cloud function to register the like securely.
  
- **Bucket Cleanup**: Regularly clears unused images from Appwrite storage.
    - *Implementation*: Scheduled as a cloud function to optimize Filog’s storage.

### Vercel Functions

Vercel Functions are used for lightweight, stateless operations that do not require direct Appwrite database access. These functions are ideal for tasks running alongside the frontend or handling non-secure data.

#### Key Functions

- **Image Processing**: Resizes and optimizes images for the platform. 
    - *Implementation*: This function resizes images and returns a URL to the optimized version, ideal for public image loading.

- **Notification Emails**: Sends user-triggered notifications via email.
    - *Implementation*: Processes requests and sends confirmation or update emails.

### Staged Actions and the Action Class

Filog’s `stagedAction` attribute in the `userProfile` collection manages user requests without granting them direct access to modify data. The `stagedAction` acts as a controlled intermediary, storing JSON commands generated by the **Action class**.

#### Purpose

Only Appwrite Cloud Functions can read and act upon `stagedAction` updates. This approach keeps sensitive operations (e.g., modifying user documents or accessing collections) secure.

#### How It Works

The **Action class** generates JSON strings that represent actions like like/unlike, follow/unfollow, and comment updates. Filog cloud functions then parse the JSON, validate it, and perform the action.

#### Supported Actions in Action Class:
- Bucket Cleanup
- Follow/Unfollow
- Like/Unlike
- Comment


### When to Use Appwrite Cloud Functions vs. Vercel Functions

- **Appwrite Cloud Functions**: Essential for secure backend operations. Used when tasks require Appwrite document manipulation, database triggers, or sensitive user data.
    - *Example Use Cases*: Profile updates, interacting with secure documents, managing sensitive profile data.
  
- **Vercel Functions**: Suited for lightweight, on-demand tasks that can be performed without database access.
    - *Example Use Cases*: Optimizing images for public display, sending notifications, or handling third-party API calls.

## Challenges and Solutions

### 1. Issue: Managing User Access and Action Authorization
- **Problem**: Giving users direct access to document updates could lead to unauthorized modifications or expose sensitive data.
- **Solution**: Introduced the `stagedAction` attribute in the `userProfile` collection. Instead of allowing users direct access, `stagedAction` acts as a control mechanism. Users trigger actions by updating `stagedAction` with a JSON command, and Appwrite Cloud Functions process this update to securely execute the requested action.
    - *Example*: When a user follows someone, `stagedAction` is updated with a JSON command generated by the Action class, which Appwrite reads and processes to ensure only valid actions are performed.

### 2. Issue: Securing Follow/Unfollow, Like/Unlike Actions
- **Problem**: Actions like follow/unfollow and like/unlike require secure handling to prevent unauthorized actions.
- **Solution**: Used the `Action class` to generate JSON commands that represent specific actions (like/unlike, follow/unfollow). These JSON commands are then processed by Appwrite Cloud Functions that validate and execute the commands securely, ensuring data integrity and secure handling.

### 3. Issue: Reducing Loading Time by Managing Avatar Creation
- **Problem**: Generating unique avatars for users initially slowed down profile creation.
- **Solution**: Integrated **DiceBear API** directly into the profile setup, generating avatars asynchronously based on user ID. This minimized delay in the setup process and ensured every user had a unique avatar without requiring extensive processing time.

### 4. Issue: Managing Conflicting Updates
- **Problem**: Let's assume User A wants to follow User B, while at nearly the same time, User C also follows User B. This situation could lead to conflicting updates in the followers attribute of User B’s profile document if not managed carefully.
  
- **VCS Workflow for Follow Actions**:
    - **Initial Document State**: User B’s profile document contains an attribute `followers`, which is an array storing the user IDs of followers.
        - Before any actions, followers = [].
    - **User A Requests to Follow User B**: 
        - The `stagedAction` attribute in User A's profile is updated to request a follow action for User B. This request is processed by an Appwrite Cloud Function.
        - The cloud function reads User B's current `followers` attribute and appends User A's ID to it.
        - VCS captures this as Version 1 of User B's profile document, with followers = [User A].
    - **User C Requests to Follow User B Shortly After**:
        - Independently, User C also updates their `stagedAction` attribute to follow User B.
        - Another Cloud Function invocation processes this action and reads the latest version of User B's followers attribute (with followers = [User A]) and appends User C’s ID.
        - VCS creates Version 2 of User B’s profile document with followers = [User A, User C].
    
- **Benefits of VCS in This Workflow**:
    - If, due to a race condition or connectivity issue, User A’s follow action doesn’t persist correctly, we can retrieve Version 1 from the VCS to reapply User A's follow.
    - Conversely, if User C's action overwrites User A's follow inadvertently, VCS can be used to check historical versions and ensure both actions are represented in the final state.

- **Rollback and Conflict Resolution**:
    - If any issue arises (e.g., missing or duplicated entries), administrators or automated Cloud Functions can revert to the previous version, where User A was the only follower (Version 1) or where both User A and User C were followers (Version 2).
    - This enables conflict resolution by applying a consistent approach: restoring an accurate historical state and reprocessing actions as necessary.

### Why This is Useful

The VCS setup prevents data conflicts and inconsistency in high-traffic or concurrent operations, especially for actions like follow/unfollow, where real-time changes are common. It allows Filog to manage document states carefully, giving users a seamless experience even when multiple changes occur quickly.

With VCS, Filog ensures document integrity by:
- Maintaining historical states for tracking and recovery.
- Enabling easy rollback in case of conflicts or errors.
- Providing an audit trail of changes to support transparency and debugging.

This structured approach is particularly valuable in social applications like Filog, where users’ interactions with each other’s profiles need precise and reliable handling.
