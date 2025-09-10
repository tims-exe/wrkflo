import { Router } from "express";
import { UserController } from "../contollers/userController";
import jwt from 'jsonwebtoken'

export const userRouter: Router = Router()
const userController = new UserController()

userRouter.post('/signup', async (req, res) => {
    console.log('POST: /api/v1/users/signup')
    try {   
        const { email, password } = req.body

        if (!email || !password) {
            return res.json({
                success: false,
                message: "provide credentials"
            })
        }

        const existing = await userController.findUser(email)
        if (existing) {
            return res.json({
                success: false,
                message: "user exists"
            })
        }

        const savedUser = await userController.createUser(email, password)

        if (savedUser) {
            return res.json({
                success: true,
                message: "signup successful"
            })
        }

        return res.json({
            success: false,
            message: "signup failed"
        })
    } catch (error) {
        console.log('signup error ' ,error)
        return res.json({
            success: false,
            message: "error in signup"
        })
    }
})

userRouter.post('/signin', async (req, res) => {
    console.log("POST /api/v1/users/signin")
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.json({
                success: false,
                message: "provide credentials"
            })
        }

        const user = await userController.findUser(email)
        if (user) {
            return res.json({
                success: true,
                message: "signin successful",
                data: user.email
            })
        }
        return res.json({
            success: false,
            message: "signin failed"
        })
    } catch (error) {
        console.log('signin error : ', error)
        return res.json({
            success: false,
            message: "error in signin"
        })
    }
})

userRouter.get('/verify', async (req, res) => {
    console.log('GET /api/v1/users/verify')
    try {
        const { email } = req.body

        if (!email) {
            return res.json({
                success: false,
                message: "provide credentials"
            })
        }
        const user = await userController.findUser(email)

        if (user) {
            return res.json({
                success: true,
                message: "user verified",
                data: user.email
            })
        }

        return res.json({
            success: false,
            message: "user not found",
        })
    } catch (error) {
        console.log('verify error ',error)
        return res.json({
            success: false,
            message: "error in verify"
        })
    }
})