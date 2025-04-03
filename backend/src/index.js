import {connectDB} from "./lib/db.js";
import dotenv from "dotenv";
import express from 'express'
import cors from 'cors'
import * as path from "path";
import parkRoute from "./routes/park.route.js";
import userRoute from "./routes/user.route.js";

dotenv.config()

const app = express()
const PORT = process.env.PORT

const __dirname = path.resolve();

app.use(express.json())
app.use(cors())

app.use('/api/parks', parkRoute)
app.use('/api/users', userRoute)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/dist')))
    app.get(/(.*)/, (req,res) => {
        res.sendFile(path.resolve(__dirname,'../frontend/dist/index.html'))
    })
}

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
    connectDB()
})
