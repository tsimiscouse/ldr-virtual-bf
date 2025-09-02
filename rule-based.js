const REFLECTIONS = {
  aku: "kamu",
  saya: "kamu",
  kamu: "aku",
  mu: "ku",
  ku: "mu",
  i: "you",
  you: "i",
  my: "your",
  your: "my",
  mine: "yours",
  yours: "mine",
  me: "you",
};

function reflect(text) {
  let reflectedText = text.toLowerCase();

  // Aplikasikan reflections
  for (const [key, value] of Object.entries(REFLECTIONS)) {
    const regex = new RegExp(`\\b${key}\\b`, "gi");
    reflectedText = reflectedText.replace(regex, `__${value}__`);
  }

  // Replace placeholders back
  reflectedText = reflectedText.replace(/__([^_]+)__/g, "$1");

  return reflectedText;
}

const PATTERNS = [
  // Salam dan sapaan dengan variasi
  {
    regex:
      /^(?:(?:se(?:lamat\s+)?|g(?:ood\s+)?|h(?:i|ey|ello|alo))\s*)?(pagi|morning)$/i,
    responses: [
      "{greeting} sayang! 🥰 Maaf ya lagi ga bisa bales langsung, nanti aku chat kamu lagi ya!",
      "{greeting} my love! ❤️ Aku lagi sibuk bentar, tunggu aku ya~",
      "Heyy baby! 😘 {greeting} to you too! Miss you, nanti aku bales proper ya sayang!",
      "{greeting} sayang! ☀️🌙 Lagi ga bisa chat panjang, tapi aku sayang kamu!",
    ],
  },

  // Pertanyaan kegiatan dengan variasi bahasa
  {
    regex:
      /(?:(?:lagi|sedang|lg|sdg)\s*(?:ngapain|apa(?:an)?|doing)|(?:what(?:'s|\s+are|\s+is))?\s*(?:you\s+)?(?:doing|up)|(?:ngapain|apain)(?:\s+aja)?|how['']?s\s+it\s+going)\??/i,
    responses: [
      "Aku lagi gabisa bales kamu babyy. Nanti kalau udah selesai aku chat kamu lagi ya! 💕",
      "lagi sibuk bentar nih baby, but thinking of you! 🥰",
      "Lagi ada urusan, tapi abis ini aku langsung bales chat kamu yaa! 😘",
    ],
  },

  // Ungkapan kerinduan dengan variasi dan intensitas
  {
    regex:
      /(?:(?:aku|saya|i|me)\s*(?:kangen|rindu|miss|missing)\s*(?:kamu|lu|you)?\s*(?:banget|so much)?|kangen|rindu)/i,
    responses: [
      "Aku juga kangen banget sama kamu! 🥺💔 kenapa {reflected} baby?",
      "Awww aku juga kangen banget baby! 😭❤️ Virtual hug for you! 🤗 kenapa {reflected} baby?",
      "Missing you too, love! 💕 Can't wait to see you again! kenapa {reflected} baby?",
      "Aku juga kangen kamu baby! 🥺 Sabar ya sayang, we'll meet soon! kenapa {reflected} baby?",
    ],
  },

  // Ungkapan cinta dengan berbagai bentuk
  {
    regex:
      /(?:(?:aku|saya|i)?\s*(?:sayang|cinta|love|suka|❤️|♥️|💕|💘|💗|💓)(?:\s*(?:bgt|banget|sekali|very|so|much|parah))?\s*(?:(?:sama|with|ama|sm)\s*)?(?:kamu|you|lu|lo|u)|(?:i\s*)?(?:love|luv|wuv|❤️)\s*(?:u|you|ya?)(?:\s*(?:so|very|really|much|banget))?|(?:sayang|cinta|love)\s*(?:bgt|banget|much|very))(?:\s*[!?.,]*)?/i,
    responses: [
      "Aku juga sayang banget sama kamu! ❤️❤️ You mean the world to me!",
      "Love you too so much, baby! 😍💕",
      "Love you more babyy ❤️❤️",
      "I love you to the moon and back! 🌙⭐ Forever and always!",
    ],
  },

  // Ekspresi perasaan dengan reflection
  {
    regex:
      /(aku merasa|aku lagi|i feel|i am|gue lagi) (sedih|senang|lelah|capek|stress|bingung|takut|khawatir|nervous|sad|happy|tired|worried|scared|excited|lonely)/i,
    responses: [
      "Kenapa {reflected}? 🤔 Cerita dong sayang, aku pengen tau apa yang terjadi",
      "Oh no, {reflected}? 🥺 Aku wish I could hug you right now! Nanti kita talk about it ya",
      "Sayang, kalau kamu, please know that aku selalu ada buat kamu 💕 We'll get through this together!",
      "Aku pengen bantu kamu supaya ga {feeling} lagi 😔 Nanti kita video call ya, I wanna see your face",
    ],
  },

  // Pertanyaan tentang hubungan
  {
    regex: /(kamu masih sayang|do you still love|still love me)/i,
    responses: [
      " Tentu saja aku masih sayang sama kamu babyy! ❤️ Distance doesn't change my feelings at all!",
      "Of course I still love you babyy! 🥰 Nothing can change that, even time zones!",
      "Sayang, aku akan selalu cinta sama kamu babyy no matter what! 💕 Jangan pernah doubt that ya",
    ],
  },

  // Semangat dan motivasi
  {
    regex:
      /(aku capek|i'm\ tired|exhausted|burnout|stress|sulit|susah|hard|difficult)/i,
    responses: [
      "{reflected} yaa? Sayang, aku tau kamu lagi {emotion} banget 🥺 Tapi remember, kamu orang yang strong banget! Aku percaya sama kamu! 💪❤️",
      "{reflected} yaa? it's okay to feel {emotion} sometimes 😔 kamu udah kerja keras banget! Take some rest, I'm proud of you! 🌟",
      "{reflected} yaa? Aku wish I could be there to hug you right now 🤗 you've been amazing dan bisa through anything! Fighting! 💕✨",
      "{reflected} yaa? My love, ketika kamu merasa {emotion}, remember that aku selalu support kamu dari sini! 🥰 You got this!",
    ],
  },

  // Dukungan saat down
  {
    regex: /(aku sedih|i'm sad|bad day|hari buruk)/i,
    responses: [
      "{reflected} yaa? Aww sayang 🥺 Aku tau kamu lagi sedih ya... Virtual cuddles from me! 🤗💕 Nanti cerita sama aku ya apa yang bikin kamu down",
      "{reflected} yaa? My baby 😔 Aku pengen banget ada di sana buat kamu right now... you deserve all the happiness in the world! 🌈❤️",
      "{reflected} yaa? bad days happen tapi aku percaya tomorrow will be better untuk kamu 🌅 Aku always here for you, okay?",
      "{reflected} yaa? Sayang, ketika kamu sedih, aku juga ikut sedih 💔 But remember, you're not alone! I'm with you in spirit! 👫💕",
    ],
  },

  // Prestasi dan kebahagiaan
  {
    regex:
      /(aku seneng|aku +bahagia|i'm happy|excited|berhasil|success|achievement)/i,
    responses: [
      "Yeayyyy! 🎉 Aku ikut senang banget kalau kamu juga happy! Tell me more sayang! 🥰✨",
      "OMG that's amazing! 🌟 Aku proud banget sama kamu! you deserve semua kebahagiaan ini! 💕",
      "My love! 😍 Seeing you happy makes my day! Aku pengen celebrate with kamuuu! 🎊❤️",
      "Aww baby kamu seneng ya! 🥰 Aku juga jadi ikut happy nih! Can't wait to hear the details! 💕",
    ],
  },

  // Pertanyaan umum tentang hari
  {
    regex: /(gimana hari|how was your day|hari gimana|harimu)/i,
    responses: [
      "Aku lagi ga bisa cerita panjang nih sayang, tapi nanti aku update kamu ya! 😘 How about you? Harimu gimana?",
      "Today was okay, missing you as always! 🥰 Tapi nanti aku mau denger cerita harimu yang lebih detail ya!",
      "Aku pengen banget cerita sama kamu, tapi lagi sibuk bentar 😔 Nanti kita catch up ya sayang!",
    ],
  },

  // Mengajak ngobrol atau curhat
  {
    regex: /(mau cerita|pengen curhat|wanna talk|need to talk|butuh ngobrol)/i,
    responses: [
      "Of course sayang! 🥰 Aku mau denger cerita kamu! Tapi maaf ya kalau responsenya agak telat, nanti aku reply proper!",
      "Always ready to listen, my love! 💕 Cerita aja dulu, nanti aku baca dan respond ya! Aku always here for you",
      "Ayy curhat sama aku! 😊 Walaupun aku ga bisa langsung bales, but I'm all ears! Tell me everything sayang~",
    ],
  },

  // Keluhan tentang jarak
  {
    regex:
      /(jarak jauh|long distance|jauh banget|miss being together|pengen ketemu|kapan ketemu)/i,
    responses: [
      "Aku tau LDR itu susah banget sayang 😔 But our love is stronger than distance! 💪❤️ Soon we'll be together again!",
      "Distance sucks, but you and me? We're meant to be! 🌍💕 Just a little longer, my love!",
      "Aku juga pengen banget ketemu kamuuu 🥺 tenang aja aku bakal selalu ada buat kamu even from far away! 💕",
    ],
  },

  // Pertanyaan tentang makan
  {
    regex:
      /(udah makan|have you eaten|makan apa|what did you eat|lunch|dinner|breakfast)/i,
    responses: [
      "Aku lagi ga bisa update tentang makan nih, tapi thanks for caring sayang! 🥰 kamu jangan lupa makan ya!",
      "Aww you always take care of me! 😘 Make sure kamu juga makan yang proper ya, health is important!",
      "Sweet of you to ask! 💕 Nanti aku update ya, but please make sure you also eat well!",
    ],
  },

  // Dukungan akademik/kerja
  {
    regex:
      /(ujian|test|exam|kerja|work|project|tugas|assignment|deadline|busy)/i,
    responses: [
      "Good luck dengan {activity} nya sayang! 💪✨ Aku percaya kamu bisa handle it! Fighting!",
      "Semangat untuk {activity}! 🌟 {reflected} amazing dan pasti bisa! Aku support kamu dari sini! ❤️",
      "Hey fighter! 💪 Aku tau {reflected} bisa crush that {activity}! Don't forget to take breaks ya sayang! 😘",
      "My hardworking baby! 🥰 kamu selalu bisa overcome challenges! I believe in you so much! 💕",
    ],
  },

  // Expressing worry tentang partner
  {
    regex: /(aku khawatir|worried about|takut|scared|anxiety|cemas)/i,
    responses: [
      "kenapa {reflected} baby? breathe dulu ya 🫁💕 Aku tau kamu khawatir, but everything will be okay! Aku ada di sini buat kamu",
      "kenapa {reflected} baby? My love, whenever you worried, remember that we're in this together 👫💪 Distance can't break us!",
      "Sayang jangan terlalu khawatir ya 🥺 {reflected} strong dan aku akan selalu support {reflected} no matter what! ❤️",
      "It's normal to feel worried sometimes 😔 But {reflected} got this! And {reflected} got me! Always! 💕",
    ],
  },

  // Apologies atau maaf
  {
    regex: /(maaf|sorry|apologize|my bad|salah)/i,
    responses: [
      "Kenapa {reflected} sayang? 🥰 kamu ga salah apa-apa kok! I love you just the way you are! 💕",
      "Kenapa {reflected} sayang? No need to say sorry, baby! 😘 you are perfect! Aku yang harusnya minta maaf kalau telat bales 😔",
      "Kenapa {reflected} sayang? you don't need to apologize my love! 💕 you're doing great! Sometimes things just happen, it's okay!",
    ],
  },

  // Sleep atau tidur
  {
    regex: /(ngantuk|sleepy|mau tidur|going to sleep|good night|tired|lelah)/i,
    responses: [
      "{reflected}?, 😴 Sleep tight my love! Dream of me! 💕 Good night sayang~",
      "{reflected}?, Rest well, my beautiful! 🌙✨ kamu butuh good sleep! Sweet dreams and I love you! 😘",
      "{reflected}?, Tidur yang nyenyak ya sayang! 💤 I will be dreaming of you too! Good night baby! ❤️",
    ],
  },

  // Ekspresi bangun atau selamat pagi
  {
    regex:
      /(?:(?:aku|saya)\s*)?(?:udah|sudah)?\s*(?:b\s*a\s*n\s*g\s*u\s*n|bangun)|(?:se(?:lamat\s+)?|good\s+)?pagi|(?:good\s+)?morning/i,
    responses: [
      "Baby {reflected}? Pagi, sayangku! ☀️ Aku berharap kamu tidur nyenyak. Have a beautiful day ahead! 🥰",
      "Baby {reflected}? Morning, love! 🌅 So glad to see you up already! Hope you had sweet dreams about me! 😉💕",
      "Baby {reflected}? Good Morning, my love! ✨😘",
    ],
  },

  {
    regex:
      /(?:aku|saya)?\s*(?:lapar|laper|hungry|butuh\s+makanan|pengen\s+makan|craving)\b/i,
    responses: [
      "Baby, {reflected}? 🥺 Udah jam segini, jangan tunda makan ya sayang. Aku mau kamu sehat terus. ❤️",
      "Baby, {reflected}? 😋 Aku wish I could cook for you! Makan yang banyak ya, my love! 💕",
      "Baby, {reflected}? 😔 Makan dulu ya sayang, biar {reflected} nggak sakit. Nanti kalau udah kenyang chat aku lagi ya! 🥰",
      "Baby, {reflected}? 🍽️ Makan dulu baby! Kamu udah kerja keras, you deserve it! 😘",
    ],
  },

  // Time zone complaints
  {
    regex: /(beda waktu|time difference|time zone|timezone|waktu|time)/i,
    responses: [
      "Iya nih time difference bikin susah ya 😔 But hey, love transcends time zones! 🌍💕 We make it work somehow! Fighting!",
      "Time zones are our biggest enemy! 😤 Tapi cinta kita lebih kuat dari 6 hours difference! 💪❤️",
      "Stupid time zones! 🙄 But {reflected} worth waiting for, no matter what time it is! 🕐💕 I love you around the clock!",
    ],
  },
];

// Responses khusus berdasarkan waktu
function getTimeBasedResponse() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return [
      "Pagi sayang! ☀️ Maaf ya aku baru bangun/lagi sibuk pagi ini! Hope {reflected} having a great morning! 🥰",
      "Good morning my love! 🌅 Sorry for the delayed response, but thinking of {reflected} already! 💕",
    ];
  } else if (hour >= 12 && hour < 17) {
    return [
      "Afternoon baby! 🌞 Lagi sibuk siang ini, tapi aku miss {reflected}! Hope {reflected} lunch was good! 😘",
      "Siang sayang! ☀️ Sorry late reply, but {reflected} always on my mind! 💭❤️",
    ];
  } else if (hour >= 17 && hour < 22) {
    return [
      "Evening love! 🌆 Maaf baru bisa bales, tapi aku kangen {reflected}! How was {reflected} day? 🥰",
      "Sore sayang! 🌇 Been thinking about {reflected} all day! Sorry for being MIA! 😘💕",
    ];
  } else {
    return [
      "Late night message! 🌙 Aku lagi istirahat/tidur, tapi aku sayang {reflected}! Sweet dreams if {reflected} sleeping too! 😴💕",
      "Midnight thoughts of {reflected}! 🌟 Sorry kalau ga langsung bales, but love {reflected} always! Good night! 😘",
    ];
  }
}

// Enhanced default responses
const DEFAULT_RESPONSES = [
  "Hey sayang! 😘 Maaf aku lagi ga bisa chat proper, but I got your message! Nanti aku bales yang beneran ya! Love you! ❤️",
  "My love! 🥰 Currently unavailable tapi aku baca pesanmu! you so sweet for texting me! Miss you! 💕",
  "baby! 😍 Lagi sibuk bentar nih, but thanks for the message! Aku akan contact kamu ASAP! You're the best! ✨",
  "Hi love! 🌟 Getting your message makes my day even when I can't respond immediately! Back to {reflected} soon! ❤️",
];

// Function untuk process message dengan enhanced reflection
function processMessage(message, userName = "sayang") {
  const lowerMessage = message.toLowerCase().trim();

  // Cek setiap pattern
  for (const pattern of PATTERNS) {
    const match = lowerMessage.match(pattern.regex);
    if (match) {
      // Pilih random response
      const response =
        pattern.responses[Math.floor(Math.random() * pattern.responses.length)];

      // Replace placeholders
      let finalResponse = response;

      // Replace {reflected} dengan reflection of message atau nama
      if (finalResponse.includes("{reflected}")) {
        const reflected = reflect(message) || userName;
        finalResponse = finalResponse.replace(/{reflected}/g, reflected);
      }

      // Replace {X} dengan captured groups atau reflections
      if (match[1] && finalResponse.includes("{X}")) {
        finalResponse = finalResponse.replace(/{X}/g, reflect(match[1]));
      }

      // Replace {feeling} untuk emotional states
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

  // Jika tidak ada pattern yang match, gunakan time-based response atau default
  const timeResponses = getTimeBasedResponse();
  const allDefaults = [...DEFAULT_RESPONSES, ...timeResponses];
  let response = allDefaults[Math.floor(Math.random() * allDefaults.length)];

  // Apply reflection to default response
  response = response.replace(/{reflected}/g, reflect(message) || userName);

  return response;
}

module.exports = {
  PATTERNS,
  DEFAULT_RESPONSES,
  REFLECTIONS,
  reflect,
  processMessage,
  getTimeBasedResponse,
};
