import Player from '../models/Player.js';
import mongoose from 'mongoose';

export async function getLeaderboard(req, res) {
  try {
    const players = await Player.find().lean();

    const withScore = players.map(p => {
      const base = p.baseValue || 0;
      const goals = p.goals || 0;
      const assists = p.assists || 0;
      const saves = p.saves || 0;
      const score = base + (goals * 5) + (assists * 2.5) + (saves * 1);

      return {
        _id: p._id,
        name: p.name,
        avatarUrl: p.avatarUrl || '',
        baseValue: base,
        goals,
        assists,
        saves,
        score
      };
    });

    withScore.sort((a, b) => b.score - a.score);
    res.json(withScore);
  } catch (err) {
    console.error('getLeaderboard error', err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function getPlayer(req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid player id' });
  }
  try {
    const p = await Player.findById(id).lean();
    if (!p) return res.status(404).json({ error: 'Player not found' });

    const base = p.baseValue || 0;
    const goals = p.goals || 0;
    const assists = p.assists || 0;
    const saves = p.saves || 0;
    const score = base + (goals * 5) + (assists * 2.5) + (saves * 1);

    res.json({ ...p, score });
  } catch (err) {
    console.error('getPlayer error', err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function getPlayers(req, res) {
  try {
    const players = await Player.find().lean();
    // return minimal fields for grid
    const list = players.map(p => ({ _id: p._id, name: p.name, avatarUrl: p.avatarUrl || '' }));
    res.json(list);
  } catch (err) {
    console.error('getPlayers error', err);
    res.status(500).json({ error: 'Server error' });
  }
}
export async function createPlayer(req, res) {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    const player = await Player.create(req.body);
    res.status(201).json(player);
  } catch (err) {
    console.error('createPlayer error', err);
    res.status(400).json({ error: 'Invalid data' });
  }
}

export async function updatePlayer(req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) { 
    return res.status(400).json({ error: "Invalid player id" })
  }
  try {
    const update = req.body; //allow for partial updates
    const player = await Player.findByIdAndUpdate(id, { $set: update }, {
      new : true, runValidators: true }).lean();
    if(!player) return res.status(404).json({error: "player not found"});

    // compute score for players
    const base = player.baseValue || 0;
    const goals = player.goals || 0;
    const assists = player.assists || 0;
    const saves = player.saves || 0;
    player.score = base + (goals * 5) + (assists * 2.5) + (saves * 1);

    res.json(player);
  }
    catch (error) {
    console.error('updatePlayer error', error);
    res.status(500).json({ error: 'Invalid data' });
  }
}
//delete player by id
export async function deletePlayer(req, res) {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({error: "Invalid player id"});

  try {
    const player = await Player.findByIdAndDelete(id);
    if(!player) return res.status(404).json({ error: "Player not found" });
    res.json({ message : "Player deleted" });
  } catch (error) {
    console.error('deletePlayer error', error);
    res.status(500).json({ error: 'Server error' });
  }
}