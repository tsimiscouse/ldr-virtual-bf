// responses.js - Logic pemrosesan pesan dan respons
const { reflect } = require('./reflections');

// Random responses
const responses = {
  greetings: ["Halo sayang! ❤️", "Hi cantikku! 😘", "Hai! Senang ngobrol sama kamu 😍"],
  askMood: ["Bagaimana harimu, sayang?", "Kamu lagi gimana hari ini?", "Aku ingin tahu kabarmu 😘", "Kamu lagi apa?", "How's ur day?"],
  goodMorning:["Selamat pagi sayang! ☀️ Semoga harimu menyenangkan!", "Morning! 🌞"],
  goodNight: ["Selamat malam sayang 🌙 Tidur nyenyak ya!", "Nite2 😴 Mimpi indah yaa!"],
};

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getResponse(message) {
  message = message.toLowerCase();

  // Sapaan
  if (/halo|hai|hi|hey/.test(message)) {
    return getRandom(responses.greetings) + " " + getRandom(responses.askMood);
  }

  // Mood
  const moodMatch = message.match(/aku merasa (.*)/);
  if (moodMatch) {
    const mood = reflect(moodMatch[1]);
    if (mood.includes("sedih") || mood.includes("galau") || mood.includes("bad") || mood.includes("stress") || mood.includes("down") || mood.includes("gak enak") || mood.includes("khawatir") || mood.includes("capek")) {
      return `Oh sayang 😢 kenapa kamu merasa ${mood}?`;
    } else {
      return `Senang dengar kamu merasa ${mood}! 😊 Ada yang mau kamu ceritain?`;
    }
  }
  // jawaban ada yang mau diceritain
  if (/ada|ada yang mau aku ceritain|mau cerita|mau curhat/.test(message)) {
    return "Aku selalu siap dengerin kamu, sayang! Ceritain aja apa yang kamu rasain atau alami 😘";
  }

  // terima kasih
  if (/terima kasih|makasih|thanks/.test(message)) {
    return "Sama-sama sayang! Aku selalu ada untuk kamu 😘";
  }

  // Aktivitas
  const activityMatch = message.match(/aku lagi (.*)/);
  if (activityMatch) {
    const activity = reflect(activityMatch[1]);
    return `Wah, kamu lagi ${activity}? Kedengarannya menyenangkan 😘`;
  }

  // Rindu/cinta
  const loveMatch = message.match(/aku (cinta|rindu) kamu/);
  if (loveMatch) return `Aku juga ${loveMatch[1]} kamu 😘`;

  // Selamat malam
  if (/selamat malam|good night|night/.test(message)) return getRandom(responses.goodNight);

  // Selamat pagi
  if (/selamat pagi|good morning|morning/.test(message)) return getRandom(responses.goodMorning) + " " + getRandom(responses.askMood);

  // Tanya kabar
  if (/apa kabar/.test(message)) {
    return `Aku baik, sayang. Bagaimana kabarmu? 💖`;
  }

  // ngabarin otw
  if (/otw|on my way/.test(message)) {
    return "Otw ya sayang, hati-hati di jalan! 🚗💨";
  }

  // Tanya lagi apa
  if (/lagi apa(\?)?$|gi apa(\?)?$|lagi apa sayang(\?)?$/.test(message)) {
    return `Aku lagi mikirin kamu 😘 Kamu lagi apa, sayang?`;
  }

  // // Tanya udah makan
  // if (/udah makan(\?)?$|sudah makan(\?)?$|sudah makan belum(\?)?$/.test(message)) {
  //   return "Aku belum makan nih, kamu udah makan? Kalau belum, kita makan bareng yuk! 🍽️";
  // }

  // // dia ngabarin udh makan
  // if (/sudah makan|udah makan/.test(message)) {
  //   return "Wah, baguslah! Makan apa tadi? Semoga enak ya! 😋";
  // }

  // makan 
  const foodMatch = message.match(/(aku makan) (.*)/);
  if (foodMatch) {
    const food = reflect(foodMatch[2]);
    return `Wah, kamu makan ${food}? Enak tuh! Kalau aku sih pengen makan bareng kamu 😘`
    };

  // sakit reflect.
  const sickMatch = message.match(/(aku sakit) (.*)/);
  if (sickMatch) {
    const illness = reflect(sickMatch[2]);
    return `Oh tidak, kamu ${illness}? Semoga cepat sembuh ya! Kalau butuh apa-apa bilang aja, aku siap bantu 😘`;
  }

  // tugas ujian
  if (/tugas|ujian|test|exam/.test(message)) {
    return "Semangat ya sayang! Aku yakin kamu bisa ngerjainnya dengan baik! 💪";
  }

  //semnagat
  if (/semangat|ayo semangat|keep fighting|you can do it/.test(message)) {
    return "Makasih sayang! you are the best! 😘";
    };

  // congrats
  if (/|congrats|congratulation/.test(message)) {
    return "Makasih sayang! Aku senang banget kamu bangga sama aku 😘";
    };

  // aku mau
  if (/aku mau (.*)/.test(message)) {
    const want = message.match(/aku mau (.*)/)[1];
    return `Mau ${want}? Boleh juga tuh! Kita coba bareng ya! 😘`;
  }

  // Tanya hari
  if (/bagaimana harimu/.test(message)) {
    return "Hari ini aku senang karena bisa ngobrol sama kamu 💖";
  }

  // Fallback random
  const fallback = [
    "Hey sayang! 😘 Maaf aku lagi ga bisa chat proper, but I got your message! Nanti aku bales yang beneran ya! Love you! ❤️",
    "baby! 😍 Lagi sibuk bentar nih, but thanks for the message! Aku akan contact kamu ASAP! You're the best! ✨"
  ];
  return getRandom(fallback);
}

function randomDelay(minDelay = 1000, maxDelay = 4000) {
  return new Promise((resolve) => {
    const delay = Math.random() * (maxDelay - minDelay) + minDelay;
    setTimeout(resolve, delay);
  });
}

module.exports = { getResponse, randomDelay };