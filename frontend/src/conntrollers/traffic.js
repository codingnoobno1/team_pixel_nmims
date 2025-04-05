import Traffic from '../models/Traffic.js';

export const getTrafficData = async (req, res) => {
  const { routeId } = req.params;
  const data = await Traffic.findOne({ routeId });
  res.json(data);
};

export const updateTrafficData = async (req, res) => {
  const { routeId } = req.params;
  const update = req.body;
  const data = await Traffic.findOneAndUpdate({ routeId }, update, { new: true, upsert: true });
  res.json(data);
};
