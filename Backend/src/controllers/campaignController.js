import Campaign from '../models/Campaign.js';

const toCampaignResponse = (campaign) => {
  const doc = campaign.toObject({ getters: true, virtuals: false });
  doc.id = doc._id?.toString();
  delete doc._id;
  delete doc.__v;
  return doc;
};

export const getCampaignByCategory = async (req, res) => {
  try {
    const category = String(req.params.category || '').toLowerCase();
    if (!category) {
      return res.status(400).json({ success: false, message: 'Category is required' });
    }

    const campaign = await Campaign.findOne({ category });
    return res.status(200).json({
      success: true,
      campaign: campaign ? toCampaignResponse(campaign) : null,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const saveCampaign = async (req, res) => {
  try {
    const category = String(req.params.category || req.body.category || '').toLowerCase();
    if (!category) {
      return res.status(400).json({ success: false, message: 'Category is required' });
    }

    const payload = {
      category,
      slider: Array.isArray(req.body.slider) ? req.body.slider : [],
      promoCards: Array.isArray(req.body.promoCards) ? req.body.promoCards : [],
      bottomPromoCards: Array.isArray(req.body.bottomPromoCards) ? req.body.bottomPromoCards : [],
    };

    const campaign = await Campaign.findOneAndUpdate(
      { category },
      payload,
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: 'Campaign saved successfully',
      campaign: campaign ? toCampaignResponse(campaign) : null,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
