/**
 * Converts an image File (jpg, jpeg, png) to WebP format using the browser Canvas API.
 * Returns the original file unchanged if it is already WebP or not an image we handle.
 *
 * @param file        - The source image file
 * @param quality     - WebP quality 0–1 (default 0.82)
 * @param maxWidth    - Max output width in px; aspect ratio is preserved (default 1920)
 * @param maxHeight   - Max output height in px; aspect ratio is preserved (default 1920)
 */
export async function convertToWebP(
  file: File,
  quality = 0.82,
  maxWidth = 1920,
  maxHeight = 1920
): Promise<File> {
  const convertibleTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!convertibleTypes.includes(file.type)) {
    return file; // Return as-is for GIFs, already-WebP, etc.
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      // Calculate scaled dimensions preserving aspect ratio
      let { width, height } = img;
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas 2D context not available'));

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error('Failed to convert image to WebP'));
          // Rename file with .webp extension
          const baseName = file.name.replace(/\.[^.]+$/, '');
          const webpFile = new File([blob], `${baseName}.webp`, {
            type: 'image/webp',
            lastModified: Date.now(),
          });
          resolve(webpFile);
        },
        'image/webp',
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image for conversion'));
    };

    img.src = objectUrl;
  });
}
