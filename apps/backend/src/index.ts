import express from 'express'
import cors from 'cors'
import { AppDataSource } from './config/data-source.js'
import { userRouter } from './routes/user.js'
import { workflowRouter } from './routes/workflow.js'
import { authMiddleware } from './routes/authMiddleware.js'
import { credRouter } from './routes/credentials.js'
import { whRouter } from './routes/webhook.js'

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    console.log("GET: /")
    return res.json({
        success: true,
        message: "server running"
    })
})


app.use('/api/v1/users', userRouter)
app.use('/api/v1/workflow', authMiddleware, workflowRouter)
app.use('/api/v1/credentials', authMiddleware, credRouter)
app.use('/api/v1/webhook', whRouter)
// http://localhost:5000/api/v1/webhook/handler/68c80162c99d0a21dd5071ff--pwdmb


AppDataSource.initialize()
    .then(() => {
        console.log("database connected")
    
        app.listen(5000, () => {
            console.log('server running in port 5000')
        })
    })
    .catch(() => {
        console.log("database connection failed")
    })