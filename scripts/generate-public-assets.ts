// scripts/generate-public-assets.ts

import fs from 'node:fs';
import path from 'node:path';
import pngToIco from 'png-to-ico';
import sharp from 'sharp';

import { site } from '../src/lib/data/site-content';

const SOURCE_ICON = 'public/favicon.svg';
const PUBLIC_DIR = 'public';
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images'); // Ensure this folder exists
const MANIFEST_PATH = path.join(PUBLIC_DIR, 'site.webmanifest');
const FAVICON_ICO_PATH = path.join(PUBLIC_DIR, 'favicon.ico');
const OG_IMAGE_PATH = path.join(IMAGES_DIR, 'site_image.jpg');

const ICONS = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
];

const generateAssets = async () => {
  console.log('⚙️  Starting Asset Generation...');

  if (!fs.existsSync(SOURCE_ICON)) {
    console.error(`❌ Source icon not found at: ${SOURCE_ICON}`);
    throw new Error('Source icon not found');
  }

  // Ensure /public/images exists
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }

  // 1. Generate PWA Icons
  console.log('🎨 Generating PWA Icons...');
  for (const icon of ICONS) {
    const destPath = path.join(PUBLIC_DIR, icon.name);
    await sharp(SOURCE_ICON).resize(icon.size, icon.size).toFormat('png').toFile(destPath);
    console.log(`   ✅ Created ${icon.name}`);
  }

  // 2. Generate Favicon.ico
  console.log('🎨 Generating favicon.ico...');
  try {
    const icoBuffer = await sharp(SOURCE_ICON).resize(32, 32).png().toBuffer();
    const icoFile = await pngToIco(icoBuffer);
    fs.writeFileSync(FAVICON_ICO_PATH, icoFile);
    console.log('   ✅ Created favicon.ico');
  } catch (error) {
    console.error('   ❌ Failed to create favicon.ico:', error);
  }

  // 3. Generate Social Preview Image (1200x630)
  // This creates a branded background with your logo centered
  console.log('🖼️  Generating Social OG Image...');
  try {
    // Create a background with your theme color
    const background = sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 3,
        background: site.themeColor || '#1e293b',
      },
    }).png();

    // Resize your logo to sit in the center (300px wide)
    const logoOverlay = await sharp(SOURCE_ICON)
      .resize(300, 300, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();

    // Composite them
    await background
      .composite([{ input: logoOverlay, gravity: 'center' }])
      .toFormat('jpeg')
      .toFile(OG_IMAGE_PATH);

    console.log('   ✅ Created /images/site_image.jpg');
  } catch (error) {
    console.error('   ❌ Failed to create social image:', error);
  }

  // 4. Generate Manifest
  console.log('📜 Generating site.webmanifest...');
  const shortName = site.shortName || site.name;
  const manifest = {
    name: site.name,
    short_name: shortName,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: site.themeColor,
    theme_color: site.themeColor,
    orientation: 'portrait',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
    ],
  };
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log('   ✅ Created site.webmanifest');

  console.log('✨ All assets generated successfully!');
};

await generateAssets();
