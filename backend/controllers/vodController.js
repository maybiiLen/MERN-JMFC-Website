import Vod from '../models/Vod.js';

// Get all VODs (newest first)
export async function getVods(req, res) {
  try {
    const vods = await Vod.find().sort({ date: -1 });
    res.json(vods);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch VODs' });
  }
}

// Get single VOD by ID
export async function getVod(req, res) {
  try {
    const vod = await Vod.findById(req.params.id);
    if (!vod) return res.status(404).json({ error: 'VOD not found' });
    res.json(vod);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch VOD' });
  }
}

// Create new VOD (admin only)
export async function createVod(req, res) {
  try {
    const vod = await Vod.create(req.body);
    res.status(201).json(vod);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create VOD' });
  }
}

// Update VOD (admin only)
export async function updateVod(req, res) {
  try {
    const vod = await Vod.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vod) return res.status(404).json({ error: 'VOD not found' });
    res.json(vod);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update VOD' });
  }
}

// Delete VOD (admin only)
export async function deleteVod(req, res) {
  try {
    const vod = await Vod.findByIdAndDelete(req.params.id);
    if (!vod) return res.status(404).json({ error: 'VOD not found' });
    res.json({ message: 'VOD deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete VOD' });
  }
}
