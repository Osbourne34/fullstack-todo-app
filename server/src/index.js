import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { DB, PORT } from './constants/url.js';

import { authRoutes } from './routes/authRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', authRoutes);

const start = async () => {
    try {
        await mongoose.connect(DB);
        app.listen(PORT, () => {
            console.log('Server running on port: ' + PORT);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
