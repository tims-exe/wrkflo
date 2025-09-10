import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET!

interface MyJwtPayload extends JwtPayload {
    userId: string
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token found"
        })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as MyJwtPayload

        req.userId = decoded.userId
        next()

    } catch (error) {
        console.error(error)
        return res.status(401).json({
            success: false,
            message: "token not valid"
        })
    }
}