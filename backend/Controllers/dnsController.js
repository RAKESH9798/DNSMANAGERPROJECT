import DNSRecord from '../Models/dnsModel.js';

export const listHostedZones = async (req, res) => {
  try {
    const { hostedZoneId } = req.params;
    const records = await DNSRecord.find({ hostedZoneId });
    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createDNSRecord = async (req, res) => {
  try {
    const { domainName, recordType, recordValue, ttl, hostedZoneId } = req.body;
    const newRecord = new DNSRecord({ domainName, recordType, recordValue, ttl, hostedZoneId });
    const savedRecord = await newRecord.save();
    res.json({ message: 'DNS record created', savedRecord });
  } catch (error) {
    console.error(error);
    res.status(500).json('Failed to create DNS record');
  }
};

export const updateDNSRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { domainName, recordType, recordValue, ttl } = req.body;
    const updatedRecord = await DNSRecord.findByIdAndUpdate(
      id,
      { domainName, recordType, recordValue, ttl },
      { new: true }
    );
    res.json({ message: 'DNS record updated', updatedRecord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteDNSRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecord = await DNSRecord.findByIdAndDelete(id);
    res.json({ message: 'DNS record deleted', deletedRecord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
