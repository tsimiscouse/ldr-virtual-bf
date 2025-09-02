const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const {
  PATTERNS,
  DEFAULT_RESPONSES,
  REFLECTIONS,
  reflect,
} = require("./rule-based.js");

const userSessions = {};

const partnerNumber = "31610268023@c.us";

// Bot is automatically active - no control commands needed
let isBotActive = true;

// Initialize WhatsApp client
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
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
  },
});

// Enhanced time-based response function
function getTimeBasedResponse() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return [
      "Pagi sayang! ☀️ Maaf ya aku baru bangun/lagi sibuk pagi ini! Hope you having a great morning! 🥰",
      "Good morning my love! 🌅 Sorry for the delayed response, but thinking of you already! 💕",
    ];
  } else if (hour >= 12 && hour < 17) {
    return [
      "Afternoon babe! 🌞 Lagi sibuk siang ini, tapi I miss you! Hope your lunch was good! 😘",
      "Siang sayang! ☀️ Sorry late reply, but {reflected} always on my mind! 💭❤️",
    ];
  } else if (hour >= 17 && hour < 22) {
    return [
      "Evening love! 🌆 Maaf baru bisa bales, tapi aku kangen kamu! How was your day? 🥰",
      "Sore sayang! 🌇 Been thinking about you all day! 😘💕",
    ];
  } else {
    return [
      "Late night message! 🌙 Aku lagi istirahat/tidur, tapi aku sayang banget sama kamu! Sweet dreams if you're sleeping too! 😴💕",
      "Midnight thoughts of you! 🌟 Sorry kalau ga langsung bales, but love you as always! Good night! 😘",
    ];
  }
}

// Enhanced message processing function
function processMessage(message) {
  const lowerMessage = message.toLowerCase().trim();

  // Check each pattern
  for (const pattern of PATTERNS) {
    const match = lowerMessage.match(pattern.regex);
    if (match) {
      // Pick random response
      const response =
        pattern.responses[Math.floor(Math.random() * pattern.responses.length)];

      // Replace placeholders
      let finalResponse = response;

      // Replace {reflected} with reflection of message or name
      if (finalResponse.includes("{reflected}")) {
        const reflected = reflect(message) || userName;
        finalResponse = finalResponse.replace(/{reflected}/g, reflected);
      }

      // Handle greetings
      if (match[1]) {
        const capturedGreeting = match[1];
        let finalGreeting = capturedGreeting; 
        if (
          ["goodmorning", "goodnight", "good morning", "good night"].includes(
            capturedGreeting.toLowerCase()
          )
        ) {
          finalGreeting = `${capturedGreeting}`;
        } 
        finalResponse = finalResponse.replace(/{greeting}/g, finalGreeting);
      }

      // Replace {X} with captured groups or reflections
      if (match[1] && finalResponse.includes("{X}")) {
        finalResponse = finalResponse.replace(/{X}/g, reflect(match[1]));
      }

      // Replace {feeling} for emotional states
      if (match[2] && finalResponse.includes("{feeling}")) {
        finalResponse = finalResponse.replace(/{feeling}/g, match[2]);
      }

      // Replace {emotion}
      if (finalResponse.includes("{emotion}")) {
        const emotionMatch = lowerMessage.match(
          /(sedih|senang|lelah|capek|stress|bingung|takut|khawatir|sad|happy|tired|worried|scared|excited|lonely)/
        );
        if (emotionMatch) {
          finalResponse = finalResponse.replace(/{emotion}/g, emotionMatch[1]);
        }
      }

      // Replace {activity}
      if (finalResponse.includes("{activity}")) {
        const activityMatch = lowerMessage.match(
          /(ujian|test|exam|kerja|work|project|tugas|assignment)/
        );
        if (activityMatch) {
          finalResponse = finalResponse.replace(
            /{activity}/g,
            activityMatch[1]
          );
        } else {
          finalResponse = finalResponse.replace(/{activity}/g, "kegiatan");
        }
      }

      // Replace {problem}
      if (finalResponse.includes("{problem}")) {
        const problemMatch = lowerMessage.match(
          /(susah|sulit|difficult|hard|frustrating)/
        );
        if (problemMatch) {
          finalResponse = finalResponse.replace(/{problem}/g, problemMatch[1]);
        } else {
          finalResponse = finalResponse.replace(/{problem}/g, "challenging");
        }
      }

      return finalResponse;
    }
  }

  // If no pattern matches, use time-based response or default
  const timeResponses = getTimeBasedResponse();
  const allDefaults = [...DEFAULT_RESPONSES, ...timeResponses];
  let response = allDefaults[Math.floor(Math.random() * allDefaults.length)];

  // Apply reflection to default response
  response = response.replace(/{reflected}/g, reflect(message) || userName);

  return response;
}

