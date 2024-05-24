import HostedZone from '../Models/domainModel.js';

export const listDomains = async (req, res) => {
  try {
    const hostedZones = await HostedZone.find();
    res.json(hostedZones);
  } catch (error) {
    console.error('Error listing hosted zones:', error);
    res.status(500).json({ error: error.message });
  }
};

export const createHostedZone = async (req, res) => {
  try {
    const { domainName, description } = req.body;
    if (!domainName) {
      return res.status(400).json("Domain name is required");
    }
    const newHostedZone = new HostedZone({ name: domainName, description });
    const savedHostedZone = await newHostedZone.save();
    res.json({ message: 'Hosted zone created', savedHostedZone });
  } catch (error) {
    console.error('Error creating hosted zone:', error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteHostedZone = async (req, res) => {
  try {
    const { hostedZoneId } = req.params;
    const deletedHostedZone = await HostedZone.findByIdAndDelete(hostedZoneId);
    await DNSRecord.deleteMany({ hostedZoneId });
    res.json({ message: 'Hosted zone deleted', deletedHostedZone });
  } catch (error) {
    console.error('Error deleting hosted zone:', error);
    res.status(500).json({ error: error.message });
  }
};
