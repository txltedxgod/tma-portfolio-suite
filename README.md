# TMA Portfolio Suite

Seven mobile-first Telegram Mini Apps sharing an Obsidian Glass design system.

## Routes

- `/meditation`
- `/weather`
- `/crypto`
- `/language`
- `/real-estate`
- `/quiz`
- `/p2p`

## Local development

```bash
npm install
npm run dev
```

## Deploy to Vercel

```bash
npm install
npx vercel --prod
```

After deployment, paste the HTTPS route you need into BotFather → `/mybots` → Bot Settings → Menu Button → Configure menu button.

## Notes

- Telegram WebApp SDK is initialized automatically and calls `ready()` and `expand()`.
- The language switcher persists RU/EN/UA in `localStorage`.
- Weather and crypto use realistic demo feeds so the project works without API keys. Replace the data functions in `app.js` with your production provider.
- Real-estate booking calls `Telegram.WebApp.sendData()` inside Telegram and shows a browser fallback outside Telegram.
