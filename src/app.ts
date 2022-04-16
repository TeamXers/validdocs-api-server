import express, { json, urlencoded } from 'express';
import cors from 'cors';

const app = express();

app.use(json());
app.use(urlencoded());
app.use(cors());

export { app }
