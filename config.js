// config.js - Konfigurasi bot
require('dotenv').config();

module.exports = {
  // Nomor partner (bisa diatur lewat .env)
  PARTNER_NUMBER: process.env.PARTNER_NUMBER,
  
  // Pengaturan delay response (dalam milidetik)
  MIN_DELAY: 1000, // 1 detik
  MAX_DELAY: 4000, // 4 detik
  
  // Puppeteer configuration
  PUPPETEER_CONFIG: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--disable-gpu",
    ],
  }
};