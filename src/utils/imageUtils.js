// Fungsi untuk memuat gambar dengan progressive loading
export const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Fungsi untuk mengoptimalkan ukuran gambar menggunakan canvas
export const optimizeImage = async (imageUrl, targetWidth = 400, targetHeight = 400) => {
  try {
    const img = await loadImage(imageUrl);
    
    // Buat canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set ukuran canvas
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    
    // Gambar image ke canvas dengan ukuran yang diinginkan
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
    
    // Convert ke WebP dengan kualitas yang lebih rendah
    return canvas.toDataURL('image/webp', 0.8);
  } catch (error) {
    console.error('Error optimizing image:', error);
    return imageUrl; // Fallback ke URL original jika error
  }
};

// Preset ukuran untuk berbagai kebutuhan
export const imageSizes = {
  thumbnail: { width: 100, height: 100 },
  small: { width: 300, height: 300 },
  medium: { width: 600, height: 600 },
  large: { width: 900, height: 900 }
}; 