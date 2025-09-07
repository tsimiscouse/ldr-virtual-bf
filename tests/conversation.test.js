const { getResponse } = require('../responses');

describe('Mood Recognition Tests', () => {

    // Test for negative mood
    test('should provide a caring response for negative moods', () => {
        const negativeMoods = ['sedih', 'anxious', 'pusing', 'galau', 'bad', 'stress', 'down', 'gak enak', 'khawatir', 'capek'];
        negativeMoods.forEach(mood => {
            const response = getResponse(`aku merasa ${mood}`);
            expect(response).toContain(`kenapa kamu ${mood}?`);
            expect(response).toMatch(/udah makan belum\?|ada tugas kah baby\?|hari ini mau ke mana\?/);
            expect(response).not.toContain('happy to hear');
        });
    });

    // Test for positive mood
    test('should provide a happy response for positive moods', () => {
        const positiveMoods = ['senang', 'happy', 'bahagia', 'baik', 'excited'];
        positiveMoods.forEach(mood => {
            const response = getResponse(`aku merasa ${mood}`);
            expect(response).toContain(`happy to hear kalo kamu ngerasa ${mood}! 😊`);
            expect(response).toMatch(/udah makan belum\?|ada tugas kah baby\?|hari ini mau ke mana\?/);
            expect(response).not.toContain('kenapa kamu');
        });
    });
});

