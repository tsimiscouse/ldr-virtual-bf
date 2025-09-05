const { reflect } = require("./reflections");

// Random responses
const responses = {
  greetings: [
    "halo sayang!",
    "halo babyyyyy!",
    "hi cantikku!",
    "hi cayanggg!",
    "hi my love :3",
  ],
  askMood: [
    "gimana hari inii sayang?",
    "kamu gimana hari ini?",
    "kamu aman kah babyy hari ini?",
    "kamu lagi apaahh?",
    "how's ur day babyy?",
  ],
  goodMorning: [
    "selamat pagi babyy! ☀️ have a lovely day! ❤️",
    "morning babyyyy! 🌞",
    "met pagiii babyyy! semangat yaa hari ini! 💪",
    "pucuk ubi, pucuk talas, met pagii babyy, semangatt jangan malass! <3",
    "good morning babyyy <3, have a great day!",
    "good morning babyy, hari ini mau ngapain ajaaa? jangan lupa kabarin aku yaa! 😘❤️❤️",
  ],
  goodNight: [
    "selamat malam sayang ❤️ tidur nyenyak yaaa",
    "goodnight babyy! sweet dreams yaaa sayang ❤️❤️",
    "met boboo babyy, goodnighttt! ❤️❤️",
    "goodnightt babyy 😴❤️ mimpiin akuu yaaa",
  ],
};

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// love things
function getLoveResponse(message) {
  // random words for response
  const responses = [
    `Aku juga ${
      message.toLowerCase().includes("sayang") ||
      message.toLowerCase().includes("cinta") 
      ? "cinta" : "sayang"
    } kamu babyyy ❤️❤️`,
    `Sama, aku juga ${
      message.toLowerCase().includes("rindu") ||
      message.toLowerCase().includes("kangen")
        ? "rindu"
        : "kangen"
    } kamu babyy`,
    "I love you too babyy!! more than words can say ❤️",
  ];
  const loveMatch = message.match(
    /(aku|i) (love|sayang|cinta|rindu|kangen) (you|kamu|u)/i
  );

  if (loveMatch) {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  return null;
}

function getResponse(message) {
  message = message.toLowerCase();

  // Mood
  const moodMatch = message.match(/aku (merasa|ngerasa|lagi merasa|lagi ngerasa|gi ngerasa) (.*)/);
  if (moodMatch) {
    const mood = reflect(moodMatch[1]);
    if (
      mood.includes("sedih") ||
      mood.includes("anxious") ||
      mood.includes("pusing") ||
      mood.includes("galau") ||
      mood.includes("bad") ||
      mood.includes("stress") ||
      mood.includes("down") ||
      mood.includes("gak enak") ||
      mood.includes("khawatir") ||
      mood.includes("capek")
    ) {
      return `babyy 😞 kenapaa kamuu ${mood}?`;
    } else {
      return `happy to hear that babyy kalo kamu ngerasa ${mood}! 😊 ada yang mau kamu ceritain ke akuu ndaa?`;
    }
  }
  // jawaban ada yang mau diceritain
  if (/ada yang mau aku ceritain|mau cerita|mau curhat/.test(message)) {
    return "apaa babyy?? aku bakal seneng kalo kamu mau ceritaa! ceritain aja apa yang kamu rasain atau alamin 😘";
  }

  // terima kasih
  if (
    /maaci|makasi|thakies|thx|thank you|terima kasih|makasih|thanks/.test(
      message
    )
  ) {
    return "sama-sama babyy love youuu 😘❤️";
  }

  // Aktivitas
  const activityMatch = message.match(/aku lagi (.*)/);
  if (activityMatch) {
    const activity = reflect(activityMatch[1]);
    return `WAWWW, kamu lagi ${activity}? asikk betul`;
  }

  // aku nanti mau
  const mauMatch = message.match(/aku (nanti mau) (.*)/);
  if (mauMatch) {
    const activity = reflect(mauMatch[2]);
    return `WAHHH, kamu mau ${activity}? semangat yaa! aku temenin dari sini!`;
  }

  // Love things
  const loveResponse = getLoveResponse(message);
  if (loveResponse) {
    return loveResponse;
  }

  // makan reflect.
  const foodMatch = message.match(/aku (mau makan|lagi makan|mam dulu) (.*)/);
  if (foodMatch) {
    const food = reflect(foodMatch[2]);
    return `${food}? enak bangeett mauuuu!! met mamm yaa babyy`;
  }

  // Selamat malam
  if (/selamat malam|good night|night/.test(message))
    return getRandom(responses.goodNight);

  // Selamat pagi
  if (/selamat pagi|good morning|morning/.test(message))
    return (
      getRandom(responses.goodMorning) + " " + getRandom(responses.askMood)
    );

  // Tanya kabar
  if (/apa kabar/.test(message)) {
    return `Aku baik, sayang. Bagaimana kabarmu? 💖`;
  }

  // ngabarin otw
  if (/otw|on my way/.test(message)) {
    return "Otw ya sayang, hati-hati di jalan! 🚗💨. Kamu naik apa?";
  }

  // aku naik
  const rideMatch = message.match(/(aku) (nanti naik|naik) (.*)/);
  if (rideMatch) {
    const pronoun = reflect(rideMatch[1]);
    const verb = reflect(rideMatch[2]);
    const ride = reflect(rideMatch[3]);
    return `okeyy, ${pronoun} ${verb} ${ride}? hati hatii yaa babyy, kabarin nanti kalo udah sampeee 😘`;
  }

  // Tanya lagi apa
  if (/lagi apa(\?)?$|gi apa(\?)?$|lagi apa sayang(\?)?$/.test(message)) {
    return `Aku lagi mikirin kamu 😘 Kamu lagi apa, sayang?`;
  }

  // sakit reflect.
  const sickMatch = message.match(/(aku sakit) (.*)/);
  if (sickMatch) {
    const illness = reflect(sickMatch[2]);
    return `Oh tidak, kamu ${illness} dari kapan? Semoga cepat sembuh ya! Kalau butuh apa-apa bilang aja, aku siap bantu 😘`;
  }

  // tugas ujian
  if (/tugas|ujian|test|exam/.test(message)) {
    return "Semangat ya sayang! Aku yakin kamu bisa ngerjainnya dengan baik! 💪";
  }

  //semnagat
  if (/semangat|ayo semangat|keep fighting|you can do it/.test(message)) {
    return "Makasih sayang! you are the best! 😘";
  }

  // congrats
  if (/congrats|congratulation/.test(message)) {
    return "Makasih sayang! Aku senang banget kamu bangga sama aku 😘";
  }

  // aku mau
  if (/aku mau (.*)/.test(message)) {
    const want = message.match(/aku mau (.*)/)[1];
    return `Mau ${want}? Boleh juga tuh! Kita coba bareng ya! 😘`;
  }

  // Tanya hari
  if (/bagaimana harimu/.test(message)) {
    return "Hari ini aku senang karena bisa ngobrol sama kamu 💖. Kamu gimana?";
  }

  // Sapaan
  if (/halo|hai|hi|hey/.test(message)) {
    return getRandom(responses.greetings) + " " + getRandom(responses.askMood);
  }

  // Fallback random
  const fallback = [
    "Hey sayang! 😘 Maaf aku lagi ga bisa chat proper, but I got your message! Nanti aku bales yang beneran ya! Love you! ❤️",
    "baby! 😍 Lagi sibuk bentar nih, but thanks for the message! Aku akan contact kamu ASAP! You're the best! ✨",
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
