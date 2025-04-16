import { getUserDetails } from "@controller/auth/session";
import { uploadAvatar,uploadBlogImage } from "@controller/bucket/createFiles";
import { createBlog } from "@controller/db/createDocuments";
import { getBlogs, getUsers } from "@controller/db/fetchDocuments";
import { 
    clearCustomNotification, 
    clearGeneralNotification, 
    followUser, 
    likeBlog, 
    readCustomNotfication, 
    readGenNotfication, 
    unfollowUser, 
    unlikeBlog, 
    updateBlog, 
    updateProfile 
} from "@controller/db/updateDocuments";
import { queryParser, requestValidator, blogOwnershipValidator } from "@middleware";
import { Router } from "express";
import authenticateUser from "middlewares/authenticateUser";
import multer from "multer";

const router = Router();
const storage = multer.memoryStorage();
const uploadFiles = multer({ storage });

// Users
router.get("/users", queryParser, getUsers);
router.patch("/profile", authenticateUser, requestValidator, updateProfile);
router.put("/profile/avatar", authenticateUser, uploadFiles.single("avatar"), uploadAvatar);
router.patch("/users/followers/:_userId", authenticateUser, followUser);
router.delete("/users/followers/:_userId", authenticateUser, unfollowUser);
router.get("/users/me", authenticateUser, getUserDetails);


// Blogs
router.get("/blogs", queryParser, getBlogs);
router.post("/blogs", authenticateUser, requestValidator, createBlog);
router.patch("/blogs/:_blogId", authenticateUser, requestValidator, blogOwnershipValidator, updateBlog);
router.delete("/blogs/:_blogId", authenticateUser, blogOwnershipValidator, updateBlog);
router.patch("/blogs/likes/:_blogId", authenticateUser, likeBlog);
router.delete("/blogs/likes/:_blogId", authenticateUser, unlikeBlog);
router.put("/blogs/images",authenticateUser,uploadFiles.single("blogImage"), uploadBlogImage)

// Notifications
router.delete("/notifications/general/:_notificationId", authenticateUser, clearGeneralNotification);
router.patch("/notifications/general/:_notificationId", authenticateUser, readGenNotfication);
router.delete("/notifications/custom/:_notificationId", authenticateUser, readCustomNotfication);
router.patch("/notifications/custom/:_notificationId", authenticateUser, clearCustomNotification);

export default router;