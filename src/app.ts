import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { router } from './routes';

const app = express();

app.use(json());
app.use(urlencoded());
app.use(cors());

app.use(router);

export { app }
