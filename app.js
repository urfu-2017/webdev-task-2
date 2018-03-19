import express from 'express';
import { routes } from './routes';
import bodyParser from 'body-parser';
export const app = express();

app.use(bodyParser.json());
routes(app);
