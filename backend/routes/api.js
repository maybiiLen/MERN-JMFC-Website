import express from 'express';
import {
  getPlayers,
  getPlayer,
  getLeaderboard,
  createPlayer,
  updatePlayer,
  deletePlayer 
} from '../controllers/playerController.js';
import { getVods, getVod, createVod, updateVod, deleteVod } from '../controllers/vodController.js';
import adminAuth from '../adminAuth.js';

const router = express.Router();

// players
router.get('/players', getPlayers);
router.get('/players/:id', getPlayer);
router.post('/players', adminAuth, createPlayer);
router.put('/players/:id', adminAuth, updatePlayer);
router.delete('/players/:id', adminAuth, deletePlayer);

// leaderboard
router.get('/leaderboard', getLeaderboard);

// vod routes
router.get('/vods', getVods);
router.get('/vods/:id', getVod);
router.post('/vods', adminAuth, createVod);
router.put('/vods/:id', adminAuth, updateVod);
router.delete('/vods/:id', adminAuth, deleteVod);


export default router;