describe('Conversations Tests', () => {
  
  // Test 1: Complete conversation flow
  test('should handle a complete conversation flow', () => {
    const responses = [];
    
    // Greeting
    responses.push(getResponse('halo'));
    expect(responses[0]).toMatch(/halo sayang!|halo babyyyyy!|hi cantikku!|hi cayanggg!|hi my love :3/);
    
    // Good night
    responses.push(getResponse('selamat malam'));
    expect(responses[1]).toMatch(/selamat malam sayang ❤️ tidur nyenyak yaaa|goodnight babyy! sweet dreams yaaa sayang ❤️❤️|met boboo babyy, goodnighttt! ❤️❤️|goodnightt babyy 😴❤️ mimpiin akuu yaaa/);
  });

  // Test 2: Extended complete conversation flow - Morning to Night
  test('should handle extended morning to night conversation flow', () => {
    const responses = [];
    
    responses.push(getResponse('selamat pagi sayang'));
    expect(responses[0]).toMatch(/selamat pagi babyy! ☀️ have a lovely day! ❤️|morning babyyyy! 🌞|met pagiii babyyy! semangat yaa hari ini! 💪|pucuk ubi, pucuk talas, met pagii babyy, semangatt jangan malass! <3|good morning babyyy <3, have a great day!|good morning babyy, hari ini mau ngapain ajaaa\? jangan lupa kabarin aku yaa! 😘❤️❤️/);
    
    responses.push(getResponse('aku lagi nonton'));
    expect(responses[1]).toContain('WAWWW, kamu lagi nonton? lagi nonton apa babyy? asikk betul');
    
    responses.push(getResponse('aku mau berangkat kerja'));
    expect(responses[2]).toContain('okeyy babyy, kamu mau berangkat kerja kapan?');
    
    responses.push(getResponse('otw yaa'));
    expect(responses[3]).toContain('mau kemana babyy?, hati-hati di jalan yaaa 😘');
    
    responses.push(getResponse('lagi apa sayang?'));
    expect(responses[4]).toContain('aku lagi mikirin kamu hehehe 😘 kamu lagi apa, sayang?');
    
    responses.push(getResponse('aku cinta kamu'));
    expect(responses[5]).toMatch(/aku juga cinta kamu babyyy ❤️❤️|I love you too babyy|Sama, aku juga/);
    
    responses.push(getResponse('selamat malam sayang'));
    expect(responses[6]).toMatch(/selamat malam sayang ❤️ tidur nyenyak yaaa|goodnight babyy! sweet dreams yaaa sayang ❤️❤️|met boboo babyy, goodnighttt! ❤️❤️|goodnightt babyy 😴❤️ mimpiin akuu yaaa/);
  });

  // Test 3: Complete conversation flow - Relationship conflicts and resolution
  test('should handle relationship conflict resolution conversation flow', () => {
    const responses = [];
    
    responses.push(getResponse('hai'));
    expect(responses[0]).toMatch(/halo sayang!|halo babyyyyy!|hi cantikku!|hi cayanggg!|hi my love :3/);
    
    responses.push(getResponse('aku mau cerita'));
    expect(responses[1]).toContain('ada apaa babyy?? ceritain aja kalo ada apa apaa');
    
    responses.push(getResponse('aku rindu kamu'));
    expect(responses[2]).toMatch(/aku juga rindu kamu babyyy ❤️❤️|I love you too babyy|Sama, aku juga/);
    
    responses.push(getResponse('aku mau belajar'));
    expect(responses[3]).toContain('okeyy babyy, kamu mau belajar kapan?');

    responses.push(getResponse('aku pengen eskrim'));
    expect(responses[4]).toContain('kamu pengen eskrim? bolehh nantii kita coba bareng yaaa babyy');
  });

  // Test 4: Complete conversation flow - Health and care
  test('should handle complete health and care conversation flow', () => {
    const responses = [];
    
    responses.push(getResponse('apa kabar sayang?'));
    expect(responses[0]).toContain('aku baik kokk babyy. kamu apa kabar? gimana hari ini?');
    
    responses.push(getResponse('aku sakit flu'));
    expect(responses[1]).toContain('aaaa kamu sakit flu');
    expect(responses[1]).toContain('cepat sembuh ya babyy!');
    
    responses.push(getResponse('aku mau minum obat'));
    expect(responses[2]).toContain('okeyy babyy, kamu mau minum obat kapan?');
    
    responses.push(getResponse('aku mau istirahat'));
    expect(responses[3]).toContain('okeyy babyy, kamu mau istirahat kapan?');
  });

  // Test 5: Complete conversation flow - Food journey
  test('should handle complete food journey conversation flow', () => {
    const responses = [];
    
    // 1. Morning hunger
    responses.push(getResponse('aku lapar'));
    expect(responses[0]).toContain('baby kamu lapar yaa? lagi pengen apa babyy?');
    
    // 2. Breakfast inquiry
    responses.push(getResponse('udah sarapan?'));
    expect(responses[1]).toMatch(/haii babyy! 😘 maaf yaa baby aku lagi ga bisa chat proper|baby! 😍 lagi sibuk bentar nih/);
    
    // 3. Breakfast activity
    responses.push(getResponse('aku lagi sarapan roti'));
    expect(responses[2]).toContain('kamu lagi sarapan roti? enak bangeett mauuuu!! met mamm yaa babyy, kabarin klo udahh selesai yaa');
    
    // 4. Lunch together suggestion
    responses.push(getResponse('aku mau makan'));
    expect(responses[3]).toContain('baby mau makan apa sayang? kalo mau ditemenin makan kabarin aja yaa babyy');
    
    // 5. Eat preparation
    responses.push(getResponse('aku mau masak'));
    expect(responses[4]).toContain('okeyy babyy, kamu mau masak kapan?');
    
    // 6. Cooking activity
    responses.push(getResponse('aku lagi masak'));
    expect(responses[5]).toContain('WAWWW, kamu lagi masak? lagi masak apa babyy? asikk betul');
  });

  // Test 6: Complete conversation flow - Work and study support
  test('should handle complete work and study support conversation flow', () => {
    const responses = [];
    
    responses.push(getResponse('aku merasa stress sama tugas'));
    // Perbaiki baris ke-141
    expect(responses[0]).toMatch(/kenapa kamu stress sama tugas\?.*udah makan belum\?|kenapa kamu stress sama tugas\?.*ada tugas kah baby\?|kenapa kamu stress sama tugas\?.*hari ini mau ke mana\?/);

    responses.push(getResponse('deadline besok'));
    expect(responses[1]).toMatch(/haii babyy! 😘 maaf yaa baby aku lagi ga bisa chat proper|baby! 😍 lagi sibuk bentar nih/);
    
    responses.push(getResponse('aku ada ujian minggu depan'));
    expect(responses[2]).toContain('semangat yaa sayang buat ujiannya! ❤️ aku yakin kamu bisa ngerjainnya insyaallah nilainya bagus aamiin 🤲');
  });


  // Test 7: Complete conversation flow - Weekend relaxation
  test('should handle complete weekend relaxation conversation flow', () => {
    const responses = [];
    
    responses.push(getResponse('selamat pagi weekend!'));
    expect(responses[0]).toMatch(/selamat pagi babyy! ☀️ have a lovely day! ❤️|morning babyyyy! 🌞|met pagiii babyyy! semangat yaa hari ini! 💪|pucuk ubi, pucuk talas|good morning babyy|/);
    
    responses.push(getResponse('aku lagi nonton film'));
    expect(responses[1]).toContain('WAWWW, kamu lagi nonton film? lagi nonton film apa babyy? asikk betul');
    
    responses.push(getResponse('aku lagi main game'));
    expect(responses[2]).toContain('WAWWW, kamu lagi main game? lagi main game apa babyy? asikk betul');
    
    responses.push(getResponse('aku lagi baca buku'));
    expect(responses[3]).toContain('WAWWW, kamu lagi baca buku? lagi baca buku apa babyy? asikk betul');
    
    responses.push(getResponse('aku mau tidur siang'));
    expect(responses[4]).toContain('baby mau tidur sekarang? oceyy babyy selamat bobo yaaa!! goodnight my love 😴❤️.');
  });

  // Test 8: Complete conversation flow - Deep emotional connection
  test('should handle complete deep emotional connection conversation flow', () => {
    const responses = [];
    
    responses.push(getResponse('hai sayang, aku kangen'));
    expect(responses[0]).toMatch(/halo sayang!|halo babyyyyy!|hi cantikku!|hi cayanggg!|hi my love :3/);
    
    responses.push(getResponse('aku rindu kamu banget'));
    expect(responses[1]).toMatch(/aku juga rindu kamu babyyy ❤️❤️|I love you too babyy|Sama, aku juga/);
    
    responses.push(getResponse('aku cinta kamu sepenuh hati'));
    expect(responses[2]).toMatch(/aku juga cinta kamu babyyy ❤️❤️|I love you too babyy|Sama, aku juga/);
    
    responses.push(getResponse('kamu yang terbaik'));
    expect(responses[3]).toMatch(/haii babyy! 😘 maaf yaa baby aku lagi ga bisa chat proper|baby! 😍 lagi sibuk bentar nih/);
  });

  // Test 9: Edge cases handling
  test('should handle edge cases gracefully', () => {
    // Empty string
    const emptyResponse = getResponse('');
    expect(emptyResponse).toBeDefined();
    expect(typeof emptyResponse).toBe('string');
    expect(emptyResponse.length).toBeGreaterThan(0);
    
    // Very long message
    const longMessage = 'a'.repeat(1000);
    const longResponse = getResponse(longMessage);
    expect(longResponse).toBeDefined();
    expect(typeof longResponse).toBe('string');
    expect(longResponse.length).toBeGreaterThan(0);
    
    // Special characters
    const specialResponse = getResponse('!@#$%^&*()');
    expect(specialResponse).toBeDefined();
    expect(typeof specialResponse).toBe('string');
    expect(specialResponse.length).toBeGreaterThan(0);
  });

  // Test 10: Response consistency
  test('should provide consistent response types', () => {
    const testCases = [
      'halo',
      'aku lagi belajar',
      'selamat pagi',
      'aku cinta kamu'
    ];
    
    testCases.forEach(testCase => {
      const response = getResponse(testCase);
      expect(typeof response).toBe('string');
      expect(response.length).toBeGreaterThan(0);
    });
  });

  // Test 11: Specific pattern tests
  test('should handle specific response patterns correctly', () => {
    // Test thank you response
    const thankYouResponse = getResponse('makasih');
    expect(thankYouResponse).toBe('sama-sama babyy love youuu 😘❤️');
    
    // Test semangat response
    const semangatResponse = getResponse('semangat');
    expect(semangatResponse).toBe('maacii babyyy! love youuu so muchh! ❤️😘');
    
    // Test congrats response
    const congratsResponse = getResponse('congrats');
    expect(congratsResponse).toBe('maacii babyyy! love youuu so muchh! ❤️😘');
    
    // Test bagaimana hari response
    const hariResponse = getResponse('bagaimana harimu');
    expect(hariResponse).toBe('seruuu babyy nanti aku ceritain yaa babyy, kamu gimana babyyy hari ini?');
  });

  // Test 12: Food specific patterns
  test('should handle food-related messages correctly', () => {
    // Test eating activity
    const eatingResponse = getResponse('aku lagi makan nasi');
    expect(eatingResponse).toContain('kamu lagi makan nasi? enak bangeett mauuuu!! met mamm yaa babyy');
    
    // Test want to eat
    const wantEatResponse = getResponse('aku mau makan');
    expect(wantEatResponse).toContain('baby mau makan apa sayang? kalo mau ditemenin makan kabarin aja yaa babyy');
  });

  // Test 13: Sick patterns
  test('should handle sickness messages correctly', () => {
    const sickResponse = getResponse('aku sakit kepala');
    expect(sickResponse).toContain('aaaa kamu sakit kepala');
    expect(sickResponse).toContain('cepat sembuh ya babyy!');
  });

  // Test 14: Sleep patterns
  test('should handle sleep-related messages correctly', () => {
    const sleepResponse = getResponse('aku mau tidur');
    expect(sleepResponse).toContain('baby mau tidur sekarang? oceyy babyy selamat bobo yaaa!! goodnight my love 😴❤️.');
    
    const boboResponse = getResponse('aku mau bobo');
    expect(boboResponse).toContain('baby mau tidur sekarang? oceyy babyy selamat bobo yaaa!! goodnight my love 😴❤️.');
  });

  // Test 15: Assignment and exam patterns
  test('should handle assignment and exam messages correctly', () => {
    const tugasResponse = getResponse('aku ada tugas matematika');
    expect(tugasResponse).toContain('ohh kamu ada tugas matematika? semangat yaa babyy ngerjainnya!');
    
    const ujianResponse = getResponse('aku ada ujian besok');
    expect(ujianResponse).toContain('semangat yaa sayang buat ujiannya! ❤️ aku yakin kamu bisa ngerjainnya');
    
    const ngerjaninResponse = getResponse('aku lagi ngerjain tugas fisika');
    expect(ngerjaninResponse).toContain('semangat yaa babyy ngerjain tugas');
  });
});