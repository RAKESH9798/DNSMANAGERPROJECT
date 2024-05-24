import express from 'express';
import {
  listHostedZones,
  createDNSRecord,
  updateDNSRecord,
  deleteDNSRecord,
} from '../Controllers/dnsController.js';

const router = express.Router();

router.get('/hostedZones/:hostedZoneId', listHostedZones);
router.post('/dns', createDNSRecord);
router.put('/dns/:id', updateDNSRecord);
router.delete('/dns/:id', deleteDNSRecord);

export default router;
