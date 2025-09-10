const { getResponse } = require("../responses");
const { randomDelay } = require("../responses.js");

describe("Mood Recognition Tests", () => {
  // Test for negative mood
  test("should provide a caring response for negative moods", () => {
    const negativeMoods = [
      "sedih",
      "anxious",
      "pusing",
      "galau",
      "bad",
      "stress",
      "down",
      "gak enak",
      "khawatir",
      "capek",
    ];
    negativeMoods.forEach((mood) => {
      const response = getResponse(`aku merasa ${mood}`);
      expect(response).toContain(`kenapa kamu ${mood}?`);
      expect(response).toMatch(
        /udah makan belum\?|ada tugas kah baby\?|hari ini mau ke mana\?/
      );
      expect(response).not.toContain("happy to hear");
    });
  });

  // Test for positive mood
  test("should provide a happy response for positive moods", () => {
    const positiveMoods = ["senang", "happy", "bahagia", "baik", "excited"];
    positiveMoods.forEach((mood) => {
      const response = getResponse(`aku merasa ${mood}`);
      expect(response).toContain(`happy to hear kalo kamu ngerasa ${mood}! 😊`);
      expect(response).toMatch(
        /udah makan belum\?|ada tugas kah baby\?|hari ini mau ke mana\?/
      );
      expect(response).not.toContain("kenapa kamu");
    });
  });
});

