import { Router } from "express";
import { UserModel } from "../models/userModel";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authMiddleware } from "./authMiddleware";

dotenv.config();

export const userRouter: Router = Router();
const userModel = new UserModel();

const JWT_SECRET = process.env.JWT_SECRET!;

// Signup route
userRouter.post("/signup", async (req, res) => {
  console.log("POST: /api/v1/users/signup");
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "provide credentials",
      });
    }

    const existing = await userModel.findUser(email, password);
    if (existing) {
      return res.json({
        success: false,
        message: "user exists",
      });
    }

    const savedUser = await userModel.createUser(email, password);

    if (savedUser) {
      const token = jwt.sign({ userId: savedUser._id.toString() }, JWT_SECRET);

      return res.json({
        success: true,
        message: "signup successful",
        token,
      });
    }

    return res.json({
      success: false,
      message: "signup failed",
    });
  } catch (error) {
    console.log("signup error ", error);
    return res.json({
      success: false,
      message: "error in signup",
    });
  }
});

// Signin route
userRouter.post("/signin", async (req, res) => {
  console.log("POST /api/v1/users/signin");
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "provide credentials",
      });
    }

    const user = await userModel.findUser(email, password);
    if (user) {
      // TODO: validate password properly with bcrypt
      const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET);

      return res.json({
        success: true,
        message: "signin successful",
        token,
      });
    }
    return res.json({
      success: false,
      message: "signin failed",
    });
  } catch (error) {
    console.log("signin error : ", error);
    return res.json({
      success: false,
      message: "error in signin",
    });
  }
});

// Verify route
userRouter.get("/verify", authMiddleware, async (req, res) => {
  console.log("GET /api/v1/users/verify");
  try {
    const userId = req.userId;

    if (!userId) {
      return res.json({
        success: false,
        message: "no userId found in token",
      });
    }

    const user = await userModel.findByID(userId);

    if (user) {
      return res.json({
        success: true,
        message: "user verified",
        data: user.email,
      });
    }

    return res.json({
      success: false,
      message: "user not found",
    });
  } catch (error) {
    console.log("verify error ", error);
    return res.json({
      success: false,
      message: "error in verify",
    });
  }
});
