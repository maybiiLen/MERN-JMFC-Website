import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db.js";
import path from "path";

import adminAuth from "./adminAuth.js";
import { getLeaderboard } from './controllers/playerController.js';
import { createPlayer } from './controllers/playerController.js';
import apiRouter from './routes/api.js';
import {getPlayers} from './controllers/playerController.js';

dotenv.config();

const app = express();
const __dirname = path.resolve();

//middleware
if(process.env.NODE_ENV !== 'production') {
    app.use(
        cors({
            origin: 'http://localhost:5173',
            credentials: true,
        })
    );
} else {
    // Production CORS - allow your Render domain
    app.use(
        cors({
            origin: true, // Allow all origins in production, or specify your Render URL
            credentials: true,
        })
    );
}
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes (must come before static file serving)
app.post('/players', adminAuth, createPlayer);
app.get('/api/leaderboard', getLeaderboard);
app.get('/players', getPlayers);
app.use('/api', apiRouter);
app.get('/admin', adminAuth, (req,res) => {
    res.json({ok : true, msg: 'admin access granted'})
});

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
console.log('Environment:', process.env.NODE_ENV);
console.log('MongoDB URL exists:', !!process.env.MONGO_URL);
console.log('Admin Secret exists:', !!process.env.ADMIN_SECRET);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is listening port ${PORT}`)
    })
}).catch((error) => {
    console.error('Database connection failed:', error);
});
