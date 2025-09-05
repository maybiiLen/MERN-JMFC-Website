import mongoose from 'mongoose';

const attributesSchema = new mongoose.Schema({
  pace: Number,
  shooting: Number,
  passing: Number,
  dribbling: Number,
  defending: Number,
  physical: Number
}, { _id: false });

const playerSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  avatarUrl: { type: String, default: '' },
  baseValue: { type: Number, default: 0 },
  goals: { type: Number, default: 0 },
  assists: { type: Number, default: 0 },
  saves: { type: Number, default: 0 },
  attributes: { type: attributesSchema, default: () => ({}) },
  styleBias: { type: Number, default: 50 },
  bio: { type: String, default: '' }
}, { timestamps: true });

playerSchema.virtual('score').get(function() {
  // score formula (base + goals*5 + assists*2.5 + saves*1)
  return (this.baseValue || 0) + ((this.goals || 0) * 5) + ((this.assists || 0) * 2.5) + ((this.saves || 0) * 1);
});

playerSchema.set('toJSON', { virtuals: true, versionKey: false });
export default mongoose.model('Player', playerSchema);