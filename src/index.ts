import { config } from "dotenv";
config();

import { connect } from "mongoose";
import { app } from "./app";

const essentials = [
    'DB_URI', 'PORT'
]
essentials.map((value) => {
    if (process.env[value] !== undefined) return;
    throw new Error(`${value} not set in env!`);
});

connect(process.env.DB_URI!, {
    autoIndex: true
}, () => {
    console.log(`Connected to DB at ${process.env.DB_URI}`);
});
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
