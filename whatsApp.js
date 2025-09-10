// WhatsAppBot.js
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const config = require("./config");
const { randomDelay, getResponse } = require("./responses");
const { log, error } = require("./logger");

class WhatsAppBot {
  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: config.PUPPETEER_CONFIG,
    });

    this.partnerNumber = config.PARTNER_NUMBER;
    this.initializeEventHandlers();
  }

  initializeEventHandlers() {
    // QR State Code handler
    this.client.on("qr", (qr) => {
      log("🔄 QR Code received, scan dengan WhatsApp:");
      qrcode.generate(qr, { small: true });
      log("📱 Buka WhatsApp > Settings > Linked Devices > Link a Device");
    });

    // Ready State handler
    this.client.on("ready", () => {
      log("✅ Bot siap digunakan!");
      log(`💕 Partner: ${this.partnerNumber}`);
      log("🤖 Bot akan otomatis merespon pesan dari partner!");
    });

    // Message State handler
    this.client.on("message", async (message) => {
      try {
        if (message.from === this.partnerNumber && !message.fromMe) {
          log(`📨 Pesan masuk: "${message.body}"`);

          await this.client.sendPresenceAvailable();
          await randomDelay(config.MIN_DELAY, config.MAX_DELAY);

          const response = getResponse(message.body);

          log(`💬 Mengirim: "${response}"`);
          await message.reply(response);
          log("✅ Terkirim!");
        }
      } catch (err) {
        error(`❌ Error: ${err.message}`);

        if (message.from === this.partnerNumber) {
          try {
            await message.reply(
              "Maaf ada error sebentar, coba lagi ya sayang! 😅"
            );
          } catch (sendErr) {
            error(`❌ Error kirim pesan error: ${sendErr.message}`);
          }
        }
      }
    });
  }

  start() {
    log("🚀 Memulai WhatsApp Bot...");
    log(`📋 Partner: ${this.partnerNumber}`);
    this.client.initialize();
  }
}

module.exports = WhatsAppBot;