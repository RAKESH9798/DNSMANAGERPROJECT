import mongoose from 'mongoose';

const hostedZoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const HostedZone = mongoose.model('HostedZone', hostedZoneSchema);

export default HostedZone;
