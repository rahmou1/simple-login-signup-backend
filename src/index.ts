import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import RateLimit from 'express-rate-limit';
import config from './config';
import errorMiddleware from './middleware/error.middleware';
import routes from './routes';
import cors from 'cors'; // to accept the requests from react apps on local machines

const PORT = config.port || 5000;
// create an instance server
const app: Application = express();
// middleware to parse incoming requests
app.use(express.json());
// using body parser
app.use(bodyParser.urlencoded({ extended: false }));
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

//! Accepting all requests that is coming from local machine
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200
};

app.use(cors(corsOptions)); // Use this after the variable declaration

// getting all routes
app.use('/', routes);
// add routing for / path
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍'
  });
});

// handling any error on the server
app.use(errorMiddleware);

// handling global errors
app.use((_req: Request, res: Response) => {
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
