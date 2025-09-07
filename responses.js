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
  const lowerMessage = message.toLowerCase();

  // Determine the appropriate response word based on input
  let responseWord;
  if (lowerMessage.includes("cinta") || lowerMessage.includes("love")) {
    responseWord = "cinta";
  } else if (
    lowerMessage.includes("rindu") ||
    lowerMessage.includes("kangen")
  ) {
    responseWord = lowerMessage.includes("rindu") ? "rindu" : "kangen";
  } else if (lowerMessage.includes("sayang")) {
    responseWord = "sayang";
  } else {
    responseWord = "sayang"; // default
  }

  const responses = [
    `aku juga ${responseWord} kamu babyyy ❤️❤️`,
    `Sama, aku juga ${responseWord} kamu babyy`,
    "I love you too babyy!! more than words can say ❤️",
  ];

  const loveMatch = message.match(
    /(love|sayang|cinta|rindu|kangen) (you|kamu|u)/i
  );

  if (loveMatch) {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  return null;
}

function getResponse(message) {
  message = message.toLowerCase();

  // tugas ujian
  const probMatch = message.match(
    /(aku) (ada|ngerjain|lagi ngerjain) (tugas|ujian|test|exam) (.*)?/
  );
  if (probMatch) {
    const verb = probMatch[2];
    const problemType = probMatch[3];
    const detail = probMatch[4] ? probMatch[4].trim() : "";

    if (problemType === "tugas") {
      if (detail) {
        if (verb === "ada") {
          return `ohh kamu ada tugas ${detail}? semangat yaa babyy ngerjainnya! jangan lupa istirahat biar ndaa capek ❤️`;
        }
        if (verb === "ngerjain" || verb === "lagi ngerjain") {
          return `semangat yaa babyy ngerjain tugas ${detail}! kalo mau ditemenin kabarin yaa ❤️`;
        }
      } else {
        return "semangat yaa babyy ngerjain tugasnya! jangan lupa istirahat biar ndaa capek ❤️";
      }
    } else if (
      problemType === "ujian" ||
      problemType === "test" ||
      problemType === "exam"
    ) {
      return "semangat yaa sayang buat ujiannya! ❤️ aku yakin kamu bisa ngerjainnya insyaallah nilainya bagus aamiin 🤲";
    }
  }

  // aku naik
  const rideMatch = message.match(/(aku nanti naik|nanti naik|naik) (.*)/);
  if (rideMatch) {
    const verb = reflect(rideMatch[1]);
    const ride = rideMatch[2];
    return `okeyy babyy, ${verb} ${ride}? hati hatii yaa babyy, kabarin nanti kalo udah sampeee 😘`;
  }

  const whereMatch = message.match(/(aku) (mau ke|ke) (.*)/);
  if (whereMatch) {
    const pronoun = reflect(whereMatch[1]);
    const verb = reflect(whereMatch[2]);
    const place = reflect(whereMatch[3]);
    return `oohh ${pronoun} ${verb} ${place}? naik apa babyy?`;
  }

  // ada yang mau diceritain
  if (/(aku mau) (cerita|curhat|ngasih tau)/.test(message)) {
    return "ada apaa babyy?? ceritain aja kalo ada apa apaa, tapi aku ga janji bisa bales cepet yaa, soalnya aku lagi sibuk dikit 😅 nanti aku bales ASAP!";
  }

  const hungryMatch = message.match(
    /(aku) (lapar|laper|hungry|udah kenyang|udah makan)/
  );
  if (hungryMatch) {
    const pronoun = reflect(hungryMatch[1]);
    const feeling = hungryMatch[2];
    if (feeling === "hungry" || feeling === "lapar") {
      return `baby ${pronoun} ${feeling} yaa? lagi pengen apa babyy?`;
    } else {
      return `ohh ${pronoun} ${feeling}? alhamdulillah, abis ini mau ngapain babyy?`;
    }
  }

  // aku mau
  const wantMatch = message.match(/(aku) (mau|pengen) (.*)/);
  if (wantMatch) {
    const pronoun = reflect(wantMatch[1]);
    const verb = wantMatch[2];
    const want = wantMatch[3];

    // Kasus khusus untuk tidur atau bobo
    if (want.includes("tidur") || want.includes("bobo")) {
      return `baby mau tidur sekarang? oceyy babyy selamat bobo yaaa!! goodnight my love 😴❤️.`;
    }
    if (want.includes("makan") || want.includes("mam")) {
      return `baby mau makan apa sayang? kalo mau ditemenin makan kabarin aja yaa babyy`;
    }
    if (want.includes("otw") || want.includes("on my way")) {
      return `baby mau otw kemana sayang? hati-hati di jalan yaaa 😘`;
    }
    if (verb === "mau") {
      return `okeyy babyy, ${pronoun} ${verb} ${want} kapan?`;
    } else {
      return `${pronoun} ${verb} ${want}? bolehh nantii kita coba bareng yaaa babyy`;
    }
  }

  // makan reflect.
  const foodMatch = message.match(
    /(aku) (lagi makan|lagi mam|makan|mam|lagi sarapan|lagi dinner|lagi lunch|lagi brunch|saparan|dinner|brunch|lunch) (.*)/
  );
  if (foodMatch) {
    const pronoun = reflect(foodMatch[1]);
    const verb = reflect(foodMatch[2]);
    const food = reflect(foodMatch[3]);
    return `${pronoun} ${verb} ${food}? enak bangeett mauuuu!! met mamm yaa babyy, kabarin klo udahh selesai yaa`;
  }

  // sakit reflect.
  const sickMatch = message.match(/(aku) (sakit) (.*)/);
  if (sickMatch) {
    const pronoun = reflect(sickMatch[1]);
    const illness = reflect(sickMatch[2]);
    const detail = sickMatch[3] ? reflect(sickMatch[3]) : "";
    if (detail) {
      return `aaaa ${pronoun} ${illness} ${detail}? dari kapan baby? cepat sembuh ya babyy! kaloo butuh apa-apa bilang ajaa yaa 🥺🥺`;
    }
    return `aaaa ${pronoun} ${illness} dari kapan babyy? cepat sembuh ya babyy! kaloo butuh apa-apa bilang ajaa yaa 🥺🥺`;
  }

  // Mood
  const moodMatch = message.match(/(aku) (merasa|ngerasa) (.*)/);
  if (moodMatch) {
    const mood = moodMatch[3];

    // Opsi pertanyaan lanjutan
    const followUpQuestions = [
      "udah makan belum?",
      "ada tugas kah baby?",
      "hari ini mau ke mana?",
    ];

    const randomQuestion =
      followUpQuestions[Math.floor(Math.random() * followUpQuestions.length)];

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
      return `kenapa kamu ${mood}? maaf yaa tapi aku belum bisa dengerin cerita kamu sekarang, kamu ${randomQuestion}`;
    } else {
      return `happy to hear kalo kamu ngerasa ${mood}! 😊 nanti cerita ke aku yaa tapi aku belum bisa dengerin cerita kamu sekarang babyy, kamu ${randomQuestion}`;
    }
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
  const activityMatch = message.match(/(aku lagi) (.*)/);
  if (activityMatch) {
    const fullActivity = activityMatch[2];

    const parts = fullActivity.split(/\s+apa/);
    const activity = parts[0];
    const hasDetail = parts.length > 1;

    if (hasDetail) {
      return `WAWWW, kamu lagi ${fullActivity} apa? asikk betul`;
    } else {
      return `WAWWW, kamu lagi ${activity}? lagi ${activity} apa babyy? asikk betul`;
    }
  }

  //okee
  const okMatch = message.match(
    /(oke|ok|okey|okayy|okeeyy|sip|siap|yoi|yess)*/
  );
  if (okMatch && okMatch[0]) {
    return `okee babyy, noted!`;
  }

  // aku nanti mau
  const mauMatch = message.match(/aku (nanti mau) (.*)/);
  if (mauMatch) {
    const activity = reflect(mauMatch[2]);
    if (activity.includes("tidur") || activity.includes("bobo")) {
      return `ohh kamu nanti mau ${activity}? okeeyy babyy selamat bobo yaaa!! goodnight my love 😴❤️.`;
    }
    if (activity.includes("makan") || activity.includes("mam")) {
      return `ohh kamu nanti mau ${activity}? okeeyy babyy, kabarin kalo udah mau makan yaa!`;
    }
    if (activity.includes("otw") || activity.includes("on my way")) {
      return `ohh kamu nanti mau ${activity}? hati-hati di jalan yaaa 😘`;
    }
    return `WAHHH, kamu mau ${activity}? semangat yaa! aku temenin dari sini!`;
  }

  // Love things
  const loveResponse = getLoveResponse(message);
  if (loveResponse) {
    return loveResponse;
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
    return `aku baik kokk babyy. kamu apa kabar? gimana hari ini?`;
  }

  // ngabarin otw
  if (/otw|on my way/.test(message)) {
    return "mau kemana babyy?, hati-hati di jalan yaaa 😘";
  }

  // Tanya lagi apa
  if (
    /lagi apa(\?)?$|gi apa(\?)?$|lagi apa sayang(\?)?$|wyd(\?)?$|lagi ngapain(\?)?$/.test(
      message
    )
  ) {
    return `aku lagi mikirin kamu hehehe 😘 kamu lagi apa, sayang?`;
  }

  //semnagat
  if (/semangat|ayo semangat|keep fighting|you can do it/.test(message)) {
    return "maacii babyyy! love youuu so muchh! ❤️😘";
  }

  // congrats
  if (/congrats|congratulation/.test(message)) {
    return "maacii babyyy! love youuu so muchh! ❤️😘";
  }

  // Tanya hari
  if (/bagaimana harimu/.test(message)) {
    return "seruuu babyy nanti aku ceritain yaa babyy, kamu gimana babyyy hari ini?";
  }

  // Sapaan
  if (/halo|hai|hi|hey/.test(message)) {
    return getRandom(responses.greetings) + " " + getRandom(responses.askMood);
  }

  // Fallback random
  const fallback = [
    "haii babyy! 😘 maaf yaa baby aku lagi ga bisa chat proper, but I got your message! nanti aku bales yang beneran ya! love you babyy ❤️",
    "baby! 😍 lagi sibuk bentar nih, but thanks for the message! aku nntn bales kamu ASAP! You're the best! ✨",
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
