import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';
import config from './config';
import errorMiddleware from './middleware/error.middleware';

const PORT = config.port || 5000;
// create an instance server
const app: Application = express();
// middleware to parse incoming requests
app.use(express.json());
// HTTP request logger middleware
app.use(morgan('common'));
// HTTP security middleware
app.use(helmet());
/// Apply the rate limiting middleware to all requests
app.use(
  RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many requests from this IP, please try again later'
  })
);
// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍'
  });
});

app.post('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍 from post',
    data: req.body
  });
});

// handling any error on the server
app.use(errorMiddleware);

// handling global errors
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message:
      'Oh you are lost, Read the API documentation to find your way back home 😂'
  });
});

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`);
});

export default app;
