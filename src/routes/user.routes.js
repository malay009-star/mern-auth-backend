import express from "express";
import { authenticate, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/profile", authenticate, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        role: req.user.role,
        profileImage: req.user.profileImage || null,
        phone: req.user.phone || null,
        bio: req.user.bio || null,
        isVerified: req.user.isVerified,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

router.get("/dashboard", authenticate, authorizeRoles("admin"), (req, res) => {
  res.json({
    message: "Dashboard data",
    userId: req.user._id,
    role: req.user.role,
  });
});

export default router;
