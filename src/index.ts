import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import * as dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 5000
// create an instance server
const app: Application = express()
// middleware to parse incoming requests
app.use(express.json())
// HTTP request logger middleware
app.use(morgan('common'))
// HTTP security middleware
app.use(helmet())
/// Apply the rate limiting middleware to all requests
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many requests from this IP, please try again later'
  })
)
// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍'
  })
})

app.post('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍 from post',
    data: req.body
  })
})

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`)
})

export default app