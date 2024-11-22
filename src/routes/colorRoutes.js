import express from 'express';
import { 
  generateAnalogousPalette,
  generateComplementaryPalette,
  generateMonochromaticPalette
} from '../utils/colorUtils.js';

const router = express.Router();

router.post('/palette/generate', async (req, res) => {
  try {
    const { baseColor, type = 'analogous' } = req.body;

    // Basit validasyon
    if (!baseColor) {
      return res.status(400).json({ 
        success: false, 
        error: 'Base color is required' 
      });
    }

    // HEX color validation
    if (!/^#[0-9A-F]{6}$/i.test(baseColor)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid hex color format. Use format: #RRGGBB' 
      });
    }

    let palette;
    switch (type.toLowerCase()) {
      case 'analogous':
        palette = generateAnalogousPalette(baseColor);
        break;
      case 'complementary':
        palette = generateComplementaryPalette(baseColor);
        break;
      case 'monochromatic':
        palette = generateMonochromaticPalette(baseColor);
        break;
      default:
        return res.status(400).json({ 
          success: false, 
          error: 'Invalid palette type' 
        });
    }

    res.json({
      success: true,
      data: {
        baseColor,
        type,
        palette
      }
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

export default router;