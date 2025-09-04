# WhatsApp Virtual-BF Bot 💕

Bot WhatsApp otomatis yang berperan sebagai pacar virtual dengan respons yang natural dan penuh kasih sayang. Bot ini menggunakan `whatsapp-web.js` untuk integrasi WhatsApp dan memiliki sistem respons cerdas yang dapat memahami berbagai jenis pesan.

## 👥 Tim Pengembang

| Nama | NIM |
|------|-----|
| Varick Zahir Sarjiman | 22/496418/TK/54384 |
| Muhammad Luthfi Attaqi | 22/496427/TK/54387 |

## ✨ Fitur

- 🤖 **Respons Otomatis**: Membalas pesan secara otomatis dengan gaya pacar yang romantis
- 💬 **Percakapan Natural**: Mendukung berbagai topik seperti sapaan, mood, aktivitas, dan kabar
- ⏰ **Typing Simulation**: Delay random untuk simulasi mengetik yang natural
- 🎯 **Partner-Specific**: Hanya merespons pesan dari nomor partner yang ditentukan
- 📱 **QR Code Login**: Login mudah dengan scan QR code WhatsApp

## 🚀 Setup & Installation

### Prerequisites

- Node.js (versi 14 atau lebih baru)
- WhatsApp account
- Chrome/Chromium browser

### 1. Clone Repository

```bash
git clone <repository-url>
cd ldr-virtual-bf
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Konfigurasi Environment

```bash
cp .env.example .env
```

Edit file `.env` dan isi dengan konfigurasi Anda:

```env
# Nomor WhatsApp partner (format: 62xxx@c.us)
PARTNER_NUMBER=628123456789@c.us
```

### 4. Jalankan Bot

```bash
npm start
```

atau untuk development:

```bash
npm run dev
```

## 📱 Cara Penggunaan

### 1. Scan QR Code
Setelah menjalankan bot, QR code akan muncul di terminal:

```
<img src="./assets/qr.jpg" alt="Logo" width="200"/>
📱 Buka WhatsApp > Settings > Linked Devices > Link a Device
```

### 2. Bot Siap Digunakan
Setelah scan berhasil:

```
<img src="./assets/siap.png" alt="Logo" width="200"/>
```

### 3. Mulai Chat
Bot akan otomatis merespons pesan dari nomor partner yang telah dikonfigurasi.

## 🎭 Demo

```
👤 You: Hai sayang
🤖 Bot: Halo cantikku! 😘 Bagaimana harimu, sayang?

👤 You: Aku merasa sedih
🤖 Bot: Oh sayang 😢 kenapa kamu merasa sedih?

👤 You: Aku lagi makan nasi gudeg
🤖 Bot: Wah, kamu makan nasi gudeg? Enak tuh! Kalau aku sih pengen makan bareng kamu 😘

👤 You: Good morning
🤖 Bot: Morning! 🌞 Kamu lagi apa?

👤 You: Aku cinta kamu
🤖 Bot: Aku juga cinta kamu 😘
```

## 🔧 Konfigurasi

### Environment Variables (.env)

| Variable | Deskripsi | Contoh |
|----------|-----------|--------|
| `PARTNER_NUMBER` | Nomor WhatsApp partner (format: country_code+number@c.us) | `628123456789@c.us` |

### Menambah Respons Baru

Edit file `responses.js` untuk menambah pola respons baru:

```javascript
// Contoh menambah respons untuk hobi
const hobbyMatch = message.match(/aku suka (.*)/);
if (hobbyMatch) {
  const hobby = reflect(hobbyMatch[1]);
  return `Wah, kamu suka ${hobby}? Kita bisa coba bareng dong! 😍`;
}
```

## 📂 Struktur Project

```
whatsapp-girlfriend-bot/
├── config.js           # Konfigurasi bot
├── responses.js        # Logic respons dan pattern matching
├── reflections.js      # Transformasi kata untuk respons natural
├── whatsappClient.js   # WhatsApp client handler
├── index.js           # Entry point
├── package.json       # Dependencies
├── .env.example       # Template environment variables
└── README.md          # Dokumentasi
```

## 🔒 Security & Privacy

- ⚠️ **Jangan share file `.env`** - berisi informasi sensitif
- 🔐 **Session tersimpan lokal** - di folder `.wwebjs_auth`
- 📱 **Gunakan nomor WhatsApp terpisah** untuk testing
- 🚫 **Bot hanya merespons partner yang ditentukan** - tidak akan spam ke kontak lain

## 🛠️ Development

### Scripts

- `npm start` - Jalankan bot
- `npm run dev` - Development dengan auto-restart
- `npm test` - (Belum tersedia)

### Dependencies

- `whatsapp-web.js` - WhatsApp Web API
- `qrcode-terminal` - Generate QR code di terminal
- `dotenv` - Environment variables

## 🐛 Troubleshooting

### QR Code tidak muncul
```bash
# Hapus session lama
rm -rf .wwebjs_auth
npm start
```

### Bot tidak merespons
1. Pastikan nomor partner benar di `.env`
2. Cek format nomor: `[country_code][number]@c.us`
3. Restart bot jika diperlukan

**⚠️ Disclaimer**: Bot ini untuk tujuan edukasi dan hiburan. Gunakan dengan bijak dan hormati privasi orang lain.
