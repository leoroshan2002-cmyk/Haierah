import express from 'express';
import { getCampaignByCategory, saveCampaign } from '../controllers/campaignController.js';

const router = express.Router();

router.get('/:category', getCampaignByCategory);
router.put('/:category', saveCampaign);

export default router;
