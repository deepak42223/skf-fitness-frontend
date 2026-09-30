# Image Optimization Guide

## Implemented Optimizations

### 1. Lazy Loading
All images now use native lazy loading:
```html
<img src="image.jpg" loading="lazy" alt="Description">
```

### 2. Recommended Tools

**For Batch Compression:**
- TinyPNG (https://tinypng.com/) - PNG/JPG compression
- Squoosh (https://squoosh.app/) - Google's image optimizer
- ImageOptim (Mac) / FileOptimizer (Windows)

**For WebP Conversion:**
```bash
# Install cwebp (Google WebP)
npm install -g cwebp

# Convert images
cwebp input.jpg -q 80 -o output.webp
```

### 3. Image Specifications

**Hero Images:**
- Format: WebP with JPG fallback
- Size: 1920x1080px
- Quality: 80%
- Max file size: 200KB

**Trainer Photos:**
- Format: WebP with JPG fallback
- Size: 600x800px
- Quality: 75%
- Max file size: 100KB

**Icons/Graphics:**
- Format: SVG (preferred) or PNG
- Max file size: 20KB

### 4. Implementation Example

```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" loading="lazy" alt="Description">
</picture>
```

### 5. Current Image Status

Run this command to check image sizes:
```bash
Get-ChildItem -Path "src/assets" -Recurse -Include *.jpg,*.png | 
  Where-Object {$_.Length -gt 100KB} | 
  Select-Object Name, @{Name="SizeKB";Expression={[math]::Round($_.Length/1KB, 2)}}
```

### 6. Next Steps

1. Compress all images over 100KB
2. Convert hero images to WebP
3. Add responsive images with srcset
4. Implement CDN for image delivery