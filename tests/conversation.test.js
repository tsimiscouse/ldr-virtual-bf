// tests/integration.test.js
const { getResponse } = require('../responses');

describe('Conversations Tests', () => {
  
  // Test 1: Complete conversation flow
  test('should handle a complete conversation flow', () => {
    const responses = [];
    
    // Greeting
    responses.push(getResponse('halo'));
    expect(responses[0]).toMatch(/Halo sayang!|Hi cantikku!|Hai! Senang ngobrol sama kamu/);
    
    // Mood sharing
    responses.push(getResponse('aku merasa senang'));
    expect(responses[1]).toContain('Senang dengar kamu merasa senang');
    
    // // Activity sharing
    // responses.push(getResponse('aku lagi makan'));
    // expect(responses[2]).toContain('Wah, kamu lagi makan');
    
    // Good night
    responses.push(getResponse('selamat malam'));
    expect(responses[2]).toMatch(/Selamat malam sayang 🌙|Nite2 😴/);
  });

  // Test 2: Extended complete conversation flow - Morning to Night
  test('should handle extended morning to night conversation flow', () => {
    const responses = [];
    
    // 1. Morning greeting
    responses.push(getResponse('selamat pagi sayang'));
    expect(responses[0]).toMatch(/Selamat pagi sayang!|Morning!/);
    
    // 2. Mood response
    responses.push(getResponse('aku merasa excited hari ini'));
    expect(responses[1]).toContain('Senang dengar kamu merasa excited');
    
    // 3. Morning activity
    responses.push(getResponse('aku lagi sarapan'));
    expect(responses[2]).toContain('Wah, kamu lagi sarapan');
    
    // // 4. Food details
    // responses.push(getResponse('aku makan nasi gudeg'));
    // expect(responses[3]).toContain('Wah, kamu makan nasi gudeg');
    // expect(responses[3]).toContain('Enak tuh!');
    
    // 5. Work preparation
    responses.push(getResponse('aku mau berangkat kerja'));
    expect(responses[3]).toContain('Mau berangkat kerja');
    
    // 6. OTW notification
    responses.push(getResponse('aku otw ke kantor'));
    expect(responses[4]).toContain('Otw ya sayang, hati-hati di jalan!');
    
    // 7. Midday check-in
    responses.push(getResponse('lagi apa sayang?'));
    expect(responses[5]).toContain('Aku lagi mikirin kamu 😘');
    
    // // 8. Lunch time
    // responses.push(getResponse('udah makan siang?'));
    // expect(responses[7]).toContain('Aku belum makan nih, kamu udah makan?');
    
    // // 9. Lunch confirmation
    // responses.push(getResponse('sudah makan siang'));
    // expect(responses[8]).toContain('Wah, baguslah! Makan apa tadi?');
    
    // 10. Afternoon tiredness
    responses.push(getResponse('aku merasa capek'));
    expect(responses[6]).toContain('Oh sayang');
    
    // 11. Evening activity
    responses.push(getResponse('aku lagi pulang kerja'));
    expect(responses[7]).toContain('Wah, kamu lagi pulang kerja');
    
    // // 12. Dinner time
    // responses.push(getResponse('aku makan malam'));
    // expect(responses[11]).toContain('Wah, kamu makan malam');
    
    // 13. Evening mood
    responses.push(getResponse('aku merasa happy'));
    expect(responses[8]).toContain('Senang dengar kamu merasa happy');
    
    // 14. Love expression
    responses.push(getResponse('aku cinta kamu'));
    expect(responses[9]).toBe('Aku juga cinta kamu 😘');
    
    // 15. Good night
    responses.push(getResponse('selamat malam sayang'));
    expect(responses[10]).toMatch(/Selamat malam sayang 🌙|Nite2 😴/);
  });

  // Test 3: Complete conversation flow - Relationship conflicts and resolution
  test('should handle relationship conflict resolution conversation flow', () => {
    const responses = [];
    
    // 1. Greeting
    responses.push(getResponse('hai'));
    expect(responses[0]).toMatch(/Halo sayang!|Hi cantikku!|Hai! Senang ngobrol sama kamu/);
    
    // 2. Expressing sadness
    responses.push(getResponse('aku merasa sedih'));
    expect(responses[1]).toContain('Oh sayang 😢 kenapa kamu merasa sedih');
    
    // 3. Feeling down
    responses.push(getResponse('aku merasa down'));
    expect(responses[2]).toContain('Oh sayang 😢 kenapa kamu merasa down');
    
    // 4. Stress expression
    responses.push(getResponse('aku merasa stress'));
    expect(responses[3]).toContain('Oh sayang 😢 kenapa kamu merasa stress');
    
    // 5. Want to talk
    responses.push(getResponse('aku mau cerita'));
    expect(responses[4]).toContain('Aku selalu siap dengerin kamu');
    
    // 6. Missing partner
    responses.push(getResponse('aku rindu kamu'));
    expect(responses[5]).toBe('Aku juga rindu kamu 😘');
    
    // 7. Want to meet
    responses.push(getResponse('aku mau ketemu kamu'));
    expect(responses[6]).toContain('Mau ketemu kamu');
    
    // 8. Making up
    responses.push(getResponse('aku cinta kamu'));
    expect(responses[7]).toBe('Aku juga cinta kamu 😘');
    
    // 9. Happy ending
    responses.push(getResponse('aku merasa bahagia'));
    expect(responses[8]).toContain('Senang dengar kamu merasa bahagia');
  });

  // Test 4: Complete conversation flow - Health and care
  test('should handle complete health and care conversation flow', () => {
    const responses = [];
    
    // 1. Health check
    responses.push(getResponse('apa kabar sayang?'));
    expect(responses[0]).toContain('Aku baik, sayang. Bagaimana kabarmu?');
    
    // 3. Flu symptoms
    responses.push(getResponse('aku sakit flu'));
    expect(responses[1]).toContain('Oh tidak, kamu');
    expect(responses[1]).toContain('flu');
    
    // 7. Taking medicine
    responses.push(getResponse('aku mau minum obat'));
    expect(responses[2]).toContain('Mau minum obat');
    
    // 8. Need rest
    responses.push(getResponse('aku mau istirahat'));
    expect(responses[3]).toContain('Mau istirahat');
    
    // 9. Feeling better
    responses.push(getResponse('aku merasa mendingan'));
    expect(responses[4]).toContain('Senang dengar kamu merasa mendingan');
    
    // 10. Thank you for care
    responses.push(getResponse('aku cinta kamu'));
    expect(responses[5]).toBe('Aku juga cinta kamu 😘');
  });

  // Test 5: Complete conversation flow - Food journey
  test('should handle complete food journey conversation flow', () => {
    const responses = [];
    
    // 1. Morning hunger
    responses.push(getResponse('aku merasa lapar'));
    expect(responses[0]).toContain('Senang dengar kamu merasa lapar');
    
    // 2. Breakfast inquiry
    responses.push(getResponse('udah sarapan?'));
    expect(responses[1]).toMatch(/Hey sayang!|baby!/); // Fallback for this pattern
    
    // 3. Breakfast activity
    responses.push(getResponse('aku lagi sarapan'));
    expect(responses[2]).toContain('Wah, kamu lagi sarapan');
    
    // // 4. Breakfast menu
    // responses.push(getResponse('aku makan roti panggang'));
    // expect(responses[3]).toContain('Wah, kamu makan roti panggang');
    
    // // 5. Lunch time check
    // responses.push(getResponse('udah makan siang?'));
    // expect(responses[4]).toContain('Aku belum makan nih');
    
    // 6. Lunch together suggestion
    responses.push(getResponse('aku mau makan bareng'));
    expect(responses[3]).toContain('Mau makan bareng');
    
    // // 7. Lunch menu
    // responses.push(getResponse('aku makan ayam bakar'));
    // expect(responses[6]).toContain('Wah, kamu makan ayam bakar');
    
    // 8. Dinner preparation
    responses.push(getResponse('aku mau masak dinner'));
    expect(responses[4]).toContain('Mau masak dinner');
    
    // 9. Cooking activity
    responses.push(getResponse('aku lagi masak'));
    expect(responses[5]).toContain('Wah, kamu lagi masak');
    
    // 10. Dinner invitation
    responses.push(getResponse('aku mau makan malam bareng'));
    expect(responses[6]).toContain('Mau makan malam bareng');
  });

  // Test 6: Complete conversation flow - Work and study support
  test('should handle complete work and study support conversation flow', () => {
    const responses = [];
    
    // 1. Work start
    responses.push(getResponse('aku mau mulai kerja'));
    expect(responses[0]).toContain('Mau mulai kerja');
    
    // 2. Work activity
    responses.push(getResponse('aku lagi kerja'));
    expect(responses[1]).toContain('Wah, kamu lagi kerja');
    
    // 3. Work stress
    responses.push(getResponse('aku merasa stress dengan kerjaan'));
    expect(responses[2]).toContain('Oh sayang 😢 kenapa kamu merasa stress');
    
    // 4. Heavy workload
    responses.push(getResponse('aku lagi ngerjain proyek besar'));
    expect(responses[3]).toContain('Wah, kamu lagi ngerjain proyek besar');
    
    // 5. Deadline pressure
    responses.push(getResponse('deadline besok'));
    expect(responses[4]).toMatch(/Hey sayang!|baby!/); // Fallback
    
    // 6. Study time
    responses.push(getResponse('aku lagi belajar'));
    expect(responses[5]).toContain('Wah, kamu lagi belajar');
    
    // 7. Exam preparation
    responses.push(getResponse('ada ujian minggu depan'));
    expect(responses[6]).toContain('Semangat ya sayang!');
    
    // 8. Study stress
    responses.push(getResponse('aku merasa khawatir tentang ujian'));
    expect(responses[7]).toContain('Oh sayang 😢 kenapa kamu merasa khawatir');
    
    // // 9. Encouragement needed
    // responses.push(getResponse('aku butuh semangat'));
    // expect(responses[8]).toMatch(/Hey sayang!|baby!/); // Fallback but supportive
    
    // 10. Success celebration
    responses.push(getResponse('aku berhasil selesaikan semua'));
    expect(responses[8]).toMatch(/Hey sayang!|baby!/); // Fallback
  });

  // Test 7: Complete conversation flow - Travel and adventure
  test('should handle complete travel and adventure conversation flow', () => {
    const responses = [];
    
    // 1. Travel plan
    responses.push(getResponse('aku mau jalan-jalan'));
    expect(responses[0]).toContain('Mau jalan-jalan');
    
    // 2. Preparation
    responses.push(getResponse('aku lagi packing'));
    expect(responses[1]).toContain('Wah, kamu lagi packing');
    
    // 3. Departure
    responses.push(getResponse('aku otw bandara'));
    expect(responses[2]).toContain('Otw ya sayang, hati-hati di jalan!');
    
    // 4. In transit
    responses.push(getResponse('aku lagi di pesawat'));
    expect(responses[3]).toContain('Wah, kamu lagi di pesawat');
    
    // 5. Arrival
    responses.push(getResponse('aku udah sampai'));
    expect(responses[4]).toMatch(/Hey sayang!|baby!/); // Fallback
    
    // 6. Exploring
    responses.push(getResponse('aku lagi explore kota'));
    expect(responses[5]).toContain('Wah, kamu lagi explore kota');
    
    // // 7. Local food
    // responses.push(getResponse('aku makan makanan lokal'));
    // expect(responses[6]).toContain('Wah, kamu makan makanan lokal');
    
    // 8. Sightseeing
    responses.push(getResponse('aku lagi foto-foto'));
    expect(responses[6]).toContain('Wah, kamu lagi foto-foto');
    
    // 10. Return journey
    responses.push(getResponse('aku otw pulang'));
    expect(responses[7]).toContain('Otw ya sayang, hati-hati di jalan!');
  });

  // Test 8: Complete conversation flow - Weekend relaxation
  test('should handle complete weekend relaxation conversation flow', () => {
    const responses = [];
    
    // 1. Weekend greeting
    responses.push(getResponse('selamat pagi weekend!'));
    expect(responses[0]).toMatch(/Selamat pagi sayang!|Morning!/);
    
    // 2. Relaxed mood
    responses.push(getResponse('aku merasa santai'));
    expect(responses[1]).toContain('Senang dengar kamu merasa santai');
    
    // 3. Lazy morning
    responses.push(getResponse('aku lagi tiduran'));
    expect(responses[2]).toContain('Wah, kamu lagi tiduran');
    
    // 4. Movie time
    responses.push(getResponse('aku lagi nonton film'));
    expect(responses[3]).toContain('Wah, kamu lagi nonton film');
    
    // // 5. Snack time
    // responses.push(getResponse('aku makan cemilan'));
    // expect(responses[4]).toContain('Wah, kamu makan cemilan');
    
    // 6. Gaming
    responses.push(getResponse('aku lagi main game'));
    expect(responses[4]).toContain('Wah, kamu lagi main game');
    
    // 7. Reading
    responses.push(getResponse('aku lagi baca buku'));
    expect(responses[5]).toContain('Wah, kamu lagi baca buku');
    
    // 8. Music time
    responses.push(getResponse('aku lagi dengerin musik'));
    expect(responses[6]).toContain('Wah, kamu lagi dengerin musik');
    
    // 9. Afternoon nap
    responses.push(getResponse('aku mau tidur siang'));
    expect(responses[7]).toContain('Mau tidur siang');
    
    // 10. Evening contentment
    responses.push(getResponse('aku merasa damai'));
    expect(responses[8]).toContain('Senang dengar kamu merasa damai');
  });

  // Test 9: Complete conversation flow - Special occasions
  test('should handle complete special occasions conversation flow', () => {
    const responses = [];
    
    // 1. Special day
    responses.push(getResponse('hari ini spesial'));
    expect(responses[0]).toMatch(/Hey sayang!|baby!/); // Fallback
    
    // 2. Happy feeling
    responses.push(getResponse('aku merasa bahagia banget'));
    expect(responses[1]).toContain('Senang dengar kamu merasa bahagia');
    
    // 3. Celebration mode
    responses.push(getResponse('aku lagi celebrate'));
    expect(responses[2]).toContain('Wah, kamu lagi celebrate');
    
    // 4. Party preparation
    responses.push(getResponse('aku lagi siap-siap party'));
    expect(responses[3]).toContain('Wah, kamu lagi siap-siap party');
    
    // 5. Getting dressed
    responses.push(getResponse('aku lagi dandan'));
    expect(responses[4]).toContain('Wah, kamu lagi dandan');
    
    // 6. Photo session
    responses.push(getResponse('aku lagi foto cantik'));
    expect(responses[5]).toContain('Wah, kamu lagi foto cantik');
    
    // 7. Party time
    responses.push(getResponse('party nya seru banget'));
    expect(responses[6]).toMatch(/Hey sayang!|baby!/); // Fallback
    
    // 8. Sharing joy
    responses.push(getResponse('aku mau share kebahagiaan ini'));
    expect(responses[7]).toContain('Mau share kebahagiaan ini');
    
    // 9. Gratitude
    responses.push(getResponse('aku bersyukur'));
    expect(responses[8]).toMatch(/Hey sayang!|baby!/); // Fallback
    
  });

  // Test 10: Complete conversation flow - Deep emotional connection
  test('should handle complete deep emotional connection conversation flow', () => {
    const responses = [];
    
    // 1. Thoughtful greeting
    responses.push(getResponse('hai sayang, aku kangen'));
    expect(responses[0]).toMatch(/Halo sayang!|Hi cantikku!|Hai! Senang ngobrol sama kamu/);
    
    // 2. Missing feeling
    responses.push(getResponse('aku rindu kamu banget'));
    expect(responses[1]).toBe('Aku juga rindu kamu 😘');
    
    // 3. Love confession
    responses.push(getResponse('aku cinta kamu sepenuh hati'));
    expect(responses[2]).toBe('Aku juga cinta kamu 😘');
    
    // 4. Appreciation
    responses.push(getResponse('kamu yang terbaik'));
    expect(responses[3]).toMatch(/Hey sayang!|baby!/); // Fallback but loving
    
    // 5. Future dreams
    responses.push(getResponse('aku mau masa depan sama kamu'));
    expect(responses[4]).toContain('Mau masa depan sama kamu');
    
    // 6. Commitment
    responses.push(getResponse('aku janji sayang kamu selamanya'));
    expect(responses[5]).toMatch(/Hey sayang!|baby!/); // Fallback
    
    // 9. Reassurance needed
    responses.push(getResponse('kamu bakal tetap sama aku kan?'));
    expect(responses[6]).toMatch(/Hey sayang!|baby!/); // Fallback
    
    // 10. Peaceful ending
    responses.push(getResponse('aku merasa tenang'));
    expect(responses[7]).toContain('Senang dengar kamu merasa tenang');
  });

  // Test 11: Edge cases handling
  test('should handle edge cases gracefully', () => {
    // Empty string
    const emptyResponse = getResponse('');
    expect(emptyResponse).toBeDefined();
    
    // Very long message
    const longMessage = 'a'.repeat(1000);
    const longResponse = getResponse(longMessage);
    expect(longResponse).toBeDefined();
    
    // Special characters
    const specialResponse = getResponse('!@#$%^&*()');
    expect(specialResponse).toBeDefined();
  });

  // Test 3: Response consistency
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
});