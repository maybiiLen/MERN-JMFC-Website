import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";

import adminAuth from "./adminAuth.js";
import { getLeaderboard } from './controllers/playerController.js';
import { createPlayer } from './controllers/playerController.js';
import apiRouter from './routes/api.js';
import {getPlayers} from './controllers/playerController.js';

dotenv.config();

const app = express();

//middleware
app.use(cors());
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
//finish with backend and put all player stats and vods in the database