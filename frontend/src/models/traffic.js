import mongoose from 'mongoose';

const trafficSchema = new mongoose.Schema({
  routeId: { type: String, required: true, unique: true },
  vehicleCount: { type: Number, default: 0 },
  lightStatus: { type: String, enum: ['red', 'yellow', 'green'], default: 'red' },
  cameraOn: { type: Boolean, default: true },
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model('Traffic', trafficSchema);
