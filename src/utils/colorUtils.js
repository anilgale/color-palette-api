// Renk dönüşüm ve hesaplama fonksiyonları
export const hexToRgb = (hex) => {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return { r, g, b };
  };
  
  export const rgbToHex = ({ r, g, b }) => {
    const toHex = (n) => {
      const hex = n.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };
  
  export const rgbToHsl = ({ r, g, b }) => {
    r /= 255;
    g /= 255;
    b /= 255;
  
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
  
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      
      h /= 6;
    }
  
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };
  
  export const hslToRgb = ({ h, s, l }) => {
    h /= 360;
    s /= 100;
    l /= 100;
  
    let r, g, b;
  
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
  
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
  
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
  
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };
  
  // Palet oluşturma fonksiyonları
  export const generateAnalogousPalette = (baseColor) => {
    const hsl = rgbToHsl(hexToRgb(baseColor));
    const palette = [];
  
    // Ana renk etrafında daha yakın açılarla 5 renk
    [-20, -10, 0, 10, 20].forEach(degree => {
      let newHue = (hsl.h + degree + 360) % 360;
      // Hafif saturasyon ve lightness varyasyonları ekleyelim
      let newSat = Math.min(100, Math.max(0, hsl.s + degree/2));
      let newLight = Math.min(100, Math.max(0, hsl.l + degree/3));
      palette.push(rgbToHex(hslToRgb({ h: newHue, s: newSat, l: newLight })));
    });
  
    return palette;
  };
  
  export const generateComplementaryPalette = (baseColor) => {
    const hsl = rgbToHsl(hexToRgb(baseColor));
    const palette = [];
    
    // Zıt renk (180 derece)
    const complementaryHue = (hsl.h + 180) % 360;
    
    // Ana renk grubu (3 ton)
    palette.push(rgbToHex(hslToRgb({ 
      h: hsl.h, 
      s: hsl.s,
      l: Math.min(100, hsl.l + 25) // Açık ton
    })));
    
    palette.push(baseColor); // Ana renk
    
    palette.push(rgbToHex(hslToRgb({ 
      h: hsl.h, 
      s: hsl.s,
      l: Math.max(0, hsl.l - 15) // Koyu ton
    })));
    
    // Zıt renk grubu (2 ton)
    palette.push(rgbToHex(hslToRgb({ 
      h: complementaryHue, 
      s: hsl.s,
      l: hsl.l + 10 // Ana zıt renk, biraz daha açık
    })));
    
    palette.push(rgbToHex(hslToRgb({ 
      h: complementaryHue, 
      s: hsl.s,
      l: Math.max(0, hsl.l - 20) // Koyu zıt renk
    })));
    
    return palette;
  };
  
  export const generateMonochromaticPalette = (baseColor) => {
    const hsl = rgbToHsl(hexToRgb(baseColor));
    const palette = [];
    
    // Lightness değerlerini daha kontrollü ayarlayalım
    // Ana rengin lightness değerine göre rölatif değişimler yapalım
    const adjustments = [
      Math.min(30, (100 - hsl.l) * 0.7),  // Açık tonlar için üst sınır
      Math.min(15, (100 - hsl.l) * 0.5),
      0,  // Ana renk
      Math.min(20, hsl.l * 0.4) * -1,
      Math.min(35, hsl.l * 0.7) * -1   // Koyu tonlar için alt sınır
    ];
    
    // Her adjustment değeri için renk üret
    adjustments.forEach(adjustment => {
      const newLightness = Math.max(0, Math.min(100, hsl.l + adjustment));
      // Saturasyonu da hafifçe ayarla
      const newSaturation = Math.max(0, Math.min(100, 
        adjustment > 0 ? hsl.s - (adjustment * 0.5) : hsl.s + (Math.abs(adjustment) * 0.3)
      ));
      
      palette.push(rgbToHex(hslToRgb({
        h: hsl.h,
        s: newSaturation,
        l: newLightness
      })));
    });
    
    return palette;
  };