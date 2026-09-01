# SEOCRY · Telegram Mini Apps (TMA) Portfolio Suite

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-00f2fe?style=for-the-badge&logo=github&logoColor=white)](https://txltedxgod.github.io/tma-portfolio-suite/)
[![Telegram WebApp](https://img.shields.io/badge/Telegram-WebApp_SDK_v7+-24A1DE?style=for-the-badge&logo=telegram&logoColor=white)](https://core.telegram.org/bots/webapps)
[![aiogram 3.x](https://img.shields.io/badge/Backend-aiogram_3.x-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://github.com/aiogram/aiogram)
[![Web3 Payments](https://img.shields.io/badge/Crypto-CryptoBot_·_xRocket_·_Stars-F59E0B?style=for-the-badge&logo=bitcoin&logoColor=white)](https://t.me/CryptoBot)
[![License: MIT](https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge)](LICENSE)

### 💎 Production-Grade Obsidian Glass Telegram Mini Apps (TMA) Suite
**7 Complete WebApps · Web Audio API · Haptic Feedback Engine · Universal Router · Multilingual RU/EN/UA**

[👉 **EXPLORE LIVE INTERACTIVE DEMO** 👈](https://txltedxgod.github.io/tma-portfolio-suite/)

</div>

---

## 📱 The 7 Production Mini Apps

| # | Application | Route | Key Features & Engineering Highlights |
|---|---|---|---|
| **01** | 🧘 **MindFlow (Meditation)** | `/?app=meditation` | Custom circular SVG breathing timer (4-7-8, Box, Relax techniques), synthetic Web Audio API ambient sound generator (Rain, Campfire, Forest, Night Ocean), session history & streak counter. |
| **02** | 🌤 **SkyPulse (Weather)** | `/?app=weather` | Apple Weather-inspired glassmorphic cards, 24-hour horizontal hourly forecast, 7-day outlook, dynamic UV/humidity/wind indicators, and interactive city search. |
| **03** | 💎 **Crypto Pulse (Markets)** | `/?app=crypto` | Live crypto ticker (BTC, ETH, TON, SOL, BNB) with SVG sparkline trend charts, multi-currency converter (USD/EUR/UAH/RUB), and portfolio asset allocation donut chart. |
| **04** | 📚 **LexiFlow (Language)** | `/?app=language` | Interactive Tinder-style swipeable flashcards (Know / Learn gestures), daily mini-quiz with instant visual & haptic feedback, and continuous streak progress ring. |
| **05** | 🏠 **Apex Living (Real Estate)** | `/?app=real-estate` | Luxury property showcase with multi-photo gallery slider, filters (Buy/Rent, bedrooms, price), and native `Telegram.WebApp.sendData()` viewing booking flow. |
| **06** | 🎯 **MindSprint (Quiz)** | `/?app=quiz` | 15-second timed interactive knowledge challenge, progressive score tracker, animated answer validation, and comprehensive accuracy analytics breakdown. |
| **07** | 💸 **NexusSwap (P2P Exchange)** | `/?app=p2p` | P2P order book with Buy/Sell sides, fiat payment method filtering (Monobank, Privat24, Sber, Revolut, Wise), and multi-step secure Escrow order modal. |

---

## 💳 Payment Gateway & Web3 Integrations

This suite is architected for instant plug-and-play integration with Telegram's primary financial rails:

### 1. 🤖 @CryptoBot (Crypto Pay API)
- Automated invoice generation for USDT, TON, BTC, ETH, and LTC.
- Webhook signature verification (`crypto-pay-api-signature`).
- Instant order status updates pushed directly to the user's active TMA session via WebSockets or polling.

### 2. 🚀 xRocket Pay Integration
- Multi-currency crypto payment links and micro-tipping.
- Telegram-native cheque issuance and withdrawal flows.
- Sub-second payment confirmation webhooks.

### 3. ⭐ Telegram Stars (Digital Goods)
- Native Telegram Stars checkout (`createInvoiceLink`).
- Seamless one-tap in-app digital purchases without external redirects.
- Automated stars transaction verification and ledger synchronization.

### 4. 💎 TON Connect 2.0 (Non-Custodial Web3)
- Direct wallet integration with Tonkeeper, MyTonWallet, and Telegram Wallet.
- Smart contract escrow interactions and token transfer payloads.

---

## 🎨 Design System & Architecture

- **Obsidian Glass Aesthetics**: Deep dark background (`#08090C`), frosted glass cards (`backdrop-filter: blur(24px)`), subtle neon glow accents (`#00f2fe`, `#7928ca`, `#10b981`).
- **Telegram Native UX**:
  - Seamless full-screen expansion (`Telegram.WebApp.expand()`).
  - Haptic Feedback integration (`Telegram.WebApp.HapticFeedback.impactOccurred('light' | 'medium')`).
  - Native theme synchronization (`setHeaderColor`, `setBackgroundColor`).
- **Universal Routing**: Supports standard pathname routing (`/meditation`), GitHub Pages subpaths (`/tma-portfolio-suite/?app=meditation`), and hash routing (`/#/meditation`).
- **Zero Heavy Runtime Dependencies**: Ultra-fast vanilla ES modules ensuring instant <100ms load times on 3G/4G mobile networks.
- **Multilingual Engine**: Native RU / EN / UA switching with immediate DOM synchronization and `localStorage` persistence.

---

## 🚀 Deployment & Bot Setup

### Deploy to GitHub Pages (Static):
Push this repository to GitHub and enable Pages under **Settings → Pages → Source: Deploy from branch `main` / `root`**.

### Deploy to Vercel (One-Click):
```bash
npm install
npx vercel --prod
```

### Connect to Telegram Bot (@BotFather):
1. Open `@BotFather` in Telegram.
2. Send `/mybots` → select your bot → **Bot Settings** → **Menu Button** → **Configure menu button**.
3. Send your HTTPS link:
   ```text
   https://txltedxgod.github.io/tma-portfolio-suite/
   ```
4. Set the button title (e.g. `✨ Open App`).

---

<div align="center">
  <sub>Engineered by <b>txltedxgod (@seocry)</b> · 2026</sub>
</div>
