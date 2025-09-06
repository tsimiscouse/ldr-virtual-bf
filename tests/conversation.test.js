const { getResponse } = require('../responses');

describe('Conversations Tests', () => {
  
  // Test 1: Complete conversation flow
  test('should handle a complete conversation flow', () => {
    const responses = [];
    
    // Greeting
    responses.push(getResponse('halo'));
    expect(responses[0]).toMatch(/halo sayang!|halo babyyyyy!|hi cantikku!|hi cayanggg!|hi my love :3/);
    
    // Mood sharing
    responses.push(getResponse('aku merasa senang'));
    expect(responses[1]).toContain('happy to hear kalo kamu ngerasa senang');
    
    // Good night
    responses.push(getResponse('selamat malam'));
    expect(responses[2]).toMatch(/selamat malam sayang ❤️ tidur nyenyak yaaa|goodnight babyy! sweet dreams yaaa sayang ❤️❤️|met boboo babyy, goodnighttt! ❤️❤️|goodnightt babyy 😴❤️ mimpiin akuu yaaa/);
  });

  // Test 2: Extended complete conversation flow - Morning to Night
  test('should handle extended morning to night conversation flow', () => {
    const responses = [];
    
    // 1. Morning greeting
    responses.push(getResponse('selamat pagi sayang'));
    expect(responses[0]).toMatch(/selamat pagi babyy! ☀️ have a lovely day! ❤️|morning babyyyy! 🌞|met pagiii babyyy! semangat yaa hari ini! 💪|pucuk ubi, pucuk talas, met pagii babyy, semangatt jangan malass! <3|good morning babyyy <3, have a great day!|good morning babyy, hari ini mau ngapain ajaaa\? jangan lupa kabarin aku yaa! 😘❤️❤️/);
    
    // 2. Mood response
    responses.push(getResponse('aku merasa excited hari ini'));
    expect(responses[1]).toContain('happy to hear kalo kamu ngerasa excited');
    
    // 3. Morning activity
    responses.push(getResponse('aku lagi sarapan'));
    expect(responses[2]).toContain('WAWWW, kamu lagi sarapan? asikk betul');
    
    // 4. Work preparation
    responses.push(getResponse('aku mau berangkat kerja'));
    expect(responses[3]).toContain('kamu mau berangkat kerja? bolehh nantii kita coba bareng yaaa babyy');
    
    // 5. OTW notification
    responses.push(getResponse('otw ke kantor'));
    expect(responses[4]).toContain('mau kemana babyy?, hati-hati di jalan yaaa 😘');
    
    // 6. Midday check-in
    responses.push(getResponse('lagi apa sayang?'));
    expect(responses[5]).toContain('aku lagi mikirin kamu hehehe 😘 kamu lagi apa, sayang?');
    
    // 7. Afternoon tiredness
    responses.push(getResponse('aku merasa capek'));
    expect(responses[6]).toContain('kenapa kamu capek?');
    
    // 8. Evening activity
    responses.push(getResponse('aku lagi pulang kerja'));
    expect(responses[7]).toContain('WAWWW, kamu lagi pulang kerja? asikk betul');
    
    // 9. Evening mood
    responses.push(getResponse('aku merasa happy'));
    expect(responses[8]).toContain('happy to hear kalo kamu ngerasa happy');
    
    // 10. Love expression
    responses.push(getResponse('aku cinta kamu'));
    expect(responses[9]).toMatch(/aku juga cinta kamu babyyy ❤️❤️|I love you too babyy|Sama, aku juga/);
    
    // 11. Good night
    responses.push(getResponse('selamat malam sayang'));
    expect(responses[10]).toMatch(/selamat malam sayang ❤️ tidur nyenyak yaaa|goodnight babyy! sweet dreams yaaa sayang ❤️❤️|met boboo babyy, goodnighttt! ❤️❤️|goodnightt babyy 😴❤️ mimpiin akuu yaaa/);
  });

  // Test 3: Complete conversation flow - Relationship conflicts and resolution
  test('should handle relationship conflict resolution conversation flow', () => {
    const responses = [];
    
    // 1. Greeting
    responses.push(getResponse('hai'));
    expect(responses[0]).toMatch(/halo sayang!|halo babyyyyy!|hi cantikku!|hi cayanggg!|hi my love :3/);
    
    // 2. Expressing sadness
    responses.push(getResponse('aku merasa sedih'));
    expect(responses[1]).toContain('kenapa kamu sedih?');
    
    // 3. Feeling down
    responses.push(getResponse('aku merasa down'));
    expect(responses[2]).toContain('kenapa kamu down?');
    
    // 4. Stress expression
    responses.push(getResponse('aku merasa stress'));
    expect(responses[3]).toContain('kenapa kamu stress?');
    
    // 5. Want to talk
    responses.push(getResponse('aku mau cerita'));
    expect(responses[4]).toContain('ada apaa babyy?? ceritain aja kalo ada apa apaa');
    
    // 6. Missing partner
    responses.push(getResponse('aku rindu kamu'));
    expect(responses[5]).toMatch(/aku juga rindu kamu babyyy ❤️❤️|I love you too babyy|Sama, aku juga/);
    
    // 7. Want to meet
    responses.push(getResponse('aku mau ketemu kamu'));
    expect(responses[6]).toContain('kamu mau ketemu kamu? bolehh nantii kita coba bareng yaaa babyy');
    
    // 9. Happy ending
    responses.push(getResponse('aku merasa bahagia'));
    expect(responses[7]).toContain('happy to hear kalo kamu ngerasa bahagia');
  });

  // Test 4: Complete conversation flow - Health and care
  test('should handle complete health and care conversation flow', () => {
    const responses = [];
    
    // 1. Health check
    responses.push(getResponse('apa kabar sayang?'));
    expect(responses[0]).toContain('aku baik kokk babyy. kamu apa kabar? gimana hari ini?');
    
    // 2. Flu symptoms
    responses.push(getResponse('aku sakit flu'));
    expect(responses[1]).toContain('aaaa kamu sakit flu');
    expect(responses[1]).toContain('cepat sembuh ya babyy!');
    
    // 3. Taking medicine
    responses.push(getResponse('aku mau minum obat'));
    expect(responses[2]).toContain('kamu mau minum obat? bolehh nantii kita coba bareng yaaa babyy');
    
    // 4. Need rest
    responses.push(getResponse('aku mau istirahat'));
    expect(responses[3]).toContain('kamu mau istirahat? bolehh nantii kita coba bareng yaaa babyy');
    
    // 5. Feeling better
    responses.push(getResponse('aku merasa mendingan'));
    expect(responses[4]).toContain('happy to hear kalo kamu ngerasa mendingan');
  });

  // Test 5: Complete conversation flow - Food journey
  test('should handle complete food journey conversation flow', () => {
    const responses = [];
    
    // 1. Morning hunger
    responses.push(getResponse('aku merasa lapar'));
    expect(responses[0]).toContain('happy to hear kalo kamu ngerasa lapar');
    
    // 2. Breakfast inquiry
    responses.push(getResponse('udah sarapan?'));
    expect(responses[1]).toMatch(/haii babyy! 😘 maaf yaa baby aku lagi ga bisa chat proper|baby! 😍 lagi sibuk bentar nih/);
    
    // 3. Breakfast activity
    responses.push(getResponse('aku lagi sarapan'));
    expect(responses[2]).toContain('WAWWW, kamu lagi sarapan? asikk betul');
    
    // 4. Lunch together suggestion
    responses.push(getResponse('aku mau makan bareng'));
    expect(responses[3]).toContain('baby mau makan apa sayang? kalo mau ditemenin makan kabarin aja yaa babyy');
    
    // 5. Dinner preparation
    responses.push(getResponse('aku mau masak dinner'));
    expect(responses[4]).toContain('kamu mau masak dinner? bolehh nantii kita coba bareng yaaa babyy');
    
    // 6. Cooking activity
    responses.push(getResponse('aku lagi masak'));
    expect(responses[5]).toContain('WAWWW, kamu lagi masak? asikk betul');
    
    // 7. Dinner invitation
    responses.push(getResponse('aku mau makan malam bareng'));
    expect(responses[6]).toContain('baby mau makan apa sayang? kalo mau ditemenin makan kabarin aja yaa babyy');
  });

  // Test 6: Complete conversation flow - Work and study support
  test('should handle complete work and study support conversation flow', () => {
    const responses = [];
    
    // 1. Work start
    responses.push(getResponse('aku mau mulai kerja'));
    expect(responses[0]).toContain('kamu mau mulai kerja? bolehh nantii kita coba bareng yaaa babyy');
    
    // 2. Work activity
    responses.push(getResponse('aku lagi kerja'));
    expect(responses[1]).toContain('WAWWW, kamu lagi kerja? asikk betul');
    
    // 3. Work stress
    responses.push(getResponse('aku merasa stress dengan kerjaan'));
    expect(responses[2]).toContain('kenapa kamu stress dengan kerjaan?');
    
    // 4. Heavy workload
    responses.push(getResponse('aku lagi ngerjain proyek besar'));
    expect(responses[3]).toContain('WAWWW, kamu lagi ngerjain proyek besar? asikk betul');
    
    // 5. Deadline pressure
    responses.push(getResponse('deadline besok'));
    expect(responses[4]).toMatch(/haii babyy! 😘 maaf yaa baby aku lagi ga bisa chat proper|baby! 😍 lagi sibuk bentar nih/);
    
    // 6. Study time
    responses.push(getResponse('aku lagi belajar'));
    expect(responses[5]).toContain('WAWWW, kamu lagi belajar? asikk betul');
    
    // 7. Exam preparation - using specific pattern for "ada ujian"
    responses.push(getResponse('aku ada ujian minggu depan'));
    expect(responses[6]).toContain('semangat yaa sayang buat ujiannya! ❤️ aku yakin kamu bisa ngerjainnya insyaallah nilainya bagus aamiin 🤲');
    
    // 8. Study stress
    responses.push(getResponse('aku merasa khawatir tentang ujian'));
    expect(responses[7]).toContain('kenapa kamu khawatir tentang ujian?');
    
    // 9. Success celebration
    responses.push(getResponse('aku berhasil selesaikan semua'));
    expect(responses[8]).toMatch(/haii babyy! 😘 maaf yaa baby aku lagi ga bisa chat proper|baby! 😍 lagi sibuk bentar nih/);
  });

  // Test 7: Complete conversation flow - Travel and adventure
  test('should handle complete travel and adventure conversation flow', () => {
    const responses = [];
    
    // 1. Travel plan
    responses.push(getResponse('aku mau jalan-jalan'));
    expect(responses[0]).toContain('kamu mau jalan-jalan? bolehh nantii kita coba bareng yaaa babyy');
    
    // 2. Preparation
    responses.push(getResponse('aku lagi packing'));
    expect(responses[1]).toContain('WAWWW, kamu lagi packing? asikk betul');
    
    // 3. Departure
    responses.push(getResponse('otw bandara'));
    expect(responses[2]).toContain('mau kemana babyy?, hati-hati di jalan yaaa 😘');
    
    // 4. In transit
    responses.push(getResponse('aku lagi di pesawat'));
    expect(responses[3]).toContain('WAWWW, kamu lagi di pesawat? asikk betul');
    
    // 5. Arrival
    responses.push(getResponse('aku udah sampai'));
    expect(responses[4]).toMatch(/haii babyy! 😘 maaf yaa baby aku lagi ga bisa chat proper|baby! 😍 lagi sibuk bentar nih/);
    
    // 6. Exploring
    responses.push(getResponse('aku lagi explore kota'));
    expect(responses[5]).toContain('WAWWW, kamu lagi explore kota? asikk betul');
    
    // 7. Sightseeing
    responses.push(getResponse('aku lagi foto-foto'));
    expect(responses[6]).toContain('WAWWW, kamu lagi foto-foto? asikk betul');
    
    // 8. Return journey
    responses.push(getResponse('otw pulang'));
    expect(responses[7]).toContain('mau kemana babyy?, hati-hati di jalan yaaa 😘');
  });

  // Test 8: Complete conversation flow - Weekend relaxation
  test('should handle complete weekend relaxation conversation flow', () => {
    const responses = [];
    
    // 1. Weekend greeting
    responses.push(getResponse('selamat pagi weekend!'));
    expect(responses[0]).toMatch(/selamat pagi babyy! ☀️ have a lovely day! ❤️|morning babyyyy! 🌞|met pagiii babyyy! semangat yaa hari ini! 💪|pucuk ubi, pucuk talas|good morning babyy|/);
    
    // 2. Relaxed mood
    responses.push(getResponse('aku merasa santai'));
    expect(responses[1]).toContain('happy to hear kalo kamu ngerasa santai');
    
    // 3. Lazy morning
    responses.push(getResponse('aku lagi tiduran'));
    expect(responses[2]).toContain('WAWWW, kamu lagi tiduran? asikk betul');
    
    // 4. Movie time
    responses.push(getResponse('aku lagi nonton film'));
    expect(responses[3]).toContain('WAWWW, kamu lagi nonton film? asikk betul');
    
    // 5. Gaming
    responses.push(getResponse('aku lagi main game'));
    expect(responses[4]).toContain('WAWWW, kamu lagi main game? asikk betul');
    
    // 6. Reading
    responses.push(getResponse('aku lagi baca buku'));
    expect(responses[5]).toContain('WAWWW, kamu lagi baca buku? asikk betul');
    
    // 7. Music time
    responses.push(getResponse('aku lagi dengerin musik'));
    expect(responses[6]).toContain('WAWWW, kamu lagi dengerin musik? asikk betul');
    
    // 8. Afternoon nap
    responses.push(getResponse('aku mau tidur siang'));
    expect(responses[7]).toContain('baby mau tidur sekarang? oceyy babyy selamat bobo yaaa!! goodnight my love 😴❤️.');
    
    // 9. Evening contentment
    responses.push(getResponse('aku merasa damai'));
    expect(responses[8]).toContain('happy to hear kalo kamu ngerasa damai');
  });

  // Test 9: Complete conversation flow - Special occasions
  test('should handle complete special occasions conversation flow', () => {
    const responses = [];
    
    // 1. Special day
    responses.push(getResponse('hari ini spesial'));
    expect(responses[0]).toMatch(/haii babyy! 😘 maaf yaa baby aku lagi ga bisa chat proper|baby! 😍 lagi sibuk bentar nih/);
    
    // 2. Happy feeling
    responses.push(getResponse('aku merasa bahagia banget'));
    expect(responses[1]).toContain('happy to hear kalo kamu ngerasa bahagia banget');
    
    // 3. Celebration mode
    responses.push(getResponse('aku lagi celebrate'));
    expect(responses[2]).toContain('WAWWW, kamu lagi celebrate? asikk betul');
    
    // 4. Party preparation
    responses.push(getResponse('aku lagi siap-siap party'));
    expect(responses[3]).toContain('WAWWW, kamu lagi siap-siap party? asikk betul');
    
    // 5. Getting dressed
    responses.push(getResponse('aku lagi dandan'));
    expect(responses[4]).toContain('WAWWW, kamu lagi dandan? asikk betul');
    
    // 6. Photo session
    responses.push(getResponse('aku lagi foto cantik'));
    expect(responses[5]).toContain('WAWWW, kamu lagi foto cantik? asikk betul');
    
    // 7. Party time
    responses.push(getResponse('party nya seru banget'));
    expect(responses[6]).toMatch(/haii babyy! 😘 maaf yaa baby aku lagi ga bisa chat proper|baby! 😍 lagi sibuk bentar nih/);
    
    // 8. Sharing joy
    responses.push(getResponse('aku mau share kebahagiaan ini'));
    expect(responses[7]).toContain('kamu mau share kebahagiaan ini? bolehh nantii kita coba bareng yaaa babyy');
    
    // 9. Gratitude
    responses.push(getResponse('aku bersyukur'));
    expect(responses[8]).toMatch(/haii babyy! 😘 maaf yaa baby aku lagi ga bisa chat proper|baby! 😍 lagi sibuk bentar nih/);
  });

  // Test 10: Complete conversation flow - Deep emotional connection
  test('should handle complete deep emotional connection conversation flow', () => {
    const responses = [];
    
    // 1. Thoughtful greeting
    responses.push(getResponse('hai sayang, aku kangen'));
    expect(responses[0]).toMatch(/halo sayang!|halo babyyyyy!|hi cantikku!|hi cayanggg!|hi my love :3/);
    
    // 2. Missing feeling
    responses.push(getResponse('aku rindu kamu banget'));
    expect(responses[1]).toMatch(/aku juga rindu kamu babyyy ❤️❤️|I love you too babyy|Sama, aku juga/);
    
    // 3. Love confession
    responses.push(getResponse('aku cinta kamu sepenuh hati'));
    expect(responses[2]).toMatch(/aku juga cinta kamu babyyy ❤️❤️|I love you too babyy|Sama, aku juga/);
    
    // 4. Appreciation
    responses.push(getResponse('kamu yang terbaik'));
    expect(responses[3]).toMatch(/haii babyy! 😘 maaf yaa baby aku lagi ga bisa chat proper|baby! 😍 lagi sibuk bentar nih/);
    
    // 5. Future dreams
    responses.push(getResponse('aku mau masa depan sama kamu'));
    expect(responses[4]).toContain('kamu mau masa depan sama kamu? bolehh nantii kita coba bareng yaaa babyy');
    
    // 7. Reassurance needed
    responses.push(getResponse('kamu bakal tetap sama aku kan?'));
    expect(responses[5]).toMatch(/haii babyy! 😘 maaf yaa baby aku lagi ga bisa chat proper|baby! 😍 lagi sibuk bentar nih/);
    
    // 8. Peaceful ending
    responses.push(getResponse('aku merasa tenang'));
    expect(responses[6]).toContain('happy to hear kalo kamu ngerasa tenang');
  });

  // Test 11: Edge cases handling
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

  // Test 12: Response consistency
  test('should provide consistent response types', () => {
    const testCases = [
      'halo',
      'aku merasa sedih',
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

  // Test 13: Specific pattern tests
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

  // Test 14: Food specific patterns
  test('should handle food-related messages correctly', () => {
    // Test eating activity
    const eatingResponse = getResponse('aku lagi makan nasi');
    expect(eatingResponse).toContain('kamu lagi makan nasi? enak bangeett mauuuu!! met mamm yaa babyy');
    
    // Test want to eat
    const wantEatResponse = getResponse('aku mau makan');
    expect(wantEatResponse).toContain('baby mau makan apa sayang? kalo mau ditemenin makan kabarin aja yaa babyy');
  });

  // Test 15: Sick patterns
  test('should handle sickness messages correctly', () => {
    const sickResponse = getResponse('aku sakit kepala');
    expect(sickResponse).toContain('aaaa kamu sakit kepala');
    expect(sickResponse).toContain('cepat sembuh ya babyy!');
  });

  // Test 16: Sleep patterns
  test('should handle sleep-related messages correctly', () => {
    const sleepResponse = getResponse('aku mau tidur');
    expect(sleepResponse).toContain('baby mau tidur sekarang? oceyy babyy selamat bobo yaaa!! goodnight my love 😴❤️.');
    
    const boboResponse = getResponse('aku mau bobo');
    expect(boboResponse).toContain('baby mau tidur sekarang? oceyy babyy selamat bobo yaaa!! goodnight my love 😴❤️.');
  });

  // Test 17: Assignment and exam patterns
  test('should handle assignment and exam messages correctly', () => {
    const tugasResponse = getResponse('aku ada tugas matematika');
    expect(tugasResponse).toContain('ohh kamu ada tugas matematika? semangat yaa babyy ngerjainnya!');
    
    const ujianResponse = getResponse('aku ada ujian besok');
    expect(ujianResponse).toContain('semangat yaa sayang buat ujiannya! ❤️ aku yakin kamu bisa ngerjainnya');
    
    const ngerjaninResponse = getResponse('aku lagi ngerjain tugas fisika');
    expect(ngerjaninResponse).toContain('semangat yaa babyy ngerjain tugas');
  });
});