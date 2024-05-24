import mongoose from 'mongoose';

const dnsRecordSchema = new mongoose.Schema({
  domainName: {
    type: String,
    required: true,
  },
  recordType: {
    type: String,
    required: true,
  },
  recordValue: {
    type: String,
    required: true,
  },
  ttl: {
    type: Number,
    required: true,
    default: 300,
  },
  hostedZoneId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HostedZone',
    required: true,
  },
});

const DNSRecord = mongoose.model('DNSRecord', dnsRecordSchema);

export default DNSRecord;
