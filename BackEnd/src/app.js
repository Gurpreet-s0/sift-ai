import { configDotenv } from 'dotenv'
import express from 'express'
configDotenv()
const app = express()
app.use(express.json())

export default app