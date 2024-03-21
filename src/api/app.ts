import 'reflect-metadata';
import http from 'http';
import 'dotenv/config';
import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import '@config/container';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import { router } from './routes';

const app = express();

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));

app.use(json());

app.use(router);

app.use(globalErrorHandler);

const server = http.createServer(app);

export { server };
