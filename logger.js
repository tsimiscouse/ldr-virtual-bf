// logger.js
const fs = require("fs");
const path = require("path");

const logDir = path.join(__dirname, "logs");

// pastikan folder logs ada
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFile = path.join(logDir, "bot.log");

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  // tampil di terminal
  console.log(message);
  // simpan ke file
  fs.appendFileSync(logFile, logMessage, "utf8");
}

function error(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ERROR: ${message}\n`;
  // tampil di terminal
  console.error(message);
  // simpan ke file
  fs.appendFileSync(logFile, logMessage, "utf8");
}

module.exports = { log, error };
