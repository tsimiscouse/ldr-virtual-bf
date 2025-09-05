const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const config = require('./config');
const { randomDelay, getResponse } = require('./responses');

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
      console.log("🔄 QR Code received, scan dengan WhatsApp:");
      qrcode.generate(qr, { small: true });
      console.log("📱 Buka WhatsApp > Settings > Linked Devices > Link a Device");
    });
    
    // Ready State handler
    this.client.on("ready", () => {
      console.log("✅ Bot siap digunakan!");
      console.log(`💕 Partner: ${this.partnerNumber}`);
      console.log("🤖 Bot akan otomatis merespon pesan dari partner!");
    });
    
    // Message State handler
    this.client.on("message", async (message) => {
      try {
        if (message.from === this.partnerNumber && !message.fromMe) {
          console.log(`📨 Pesan masuk: "${message.body}"`);

          await this.client.sendPresenceAvailable();
          
          await randomDelay(config.MIN_DELAY, config.MAX_DELAY);

          const response = getResponse(message.body);
          
          console.log(`💬 Mengirim: "${response}"`);
          await message.reply(response);
          console.log("✅ Terkirim!");
        }
      } catch (error) {
        console.error("❌ Error:", error);
        
        if (message.from === this.partnerNumber) {
          try {
            await message.reply("Maaf ada error sebentar, coba lagi ya sayang! 😅");
          } catch (err) {
            console.error("❌ Error kirim pesan error:", err);
          }
        }
      }
    });
  }

  start() {
    console.log("🚀 Memulai WhatsApp Bot...");
    console.log(`📋 Partner: ${this.partnerNumber}`);
    this.client.initialize();
  }
}

module.exports = WhatsAppBot;