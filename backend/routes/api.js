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
import Player from '../models/Player.js';

const router = express.Router();

// players
router.get('/players', getPlayers);
router.get('/players/full', async (req, res) => {
  try {
    const players = await Player.find().lean();
    res.json(players);
  } catch (err) {
    console.error('getFullPlayers error', err);
    res.status(500).json({ error: 'Server error' });
  }
});
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

// Admin authentication routes
router.post('/admin/login', (req, res) => {
  const { password } = req.body;
  
  // Check if password matches the environment variable
  if (password === process.env.ADMIN_SECRET) {
    // Set a cookie to maintain session
    res.cookie('adminAuth', 'authenticated', {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

router.post('/admin/logout', (req, res) => {
  res.clearCookie('adminAuth');
  res.json({ success: true, message: 'Logged out successfully' });
});

// Check admin authentication status
router.get('/admin/check', (req, res) => {
  const isAuthenticated = req.cookies.adminAuth === 'authenticated';
  res.json({ authenticated: isAuthenticated });
});

// Admin-protected routes for player management
router.get('/admin/players', (req, res) => {
  // Check authentication via cookie instead of header
  if (req.cookies.adminAuth !== 'authenticated') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // Return all player fields for admin dashboard
  Player.find().lean()
    .then(players => {
      res.json(players);
    })
    .catch(err => {
      console.error('Admin getPlayers error', err);
      res.status(500).json({ error: 'Server error' });
    });
});

router.post('/admin/players', (req, res) => {
  if (req.cookies.adminAuth !== 'authenticated') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  createPlayer(req, res);
});

router.put('/admin/players/:id', (req, res) => {
  if (req.cookies.adminAuth !== 'authenticated') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  updatePlayer(req, res);
});

router.delete('/admin/players/:id', (req, res) => {
  if (req.cookies.adminAuth !== 'authenticated') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  deletePlayer(req, res);
});


export default router;
