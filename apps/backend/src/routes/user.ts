import { Router } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User.js";

export const userRouter: Router = Router()

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

        const repo = AppDataSource.getMongoRepository(User)

        const existing = await repo.findOne({
            where: { email }
        })
        if (existing) {
            return res.json({
                success: false,
                message: "user exists"
            })
        }

        const newUser = repo.create({
            email, password
        })

        const saved = repo.save(newUser)

        return res.json({
            success: true,
            message: "signup successful"
        })

    } catch (error) {
        console.log('signup error ' ,error)
        return res.json({
            success: false,
            message: "error in signup"
        })
    }
})

// userRouter.post('/signin')

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

        const repo = AppDataSource.getMongoRepository(User)

        const user = await repo.findOne({
            where: { email }
        })

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