import express from 'express'
import cors from 'cors'
import { AppDataSource } from './config/data-source.js'
import { userRouter } from './routes/user.js'

const app = express()
app.use(express.json())
app.use(cors())

// app.get('/', (req, res) => {
//     console.log("GET: /")
//     return res.json({
//         success: true,
//         message: "server running"
//     })
// })


app.use('/api/v1/users', userRouter)


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