// Function to add delay for more natural responses
function randomDelay() {
  return new Promise((resolve) => {
    const delay = Math.random() * 3000 + 1000; // 1-4 seconds
    setTimeout(resolve, delay);
  });
}

// Event handler for QR code generation
client.on("qr", (qr) => {
  console.log(
    "🔄 QR Code received, please scan with your WhatsApp mobile app:"
  );
  console.log("");
  qrcode.generate(qr, { small: true });
  console.log("");
  console.log("📱 Steps to connect:");
  console.log("1. Open WhatsApp on your phone");
  console.log("2. Go to Settings > Linked Devices");
  console.log("3. Tap 'Link a Device'");
  console.log("4. Scan the QR code above");
});

// Event handler when client is ready
client.on("ready", () => {
  console.log("✅ Chatbot is ready and connected!");
  console.log("📱 Connected device:", client.info.pushname);
  console.log("📞 Phone number:", client.info.wid.user);
  console.log("Bot status: 🟢 ACTIVE (Auto-enabled)");
  console.log("");
  console.log(`💕 Partner number set to: ${partnerNumber}`);
  console.log(
    "⚠️  Make sure to update the partnerNumber variable with correct number!"
  );
  console.log("");
  console.log(
    "🤖 Bot will automatically respond to messages from your partner!"
  );
});

// Event handler for authentication failure
client.on("auth_failure", (msg) => {
  console.error("❌ Authentication failed:", msg);
  console.log("🔄 Please delete the .wwebjs_auth folder and restart the bot.");
});

// Event handler for disconnection
client.on("disconnected", (reason) => {
  console.log("📱 Client was logged out:", reason);
});

// Main message processing logic
client.on("message", async (message) => {
  try {
    const messageText = message.body.trim();

    // Log incoming messages for debugging
    if (message.from === partnerNumber) {
      console.log(`📨 Message from partner: "${messageText}"`);
    }

    // Only process messages from partner when bot is active and not from self
    if (message.from === partnerNumber && isBotActive && !message.fromMe) {
      console.log(`🤖 Processing message: "${messageText}"`);

      // Add typing indicator for more natural feel
      await client.sendPresenceAvailable();

      // Random delay to simulate typing
      await randomDelay();

      // Get session for this user (or create new one)
      if (!userSessions[message.from]) {
        userSessions[message.from] = {
          name: "sayang",
          lastInteraction: Date.now(),
          messageCount: 0,
        };
      }

      const session = userSessions[message.from];
      session.messageCount++;
      session.lastInteraction = Date.now();

      // Process the message using the enhanced function
      const responseText = processMessage(messageText, session.name);

      console.log(`💬 Sending response: "${responseText}"`);

      // Send the response
      await message.reply(responseText);

      console.log("✅ Response sent successfully!");
    }
  } catch (error) {
    console.error("❌ Error processing message:", error);

    // Send error response only if bot is active and message is from partner
    if (message.from === partnerNumber && isBotActive) {
      try {
        await message.reply(
          "Oops! Ada masalah teknis sebentar. Coba kirim pesan lagi ya sayang! 😅💕"
        );
      } catch (replyError) {
        console.error("❌ Error sending error response:", replyError);
      }
    }
  }
});

// Graceful shutdown handling
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down bot gracefully...");
  await client.destroy();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n🛑 Shutting down bot gracefully...");
  await client.destroy();
  process.exit(0);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
});

// Start the bot
console.log("🚀 Starting WhatsApp Chatbot...");
console.log("📋 Configuration:");
console.log(`   Partner number: ${partnerNumber}`);
console.log("");

client.initialize();