describe("Conversations Tests", () => {
  // Test 1: Complete conversation flow
  test("should handle a complete conversation flow", () => {
    const responses = [];

    // Greeting
    responses.push(getResponse("halo"));
    expect(responses[0]).toMatch(
      /halo sayang!|halo babyyyyy!|hi cantikku!|hi cayanggg!|hi my love :3/
    );

    // Good night
    responses.push(getResponse("selamat malam"));
    expect(responses[1]).toMatch(
      /selamat malam sayang ❤️ tidur nyenyak yaaa|goodnight babyy! sweet dreams yaaa sayang ❤️❤️|met boboo babyy, goodnighttt! ❤️❤️|goodnightt babyy 😴❤️ mimpiin akuu yaaa/
    );
  });

  // Test 2: Extended complete conversation flow - Morning to Night
  test("should handle extended morning to night conversation flow", () => {
    const responses = [];

    responses.push(getResponse("selamat pagi sayang"));
    expect(responses[0]).toMatch(
      /selamat pagi babyy! ☀️ have a lovely day! ❤️|morning babyyyy! 🌞|met pagiii babyyy! semangat yaa hari ini! 💪|pucuk ubi, pucuk talas, met pagii babyy, semangatt jangan malass! <3|good morning babyyy <3, have a great day!|good morning babyy, hari ini mau ngapain ajaaa\? jangan lupa kabarin aku yaa! 😘❤️❤️/
    );

    responses.push(getResponse("aku lagi nonton"));
    expect(responses[1]).toContain(
      "WAWWW, kamu lagi nonton? lagi nonton apa babyy? asikk betul"
    );

    responses.push(getResponse("aku mau berangkat kerja"));
    expect(responses[2]).toContain(
      "okeyy babyy, kamu mau berangkat kerja kapan?"
    );

    responses.push(getResponse("otw yaa"));
    expect(responses[3]).toContain(
      "mau kemana babyy?, hati-hati di jalan yaaa 😘"
    );

    responses.push(getResponse("lagi apa sayang?"));
    expect(responses[4]).toContain(
      "aku lagi mikirin kamu hehehe 😘 kamu lagi apa, sayang?"
    );

    responses.push(getResponse("aku cinta kamu"));
    expect(responses[5]).toMatch(
      /aku juga cinta kamu babyyy ❤️❤️|I love you too babyy|Sama, aku juga/
    );

    responses.push(getResponse("selamat malam sayang"));
    expect(responses[6]).toMatch(
      /selamat malam sayang ❤️ tidur nyenyak yaaa|goodnight babyy! sweet dreams yaaa sayang ❤️❤️|met boboo babyy, goodnighttt! ❤️❤️|goodnightt babyy 😴❤️ mimpiin akuu yaaa/
    );
  });

  // Test 3: Complete conversation flow - Relationship conflicts and resolution
  test("should handle relationship conflict resolution conversation flow", () => {
    const responses = [];

    responses.push(getResponse("hai"));
    expect(responses[0]).toMatch(
      /halo sayang!|halo babyyyyy!|hi cantikku!|hi cayanggg!|hi my love :3/
    );

    responses.push(getResponse("aku mau cerita"));
    expect(responses[1]).toContain(
      "ada apaa babyy?? ceritain aja kalo ada apa apaa"
    );

    responses.push(getResponse("aku rindu kamu"));
    expect(responses[2]).toMatch(
      /aku juga rindu kamu babyyy ❤️❤️|I love you too babyy|Sama, aku juga/
    );

    responses.push(getResponse("aku mau belajar"));
    expect(responses[3]).toContain("okeyy babyy, kamu mau belajar kapan?");

    responses.push(getResponse("aku pengen eskrim"));
    expect(responses[4]).toContain(
      "kamu pengen eskrim? bolehh nantii kita coba bareng yaaa babyy"
    );
  });

  // Test 4: Complete conversation flow - Health and care
  test("should handle complete health and care conversation flow", () => {
    const responses = [];

    responses.push(getResponse("apa kabar sayang?"));
    expect(responses[0]).toContain(
      "aku baik kokk babyy. kamu apa kabar? gimana hari ini?"
    );

    responses.push(getResponse("aku sakit flu"));
    expect(responses[1]).toContain("aaaa kamu sakit flu");
    expect(responses[1]).toContain("cepat sembuh ya babyy!");

    responses.push(getResponse("aku mau minum obat"));
    expect(responses[2]).toContain("okeyy babyy, kamu mau minum obat kapan?");

    responses.push(getResponse("aku mau istirahat"));
    expect(responses[3]).toContain("okeyy babyy, kamu mau istirahat kapan?");
  });

  // Test 5: Complete conversation flow - Food journey
  test("should handle complete food journey conversation flow", () => {
    const responses = [];

    // 1. Morning hunger
    responses.push(getResponse("aku lapar"));
    expect(responses[0]).toContain(
      "baby kamu lapar yaa? lagi pengen apa babyy?"
    );

    // 2. Breakfast inquiry
    responses.push(getResponse("udah sarapan?"));
    expect(responses[1]).toMatch(
      /haii babyy! 😘 maaf yaa baby aku lagi ga bisa chat proper|baby! 😍 lagi sibuk bentar nih/
    );

    // 3. Breakfast activity
    responses.push(getResponse("aku lagi sarapan roti"));
    expect(responses[2]).toContain(
      "kamu lagi sarapan roti? enak bangeett mauuuu!! met mamm yaa babyy, kabarin klo udahh selesai yaa"
    );

    // 4. Lunch together suggestion
    responses.push(getResponse("aku mau makan"));
    expect(responses[3]).toContain(
      "baby mau makan apa sayang? kalo mau ditemenin makan kabarin aja yaa babyy"
    );

    // 5. Eat preparation
    responses.push(getResponse("aku mau masak"));
    expect(responses[4]).toContain("okeyy babyy, kamu mau masak kapan?");

    // 6. Cooking activity
    responses.push(getResponse("aku lagi masak"));
    expect(responses[5]).toContain(
      "WAWWW, kamu lagi masak? lagi masak apa babyy? asikk betul"
    );
  });

  // Test 6: Complete conversation flow - Work and study support
  test("should handle complete work and study support conversation flow", () => {
    const responses = [];

    responses.push(getResponse("aku merasa stress sama tugas"));
    // Perbaiki baris ke-141
    expect(responses[0]).toMatch(
      /kenapa kamu stress sama tugas\?.*udah makan belum\?|kenapa kamu stress sama tugas\?.*ada tugas kah baby\?|kenapa kamu stress sama tugas\?.*hari ini mau ke mana\?/
    );

    responses.push(getResponse("deadline besok"));
    expect(responses[1]).toMatch(
      /haii babyy! 😘 maaf yaa baby aku lagi ga bisa chat proper|baby! 😍 lagi sibuk bentar nih/
    );

    responses.push(getResponse("aku ada ujian minggu depan"));
    expect(responses[2]).toContain(
      "semangat yaa sayang buat ujiannya! ❤️ aku yakin kamu bisa ngerjainnya insyaallah nilainya bagus aamiin 🤲"
    );
  });

  // Test 7: Complete conversation flow - Weekend relaxation
  test("should handle complete weekend relaxation conversation flow", () => {
    const responses = [];

    responses.push(getResponse("selamat pagi weekend!"));
    expect(responses[0]).toMatch(
      /selamat pagi babyy! ☀️ have a lovely day! ❤️|morning babyyyy! 🌞|met pagiii babyyy! semangat yaa hari ini! 💪|pucuk ubi, pucuk talas|good morning babyy|/
    );

    responses.push(getResponse("aku lagi nonton film"));
    expect(responses[1]).toContain(
      "WAWWW, kamu lagi nonton film apa? asikk betul"
    );

    responses.push(getResponse("aku lagi baca buku"));
    expect(responses[2]).toContain(
      "WAWWW, kamu lagi baca buku apa? asikk betul"
    );

    responses.push(getResponse("aku mau tidur siang"));
    expect(responses[3]).toContain(
      "baby mau tidur sekarang? oceyy babyy selamat bobo yaaa!! goodnight my love 😴❤️."
    );
  });

  // Test 8: Complete conversation flow - Deep emotional connection
  test("should handle complete deep emotional connection conversation flow", () => {
    const responses = [];

    responses.push(getResponse("hai sayang, aku kangen"));
    expect(responses[0]).toMatch(
      /halo sayang!|halo babyyyyy!|hi cantikku!|hi cayanggg!|hi my love :3/
    );

    responses.push(getResponse("aku rindu kamu banget"));
    expect(responses[1]).toMatch(
      /aku juga rindu kamu babyyy ❤️❤️|I love you too babyy|Sama, aku juga/
    );

    responses.push(getResponse("aku cinta kamu sepenuh hati"));
    expect(responses[2]).toMatch(
      /aku juga cinta kamu babyyy ❤️❤️|I love you too babyy|Sama, aku juga/
    );

    responses.push(getResponse("kamu yang terbaik"));
    expect(responses[3]).toMatch(
      /haii babyy! 😘 maaf yaa baby aku lagi ga bisa chat proper|baby! 😍 lagi sibuk bentar nih/
    );
  });

  // Test 9: Edge cases handling
  test("should handle edge cases gracefully", () => {
    // Empty string
    const emptyResponse = getResponse("");
    expect(emptyResponse).toBeDefined();
    expect(typeof emptyResponse).toBe("string");
    expect(emptyResponse.length).toBeGreaterThan(0);

    // Very long message
    const longMessage = "a".repeat(1000);
    const longResponse = getResponse(longMessage);
    expect(longResponse).toBeDefined();
    expect(typeof longResponse).toBe("string");
    expect(longResponse.length).toBeGreaterThan(0);

    // Special characters
    const specialResponse = getResponse("!@#$%^&*()");
    expect(specialResponse).toBeDefined();
    expect(typeof specialResponse).toBe("string");
    expect(specialResponse.length).toBeGreaterThan(0);
  });

  // Test 10: Response consistency
  test("should provide consistent response types", () => {
    const testCases = [
      "halo",
      "aku lagi belajar",
      "selamat pagi",
      "aku cinta kamu",
    ];

    testCases.forEach((testCase) => {
      const response = getResponse(testCase);
      expect(typeof response).toBe("string");
      expect(response.length).toBeGreaterThan(0);
    });
  });

  // Test 11: Specific pattern tests
  test("should handle specific response patterns correctly", () => {
    // Test thank you response
    const thankYouResponse = getResponse("makasih");
    expect(thankYouResponse).toBe("sama-sama babyy love youuu 😘❤️");

    // Test semangat response
    const semangatResponse = getResponse("semangat");
    expect(semangatResponse).toBe("maacii babyyy! love youuu so muchh! ❤️😘");

    // Test congrats response
    const congratsResponse = getResponse("congrats");
    expect(congratsResponse).toBe("maacii babyyy! love youuu so muchh! ❤️😘");

    // Test bagaimana hari response
    const hariResponse = getResponse("bagaimana harimu");
    expect(hariResponse).toBe(
      "seruuu babyy nanti aku ceritain yaa babyy, kamu gimana babyyy hari ini?"
    );
  });

  // Test 12: Food specific patterns
  test("should handle food-related messages correctly", () => {
    // Test eating activity
    const eatingResponse = getResponse("aku lagi makan nasi");
    expect(eatingResponse).toContain(
      "kamu lagi makan nasi? enak bangeett mauuuu!! met mamm yaa babyy"
    );

    // Test want to eat
    const wantEatResponse = getResponse("aku mau makan");
    expect(wantEatResponse).toContain(
      "baby mau makan apa sayang? kalo mau ditemenin makan kabarin aja yaa babyy"
    );
  });

  // Test 13: Sick patterns
  test("should handle sickness messages correctly", () => {
    const sickResponse = getResponse("aku sakit kepala");
    expect(sickResponse).toContain("aaaa kamu sakit kepala");
    expect(sickResponse).toContain("cepat sembuh ya babyy!");
  });

  // Test 14: Sleep patterns
  test("should handle sleep-related messages correctly", () => {
    const sleepResponse = getResponse("aku mau tidur");
    expect(sleepResponse).toContain(
      "baby mau tidur sekarang? oceyy babyy selamat bobo yaaa!! goodnight my love 😴❤️."
    );

    const boboResponse = getResponse("aku mau bobo");
    expect(boboResponse).toContain(
      "baby mau tidur sekarang? oceyy babyy selamat bobo yaaa!! goodnight my love 😴❤️."
    );
  });

  // Test 15: Assignment and exam patterns
  test("should handle assignment and exam messages correctly", () => {
    const tugasResponse = getResponse("aku ada tugas matematika");
    expect(tugasResponse).toContain(
      "ohh kamu ada tugas matematika? semangat yaa babyy ngerjainnya!"
    );

    const ujianResponse = getResponse("aku ada ujian besok");
    expect(ujianResponse).toContain(
      "semangat yaa sayang buat ujiannya! ❤️ aku yakin kamu bisa ngerjainnya"
    );

    const ngerjaninResponse = getResponse("aku lagi ngerjain tugas fisika");
    expect(ngerjaninResponse).toContain("semangat yaa babyy ngerjain tugas");
  });

  // Test 16: (aku lagi ngerjain tugas)
  test("should handle study-related messages correctly", () => {
    const tugasResponse = getResponse("aku lagi ngerjain tugas");
    expect(tugasResponse).toContain(
      "okeyy babyy semangatt, kamu lagi ngerjain tugas apa baby?"
    );
  });

  // Test 17: (aku lagi tidur)
  test("should handle sleeping-related messages correctly", () => {
    const tidurResponse = getResponse("aku lagi tidur");
    expect(tidurResponse).toContain(
      "ohh kamu lagi tidur? okeeyy babyy selamat bobo yaaa!! goodnight my love 😴❤️."
    );
  });

  // Test 18: (aku lagi makan)
  test("should handle eating-related messages correctly", () => {
    const makanResponse = getResponse("aku lagi makan");
    expect(makanResponse).toContain(
      "ohh kamu lagi makan? okeeyy babyy, selamat makan yaa!"
    );
  });

  // Test 19: (aku nanti naik sepeda)
  test("should handle future activity messages correctly", () => {
    const sepedaResponse = getResponse("aku nanti naik sepeda");
    expect(sepedaResponse).toContain(
      "okeyy babyy, kamu nanti naik sepeda? hati hatii yaa babyy, kabarin nanti kalo udah sampeee 😘"
    );
  });

  // Test 20: (aku mau ke kampus)
  test("should handle going to campus messages correctly", () => {
    const kampusResponse = getResponse("aku mau ke kampus");
    expect(kampusResponse).toContain(
      "oohh kamu mau ke kampus? naik apa babyy?"
    );
  });

  // Test 21: (aku udah kenyang)
  test("should handle being full messages correctly", () => {
    const kenyangResponse = getResponse("aku udah kenyang");
    expect(kenyangResponse).toContain(
      "ohh kamu udah kenyang? alhamdulillah, abis ini mau ngapain babyy?"
    );
  });

  // Test 22: (aku mau otw)
  test("should handle on the way messages correctly", () => {
    const otwResponse = getResponse("aku mau otw");
    expect(otwResponse).toContain(
      "baby mau otw kemana sayang? hati-hati di jalan yaaa 😘"
    );
  });

  // Test 23: (aku sakit)
  test("should handle being sick messages correctly", () => {
    const sakitResponse = getResponse("aku sakit");
    expect(sakitResponse).toContain("aaaa kamu sakit apa babyy? 🥺🥺");
  });

  // Test 24: (okey)
  test("should handle okay messages correctly", () => {
    const okeyResponse = getResponse("okey");
    expect(okeyResponse).toBe("okee babyy");
  });

  // Test 25: (aku nanti mau lari pagi)
  test("should handle future morning run messages correctly", () => {
    const lariResponse = getResponse("aku nanti mau lari pagi");
    expect(lariResponse).toContain(
      "WAHHH, kamu mau lari pagi? semangat yaa! aku temenin dari sini!"
    );
  });

  // Test 26: (aku nanti mau tidur siang)
  test("should handle future nap messages correctly", () => {
    const tidurSiangResponse = getResponse("aku nanti mau tidur siang");
    expect(tidurSiangResponse).toContain(
      "ohh kamu nanti mau tidur siang? okeeyy babyy selamat bobo yaaa!! 😴❤️"
    );
  });

  // Test 27: (aku nanti mau makan siang)
  test("should handle future lunch messages correctly", () => {
    const makanSiangResponse = getResponse("aku nanti mau makan siang");
    expect(makanSiangResponse).toContain(
      "ohh kamu nanti mau makan siang? okeeyy babyy, kabarin kalo udah mau makan yaa!"
    );
  });

  // Test 28: (aku nanti mau otw ke kampus)
  test("should handle future on the way to campus messages correctly", () => {
    const otwKampusResponse = getResponse("aku nanti mau otw ke kampus");
    expect(otwKampusResponse).toContain(
      "ohh kamu nanti mau otw ke kampus? naik apa babyy?"
    );
  });

  // Test 29: (aku ada tugas)
  test('should extract and use the detail for "ada tugas" messages', () => {
    const response = getResponse("aku ada tugas matematika");
    expect(response).toBe(
      "ohh kamu ada tugas matematika? semangat yaa babyy ngerjainnya! jangan lupa istirahat biar ndaa capek ❤️"
    );
  });

  // Test 30: (aku ada tugas)
  test('should handle "ada tugas" without a detail', () => {
    const response = getResponse("aku ada tugas");
    // Assuming a generic response for this case
    expect(response).toBe("ohh kamu ada tugas? tugas apa baby?");
  });

  // Test 31: (aku ada ujian)
  test('should extract and use the detail for "ada ujian" messages', () => {
    const response = getResponse("aku ada ujian");
    expect(response).toBe("ohh kamu ada ujian? ujian apa baby?");
  });

  // Test 32: (aku ngerjain ujian)
  test('should handle "ngerjain ujian" without a detail', () => {
    const response = getResponse("aku ngerjain ujian");
    expect(response).toBe(
      "okeeyy babyy semangat yaa sayang buat ujiannya! ❤️ aku yakin kamu bisa ngerjainnya insyaallah nilainya bagus aamiin 🤲"
    );
  });

  // Test 33: (aku lagi nugas)
  test('should handle "lagi nugas" without a detail', () => {
    const response = getResponse("aku lagi nugas");
    expect(response).toBe(
      "ohh kamu lagi nugas? semangat yaa babyy ngerjainnya! jangan lupa istirahat biar ndaa capek ❤️"
    );
  });
});

describe("Random Delay Function Tests", () => {
  // Additional Test: Random delay function
  test("should resolve after a random delay between min and max", async () => {
    const startTime = Date.now();
    await randomDelay(100, 200);
    const endTime = Date.now();
    const duration = endTime - startTime;

    expect(duration).toBeGreaterThanOrEqual(100);
    expect(duration).toBeLessThanOrEqual(200);
  });
});
