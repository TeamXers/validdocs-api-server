import express, { json, urlencoded } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { router } from './routes';

const app = express();

app.use(json());
app.use(urlencoded());
app.use(cors());
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use(router);

export { app }
