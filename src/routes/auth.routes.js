import express from "express";
import {
    loginUser,
    refreshAccessToken,
    registerUser,
    logoutUser
} from "../controllers/auth.controller.js";
import { authenticate, authorizeRoles } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logoutUser);
router.get("/profile", authenticate, (req, res) => {
    res.json({
        message: "Profile data",
        userId: req.user._id,
        role: req.user.role
    });
});
router.get(
    "/dashboard",
    authenticate,
    authorizeRoles("admin", "manager"),
    (req, res) => {
        res.json({
            message: "Dashboard data",
            userId: req.user._id,
            username: req.user.username,
            email: req.user.email,
            role: req.user.role
        });
    }
);


export default router;
