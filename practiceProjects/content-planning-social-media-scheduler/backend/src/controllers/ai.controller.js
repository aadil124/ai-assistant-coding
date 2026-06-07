import { generateCaption as askGeminiCaption, generateHashtags as askGeminiTags } from '../services/ai.service.js';

export const generateCaption = async (req, res, next) => {
  const { prompt, tone, platform, length } = req.body;

  try {
    // Check workspace AI quota limits
    if (req.workspace.aiQuotaUsed >= req.workspace.aiQuotaLimit) {
      return res.status(403).json({
        success: false,
        message: 'AI generation quota exceeded for this workspace. Please upgrade your subscription.'
      });
    }

    const result = await askGeminiCaption(prompt, tone, platform, length);

    // Increment workspace quota
    req.workspace.aiQuotaUsed += result.tokensConsumed || 150;
    await req.workspace.save();

    res.status(200).json({
      success: true,
      captions: result.captions,
      quotaUsed: req.workspace.aiQuotaUsed,
      quotaLimit: req.workspace.aiQuotaLimit
    });
  } catch (error) {
    next(error);
  }
};

export const generateHashtags = async (req, res, next) => {
  const { caption } = req.body;

  try {
    if (!caption) {
      return res.status(400).json({ success: false, message: 'Caption text is required' });
    }

    const tags = await askGeminiTags(caption);
    res.status(200).json({ success: true, hashtags: tags });
  } catch (error) {
    next(error);
  }
};
