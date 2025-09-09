import express from 'express'
import cors from 'cors'

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

app.listen(5000, () => {
    console.log('server running in port 5000')
})