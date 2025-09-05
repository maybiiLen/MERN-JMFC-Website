import mongoose from 'mongoose';

const vodSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

const Vod = mongoose.model('Vod', vodSchema);
export default Vod;
