import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db.js";

import adminAuth from "./adminAuth.js";
import { getLeaderboard } from './controllers/playerController.js';
import { createPlayer } from './controllers/playerController.js';
import apiRouter from './routes/api.js';
import {getPlayers} from './controllers/playerController.js';

dotenv.config();

const app = express();

//middleware
app.use(cors({
  origin: 'http://localhost:5173', // Updated to port 5173
  credentials: true // Allow cookies to be sent
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/players', adminAuth, createPlayer);
app.get('/', getLeaderboard);
app.get('/players', getPlayers);
// mount API router
app.use('/api', apiRouter);
app.get('/admin', adminAuth, (req,res) => {
    res.json({ok : true, msg: 'admin access granted'})
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is listening port ${PORT}`)
    })
});
