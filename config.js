require('dotenv').config();

module.exports = {
  PARTNER_NUMBER: process.env.PARTNER_NUMBER,
  
  MIN_DELAY: 1000, // Delay 1s
  MAX_DELAY: 4000, // Delay 4s
  
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