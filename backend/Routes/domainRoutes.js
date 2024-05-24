import express from 'express';
import {
  listDomains,
  createHostedZone,
  deleteHostedZone
} from '../Controllers/domainController.js';

const router = express.Router();

router.get('/domains', listDomains);
router.post('/createdomain', createHostedZone);
router.delete('/deletedomain/:hostedZoneId', deleteHostedZone);

export default router;
