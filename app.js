const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready?.();
  tg.expand?.();
  tg.setHeaderColor?.('#08090c');
  tg.setBackgroundColor?.('#08090c');
  tg.BackButton?.onClick?.(() => {
    haptic('light');
    navigate('/');
  });
}

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const app = $('#app');
const modalRoot = $('#modal-root');
let cleanup = () => {};
let lang = localStorage.getItem('tma-lang') || tg?.initDataUnsafe?.user?.language_code?.slice(0, 2) || 'ru';
if (!['ru', 'en', 'ua'].includes(lang)) lang = 'ru';

/* ─── Internationalization ─── */
const I18N = {
  ru: {
    live: 'LIVE', liveApi: '● LIVE API', navMeditation: 'Дыхание', navWeather: 'Погода', navCrypto: 'Крипто', navLanguage: 'Слова', navEstate: 'Недвижимость', navQuiz: 'Квиз', navP2p: 'P2P',
    suite: 'PORTFOLIO SUITE', homeTitle: '7 мини‑аппов. Одна система.', homeSub: 'Коллекция мобильных Telegram‑продуктов с единой темной дизайн‑системой.', explore: 'Открыть приложение', premium: 'PREMIUM',
    meditation: 'Медитация', meditationSub: 'Дышите глубже. Возвращайтесь к себе.', weather: 'Погода', weatherSub: 'Чистый прогноз без визуального шума.', crypto: 'Crypto Tracker', cryptoSub: 'Рынок, конвертер и портфель в одном экране.', language: 'Language Teacher', languageSub: 'Учите слова короткими ежедневными сессиями.', estate: 'Недвижимость', estateSub: 'Премиальные объекты и запись на просмотр.', quiz: 'Интерактивный квиз', quizSub: '15 секунд. Четыре варианта. Один ответ.', p2p: 'P2P Swap', p2pSub: 'Быстрые сделки с понятным escrow‑сценарием.',
    techniques: 'Техники', sounds: 'Фоновые звуки', sessions: 'Сессии', minutes: 'Минуты', streak: 'Стрик', start: 'Начать', pause: 'Пауза', reset: 'Сбросить', breatheIn: 'Вдох', hold: 'Задержка', breatheOut: 'Выдох', ready: 'Готовы?', volume: 'Громкость', rain: 'Дождь', fire: 'Костёр', forest: 'Лес', ocean: 'Ночной океан',
    cityPlaceholder: 'Найти город...', feels: 'Ощущается', humidity: 'Влажность', wind: 'Ветер', sunrise: 'Рассвет', sunset: 'Закат', hourly: '24 часа', week: '7 дней', demoData: 'Офлайн‑прогноз',
    markets: 'Рынок', updated: 'Обновляется в реальном времени', converter: 'Конвертер', portfolio: 'Портфель', amount: 'Сумма', total: 'Всего',
    flashcards: 'Карточки', learn: 'Учу', know: 'Знаю', dailyGoal: 'Цель дня', learned: 'Изучено', test: 'Мини‑тест дня', choose: 'Выберите правильный перевод', pronounce: 'Произношение', goalReached: 'Дневная цель достигнута! Отличный результат.',
    filters: 'Фильтры', rent: 'Аренда', buy: 'Покупка', all: 'Все', bedrooms: 'Спальни', anyPrice: 'Любая цена', viewing: 'Записаться на просмотр', perMonth: '/ месяц', sent: 'Заявка отправлена в Telegram',
    mortgageCalc: 'Ипотечный калькулятор', downPayment: 'Первый взнос', interestRate: 'Ставка', loanTerm: 'Срок', monthlyPay: 'Платёж в месяц', estYield: 'Доходность от аренды', years: 'лет',
    question: 'Вопрос', score: 'Счёт', again: 'Пройти заново', next: 'Далее', accuracy: 'Точность', timeUp: 'Время вышло',
    buyCrypto: 'Купить', sellCrypto: 'Продать', payment: 'Оплата', merchant: 'Мерчант', available: 'Доступно', limits: 'Лимиты', price: 'Цена', trade: 'Сделка', escrow: 'Безопасная сделка', order: 'Ордер', pay: 'Оплата', release: 'Получение', continue: 'Продолжить', confirm: 'Подтвердить сделку', protected: 'Активы защищены escrow до подтверждения оплаты.',
    walletBalance: 'Баланс кошелька', faucet: '+ Кран (+200 USDT)', faucetAdded: '+200 USDT зачислено на ваш баланс!', escrowReleased: 'Сделка завершена! 1,000 USDT зачислены на баланс.', verifyingTx: 'Проверка транзакции в блокчейне...', copyIban: 'Скопировать реквизиты', copied: 'Реквизиты скопированы!'
  },
  en: {
    live: 'LIVE', liveApi: '● LIVE API', navMeditation: 'Breathe', navWeather: 'Weather', navCrypto: 'Crypto', navLanguage: 'Words', navEstate: 'Property', navQuiz: 'Quiz', navP2p: 'P2P',
    suite: 'PORTFOLIO SUITE', homeTitle: '7 mini apps. One system.', homeSub: 'A mobile Telegram product collection with a unified dark design system.', explore: 'Open app', premium: 'PREMIUM',
    meditation: 'Meditation', meditationSub: 'Breathe deeper. Return to yourself.', weather: 'Weather', weatherSub: 'A clear forecast without visual noise.', crypto: 'Crypto Tracker', cryptoSub: 'Market, converter and portfolio in one view.', language: 'Language Teacher', languageSub: 'Learn words in short daily sessions.', estate: 'Real Estate', estateSub: 'Premium properties and instant viewing requests.', quiz: 'Interactive Quiz', quizSub: '15 seconds. Four choices. One answer.', p2p: 'P2P Swap', p2pSub: 'Fast trades with a transparent escrow flow.',
    techniques: 'Techniques', sounds: 'Ambient sounds', sessions: 'Sessions', minutes: 'Minutes', streak: 'Streak', start: 'Start', pause: 'Pause', reset: 'Reset', breatheIn: 'Inhale', hold: 'Hold', breatheOut: 'Exhale', ready: 'Ready?', volume: 'Volume', rain: 'Rain', fire: 'Fire', forest: 'Forest', ocean: 'Night ocean',
    cityPlaceholder: 'Search city...', feels: 'Feels like', humidity: 'Humidity', wind: 'Wind', sunrise: 'Sunrise', sunset: 'Sunset', hourly: '24 hours', week: '7 days', demoData: 'Offline forecast',
    markets: 'Market', updated: 'Live real-time updates', converter: 'Converter', portfolio: 'Portfolio', amount: 'Amount', total: 'Total',
    flashcards: 'Flashcards', learn: 'Learning', know: 'Know it', dailyGoal: 'Daily goal', learned: 'Learned', test: 'Daily mini test', choose: 'Choose the correct translation', pronounce: 'Pronounce', goalReached: 'Daily goal reached! Outstanding progress.',
    filters: 'Filters', rent: 'Rent', buy: 'Buy', all: 'All', bedrooms: 'Bedrooms', anyPrice: 'Any price', viewing: 'Book a viewing', perMonth: '/ month', sent: 'Request sent to Telegram',
    mortgageCalc: 'Mortgage Calculator', downPayment: 'Down payment', interestRate: 'Interest rate', loanTerm: 'Term', monthlyPay: 'Monthly payment', estYield: 'Rental yield', years: 'yrs',
    question: 'Question', score: 'Score', again: 'Try again', next: 'Next', accuracy: 'Accuracy', timeUp: 'Time is up',
    buyCrypto: 'Buy', sellCrypto: 'Sell', payment: 'Payment', merchant: 'Merchant', available: 'Available', limits: 'Limits', price: 'Price', trade: 'Trade', escrow: 'Secure trade', order: 'Order', pay: 'Payment', release: 'Release', continue: 'Continue', confirm: 'Confirm trade', protected: 'Assets stay in escrow until payment is confirmed.',
    walletBalance: 'Wallet balance', faucet: '+ Faucet (+200 USDT)', faucetAdded: '+200 USDT credited to your balance!', escrowReleased: 'Trade complete! 1,000 USDT credited to wallet.', verifyingTx: 'Verifying on-chain transaction...', copyIban: 'Copy payment info', copied: 'Payment details copied!'
  },
  ua: {
    live: 'LIVE', liveApi: '● LIVE API', navMeditation: 'Дихання', navWeather: 'Погода', navCrypto: 'Крипто', navLanguage: 'Слова', navEstate: 'Нерухомість', navQuiz: 'Квіз', navP2p: 'P2P',
    suite: 'PORTFOLIO SUITE', homeTitle: '7 мініапів. Одна система.', homeSub: 'Колекція мобільних Telegram‑продуктів з єдиною темною дизайн‑системою.', explore: 'Відкрити застосунок', premium: 'PREMIUM',
    meditation: 'Медитація', meditationSub: 'Дихайте глибше. Повертайтеся до себе.', weather: 'Погода', weatherSub: 'Чистий прогноз без візуального шуму.', crypto: 'Crypto Tracker', cryptoSub: 'Ринок, конвертер і портфель на одному екрані.', language: 'Language Teacher', languageSub: 'Вивчайте слова короткими щоденними сесіями.', estate: 'Нерухомість', estateSub: 'Преміальні об’єкти та запис на перегляд.', quiz: 'Інтерактивний квіз', quizSub: '15 секунд. Чотири варіанти. Одна відповідь.', p2p: 'P2P Swap', p2pSub: 'Швидкі угоди зі зрозумілим escrow‑сценарієм.',
    techniques: 'Техніки', sounds: 'Фонові звуки', sessions: 'Сесії', minutes: 'Хвилини', streak: 'Серія', start: 'Почати', pause: 'Пауза', reset: 'Скинути', breatheIn: 'Вдих', hold: 'Затримка', breatheOut: 'Видих', ready: 'Готові?', volume: 'Гучність', rain: 'Дощ', fire: 'Багаття', forest: 'Ліс', ocean: 'Нічний океан',
    cityPlaceholder: 'Знайти місто...', feels: 'Відчувається', humidity: 'Вологість', wind: 'Вітер', sunrise: 'Світанок', sunset: 'Захід', hourly: '24 години', week: '7 днів', demoData: 'Офлайн‑прогноз',
    markets: 'Ринок', updated: 'Оновлення в реальному часі', converter: 'Конвертер', portfolio: 'Портфель', amount: 'Сума', total: 'Усього',
    flashcards: 'Картки', learn: 'Вчу', know: 'Знаю', dailyGoal: 'Ціль дня', learned: 'Вивчено', test: 'Мінітест дня', choose: 'Оберіть правильний переклад', pronounce: 'Вимова', goalReached: 'Денну ціль досягнуто! Чудовий результат.',
    filters: 'Фільтри', rent: 'Оренда', buy: 'Купівля', all: 'Усі', bedrooms: 'Спальні', anyPrice: 'Будь-яка ціна', viewing: 'Записатися на перегляд', perMonth: '/ місяць', sent: 'Заявку надіслано в Telegram',
    mortgageCalc: 'Іпотечний калькулятор', downPayment: 'Перший внесок', interestRate: 'Ставка', loanTerm: 'Термін', monthlyPay: 'Щомісячний платіж', estYield: 'Дохідність оренди', years: 'р.',
    question: 'Питання', score: 'Рахунок', again: 'Пройти ще раз', next: 'Далі', accuracy: 'Точність', timeUp: 'Час вийшов',
    buyCrypto: 'Купити', sellCrypto: 'Продати', payment: 'Оплата', merchant: 'Мерчант', available: 'Доступно', limits: 'Ліміти', price: 'Ціна', trade: 'Угода', escrow: 'Безпечна угода', order: 'Ордер', pay: 'Оплата', release: 'Отримання', continue: 'Продовжити', confirm: 'Підтвердити угоду', protected: 'Активи захищені escrow до підтвердження оплати.',
    walletBalance: 'Баланс гаманця', faucet: '+ Кран (+200 USDT)', faucetAdded: '+200 USDT зараховано на ваш баланс!', escrowReleased: 'Угоду завершено! 1,000 USDT зараховано на гаманець.', verifyingTx: 'Перевірка транзакції в блокчейні...', copyIban: 'Скопіювати реквізити', copied: 'Реквізити скопійовано!'
  }
};

const t = key => I18N[lang]?.[key] ?? I18N.en[key] ?? key;
const haptic = (type = 'light') => { try { tg?.HapticFeedback?.impactOccurred?.(type); } catch {} };
const notify = (type = 'success') => { try { tg?.HapticFeedback?.notificationOccurred?.(type); } catch {} };
const fmt = n => new Intl.NumberFormat(lang === 'ua' ? 'uk-UA' : lang === 'ru' ? 'ru-RU' : 'en-US', { maximumFractionDigits: 2 }).format(n);

function toast(message) {
  const el = $('#toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove('show'), 2400);
}

/* ─── Web Audio API Sound Synthesizer ─── */
let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function playSingingBowl() {
  try {
    const ctx = getAudioCtx();
    const t0 = ctx.currentTime;
    [432, 864, 1296].forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t0);
      const vol = i === 0 ? 0.32 : 0.12 / (i + 1);
      gain.gain.setValueAtTime(vol, t0);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 2.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + 2.6);
    });
  } catch {}
}

function playChime(success = true) {
  try {
    const ctx = getAudioCtx();
    const t0 = ctx.currentTime;
    if (success) {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, t0 + i * 0.07);
        gain.gain.setValueAtTime(0, t0 + i * 0.07);
        gain.gain.linearRampToValueAtTime(0.18, t0 + i * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t0 + i * 0.07 + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t0 + i * 0.07);
        osc.stop(t0 + i * 0.07 + 0.5);
      });
    } else {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(145, t0);
      osc.frequency.linearRampToValueAtTime(95, t0 + 0.28);
      gain.gain.setValueAtTime(0.18, t0);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + 0.32);
    }
  } catch {}
}

/* ─── Web Speech API Pronunciation ─── */
function speakWord(text, speechLang = 'en-US') {
  try {
    if (!('speechSynthesis' in window)) {
      toast('Speech synthesis unsupported');
      return;
    }
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = speechLang;
    utt.rate = 0.92;
    window.speechSynthesis.speak(utt);
  } catch {}
}

/* ─── Zero-Dependency Canvas Confetti Explosion ─── */
let confettiCanvas, confettiCtx, confettiParticles = [], confettiAnimId = null;
function getConfetti() {
  if (!confettiCanvas) {
    confettiCanvas = $('#confetti-canvas');
    if (!confettiCanvas) {
      confettiCanvas = document.createElement('canvas');
      confettiCanvas.id = 'confetti-canvas';
      document.body.appendChild(confettiCanvas);
    }
    confettiCtx = confettiCanvas.getContext('2d');
    const resize = () => {
      confettiCanvas.width = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();
  }
  return { canvas: confettiCanvas, ctx: confettiCtx };
}

function fireConfetti(count = 70) {
  const { canvas, ctx } = getConfetti();
  const colors = ['#00f2fe', '#4facfe', '#7928ca', '#f59e0b', '#10b981', '#f43f5e', '#a78bfa', '#facc15'];
  const now = performance.now();
  for (let i = 0; i < count; i++) {
    confettiParticles.push({
      x: canvas.width * (0.35 + Math.random() * 0.3),
      y: canvas.height * 0.45,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.82) * 18,
      size: 5 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * 360,
      vrot: (Math.random() - 0.5) * 12,
      born: now,
      life: 1800 + Math.random() * 800
    });
  }
  if (!confettiAnimId) {
    const loop = time => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettiParticles = confettiParticles.filter(p => time - p.born < p.life);
      confettiParticles.forEach(p => {
        p.vy += 0.38;
        p.vx *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;
        const alpha = Math.max(0, 1 - (time - p.born) / p.life);
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });
      if (confettiParticles.length > 0) {
        confettiAnimId = requestAnimationFrame(loop);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confettiAnimId = null;
      }
    };
    confettiAnimId = requestAnimationFrame(loop);
  }
}

function pageHero(eyebrow, title, subtitle) {
  return `<section class="hero"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p>${subtitle}</p></div></section>`;
}

/* ─── Home Screen ─── */
const appCards = [
  ['meditation', '◌', 'meditation', 'meditationSub', 'rgba(0,242,254,.35)'],
  ['weather', '☼', 'weather', 'weatherSub', 'rgba(245,158,11,.35)'],
  ['crypto', '◇', 'crypto', 'cryptoSub', 'rgba(121,40,202,.42)'],
  ['language', '文', 'language', 'languageSub', 'rgba(16,185,129,.34)'],
  ['real-estate', '⌂', 'estate', 'estateSub', 'rgba(245,158,11,.28)'],
  ['quiz', '◎', 'quiz', 'quizSub', 'rgba(0,242,254,.3)'],
  ['p2p', '⇄', 'p2p', 'p2pSub', 'rgba(121,40,202,.4)']
];

function renderHome() {
  app.innerHTML = `<div class="page">${pageHero(t('suite'), t('homeTitle'), t('homeSub'))}
    <section class="grid app-grid">${appCards.map((c, i) => `
      <a class="glass app-card ${i > 4 ? 'wide' : ''}" href="/${c[0]}" data-link style="--accent:${c[4]}">
        <div class="app-icon">${c[1]}</div>
        <div>
          <h2>${t(c[2])}</h2>
          <p>${t(c[3])}</p>
          <span class="card-link">${t('explore')} <b>↗</b></span>
        </div>
      </a>`).join('')}
    </section>
  </div>`;
}

/* ─── 1. Meditation & Breathwork ─── */
const techniques = { '4-7-8': [4, 7, 8], Box: [4, 4, 4, 4], Relax: [5, 2, 6] };
let ambientNode;
function stopAmbient() {
  if (ambientNode) {
    try { ambientNode.stop(); } catch {}
    ambientNode.disconnect?.();
    ambientNode = null;
  }
}
function startAmbient(type, volume = 0.35) {
  stopAmbient();
  const ctx = getAudioCtx();
  const len = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < len; i++) {
    data[i] = (Math.random() * 2 - 1) * (type === 'fire' && Math.random() > 0.985 ? 2.8 : 1);
  }
  const src = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  src.buffer = buffer;
  src.loop = true;
  filter.type = type === 'ocean' ? 'lowpass' : type === 'forest' ? 'bandpass' : 'highpass';
  filter.frequency.value = type === 'ocean' ? 420 : type === 'forest' ? 1200 : 2600;
  gain.gain.value = volume * 0.25;
  src.connect(filter).connect(gain).connect(ctx.destination);
  src.start();
  src.gainNode = gain;
  ambientNode = src;
}

function renderMeditation() {
  const stats = JSON.parse(localStorage.getItem('meditation-stats') || '{"sessions":14,"minutes":92,"streak":5}');
  app.innerHTML = `<div class="page">${pageHero('01 · MINDFULNESS', t('meditation'), t('meditationSub'))}
    <div class="grid grid-3">
      <div class="glass stat"><span class="icon">◌</span><div><strong>${stats.sessions}</strong><small>${t('sessions')}</small></div></div>
      <div class="glass stat"><span class="icon">⌁</span><div><strong>${stats.minutes}</strong><small>${t('minutes')}</small></div></div>
      <div class="glass stat"><span class="icon">↗</span><div><strong>${stats.streak}</strong><small>${t('streak')}</small></div></div>
    </div>
    <div class="grid meditation-layout">
      <section class="glass panel breathe-panel">
        <div>
          <div class="chips" id="techniques">${Object.keys(techniques).map((x, i) => `<button class="chip ${!i ? 'active' : ''}" data-tech="${x}">${x}</button>`).join('')}</div>
          <div class="breath-ring" id="breath-ring">
            <div class="breath-core">
              <div><strong id="breath-time">04:00</strong><span id="breath-label">${t('ready')}</span></div>
            </div>
          </div>
          <div class="timer-actions">
            <button class="btn btn-primary" id="timer-start">▶ ${t('start')}</button>
            <button class="btn icon-btn" id="timer-reset" aria-label="${t('reset')}">↺</button>
          </div>
        </div>
      </section>
      <aside class="glass panel">
        <div class="section-title"><h2>${t('sounds')}</h2><small>${t('volume')}</small></div>
        <input class="range" id="sound-volume" type="range" min="0" max="100" value="35" aria-label="${t('volume')}">
        ${[['rain', '╱', t('rain')], ['fire', '✦', t('fire')], ['forest', '♧', t('forest')], ['ocean', '≈', t('ocean')]].map(x => `
          <div class="sound-row">
            <span class="sound-icon">${x[1]}</span>
            <div><b>${x[2]}</b><small>Ambient loop</small></div>
            <button class="sound-toggle" data-sound="${x[0]}" aria-label="${x[2]}"></button>
          </div>`).join('')}
      </aside>
    </div>
  </div>`;

  let total = 240, remain = 240, running = false, timer = null, tech = '4-7-8', phase = 0, phaseLeft = techniques[tech][0];
  const ring = $('#breath-ring'), label = $('#breath-label'), time = $('#breath-time'), start = $('#timer-start');
  const phaseNames = () => [t('breatheIn'), t('hold'), t('breatheOut'), t('hold')];

  function paint() {
    time.textContent = `${String(Math.floor(remain / 60)).padStart(2, '0')}:${String(remain % 60).padStart(2, '0')}`;
    ring.style.setProperty('--progress', `${(1 - remain / total) * 360}deg`);
    label.textContent = running ? `${phaseNames()[phase]} · ${phaseLeft}` : t('ready');
    ring.classList.toggle('inhale', running && phase === 0);
    ring.classList.toggle('exhale', running && phase === 2);
    start.innerHTML = running ? `Ⅱ ${t('pause')}` : `▶ ${t('start')}`;
  }

  function tick() {
    if (remain <= 0) {
      clearInterval(timer);
      running = false;
      stats.sessions++;
      stats.minutes += 4;
      localStorage.setItem('meditation-stats', JSON.stringify(stats));
      playSingingBowl();
      fireConfetti(50);
      notify();
      toast(t('sessions') + ' +1');
      paint();
      return;
    }
    remain--;
    phaseLeft--;
    if (phaseLeft <= 0) {
      phase = (phase + 1) % techniques[tech].length;
      phaseLeft = techniques[tech][phase];
      haptic();
      playSingingBowl();
    }
    paint();
  }

  start.onclick = () => {
    running = !running;
    if (running) {
      getAudioCtx();
      timer = setInterval(tick, 1000);
      playSingingBowl();
    } else {
      clearInterval(timer);
    }
    paint();
  };

  $('#timer-reset').onclick = () => {
    clearInterval(timer);
    running = false;
    remain = total;
    phase = 0;
    phaseLeft = techniques[tech][0];
    paint();
  };

  $$('#techniques .chip').forEach(b => b.onclick = () => {
    $$('#techniques .chip').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    tech = b.dataset.tech;
    phase = 0;
    phaseLeft = techniques[tech][0];
    haptic();
  });

  $$('.sound-toggle').forEach(b => b.onclick = () => {
    const was = b.classList.contains('active');
    $$('.sound-toggle').forEach(x => x.classList.remove('active'));
    stopAmbient();
    if (!was) {
      b.classList.add('active');
      startAmbient(b.dataset.sound, +$('#sound-volume').value / 100);
    }
    haptic();
  });

  $('#sound-volume').oninput = e => {
    if (ambientNode?.gainNode) ambientNode.gainNode.gain.value = (+e.target.value / 100) * 0.25;
  };

  cleanup = () => { clearInterval(timer); stopAmbient(); };
  paint();
}

/* ─── 2. Live Weather API (Open-Meteo) ─── */
const weatherPresets = ['Kyiv', 'Prague', 'Warsaw', 'London', 'Dubai', 'Tokyo', 'Budapest', 'Lviv'];

const weatherCodeMap = {
  0: ['Clear sky', '☼'], 1: ['Mainly clear', '☼'], 2: ['Partly cloudy', '◒'], 3: ['Overcast', '☁'],
  45: ['Fog', '☁'], 48: ['Depositing rime fog', '☁'],
  51: ['Light drizzle', '☂'], 53: ['Moderate drizzle', '☂'], 55: ['Dense drizzle', '☂'],
  61: ['Slight rain', '☂'], 63: ['Moderate rain', '☂'], 65: ['Heavy rain', '☂'],
  71: ['Slight snow', '❄'], 73: ['Moderate snow', '❄'], 75: ['Heavy snow', '❄'],
  80: ['Rain showers', '☂'], 81: ['Heavy rain showers', '☂'], 82: ['Violent rain showers', '☂'],
  95: ['Thunderstorm', '⚡'], 96: ['Thunderstorm with hail', '⚡']
};

async function fetchLiveWeather(cityName) {
  try {
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`);
    const geoData = await geoRes.json();
    if (!geoData.results || !geoData.results.length) return null;
    const { latitude, longitude, name, country } = geoData.results[0];

    const wxRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`);
    const wxData = await wxRes.json();

    const cur = wxData.current;
    const [desc, icon] = weatherCodeMap[cur.weather_code] || ['Clear intervals', '☼'];
    const curHour = new Date().getHours();

    const hourly = [];
    for (let i = 0; i < 24; i++) {
      const idx = curHour + i;
      const t = wxData.hourly.temperature_2m[idx] ?? Math.round(cur.temperature_2m);
      const code = wxData.hourly.weather_code[idx] ?? cur.weather_code;
      const sym = (weatherCodeMap[code] || ['Clear', '☼'])[1];
      hourly.push({ time: `${String(idx % 24).padStart(2, '0')}:00`, temp: Math.round(t), sym });
    }

    const week = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 0; i < Math.min(7, wxData.daily.time.length); i++) {
      const dObj = new Date(wxData.daily.time[i]);
      const dayName = days[dObj.getDay()];
      const max = Math.round(wxData.daily.temperature_2m_max[i]);
      const min = Math.round(wxData.daily.temperature_2m_min[i]);
      const sym = (weatherCodeMap[wxData.daily.weather_code[i]] || ['Clear', '☼'])[1];
      week.push({ day: dayName, max, min, sym });
    }

    const sunrise = wxData.daily.sunrise[0]?.split('T')[1]?.slice(0, 5) || '06:15';
    const sunset = wxData.daily.sunset[0]?.split('T')[1]?.slice(0, 5) || '19:40';

    return {
      live: true,
      city: `${name}${country ? ', ' + country : ''}`,
      temp: Math.round(cur.temperature_2m),
      feels: Math.round(cur.apparent_temperature),
      humidity: Math.round(cur.relative_humidity_2m),
      wind: Math.round(cur.wind_speed_10m),
      desc,
      icon,
      sunrise,
      sunset,
      hourly,
      week
    };
  } catch {
    return null;
  }
}

function getFallbackWeather(cityName) {
  let seed = [...cityName].reduce((a, c) => a + c.charCodeAt(0), 0);
  const temp = 14 + (seed % 17);
  const feels = temp - 2;
  const humidity = 50 + (seed % 35);
  const wind = 8 + (seed % 14);
  const icons = ['☼', '◒', '☁', '☂'];
  const desc = temp > 22 ? 'Clear sky' : temp > 16 ? 'Partly cloudy' : 'Overcast';
  const icon = icons[seed % icons.length];
  const curHour = new Date().getHours();

  const hourly = Array.from({ length: 24 }, (_, i) => ({
    time: `${String((curHour + i) % 24).padStart(2, '0')}:00`,
    temp: Math.round(temp + Math.sin(i / 3.8) * 4),
    sym: icons[(seed + i) % icons.length]
  }));

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const week = days.map((d, i) => ({
    day: d,
    max: temp + (i % 3),
    min: temp - 6 - (i % 2),
    sym: icons[(seed + i * 2) % icons.length]
  }));

  return {
    live: false,
    city: cityName,
    temp,
    feels,
    humidity,
    wind,
    desc,
    icon,
    sunrise: '06:20',
    sunset: '19:45',
    hourly,
    week
  };
}

async function renderWeather(cityName = 'Kyiv') {
  app.innerHTML = `<div class="page">${pageHero('02 · ATMOSPHERE', t('weather'), t('weatherSub'))}
    <section class="glass weather-hero" style="min-height:360px">
      <form class="weather-search" id="weather-form">
        <input class="input" id="city-input" value="${cityName}" placeholder="${t('cityPlaceholder')}" aria-label="${t('cityPlaceholder')}">
        <button class="btn icon-btn" type="submit" aria-label="Search">⌕</button>
      </form>
      <div class="city-presets" id="city-presets">
        ${weatherPresets.map(c => `<button class="chip ${c.toLowerCase() === cityName.toLowerCase() ? 'active' : ''}" data-city="${c}">${c}</button>`).join('')}
      </div>
      <div class="weather-main" style="margin-top:28px">
        <div>
          <div class="weather-city" id="wx-city">${cityName} <small id="wx-desc">Loading live API...</small></div>
          <div class="temperature" id="wx-temp">--<sup>°</sup></div>
        </div>
        <div class="weather-symbol" id="wx-symbol">☼</div>
      </div>
    </section>
    <div id="wx-details" style="opacity:0.4;pointer-events:none">
      <section class="grid grid-4">
        <div class="glass stat"><span class="icon">◔</span><div><strong id="wx-feels">--°</strong><small>${t('feels')}</small></div></div>
        <div class="glass stat"><span class="icon">⌁</span><div><strong id="wx-humidity">--%</strong><small>${t('humidity')}</small></div></div>
        <div class="glass stat"><span class="icon">→</span><div><strong id="wx-wind">--</strong><small>${t('wind')} · km/h</small></div></div>
        <div class="glass stat"><span class="icon">☼</span><div><strong id="wx-sun">06:14</strong><small>${t('sunrise')} / ${t('sunset')}</small></div></div>
      </section>
      <section class="glass panel"><div class="section-title"><h2>${t('hourly')}</h2><small id="wx-hour-label">${cityName}</small></div><div class="hourly" id="wx-hourly"></div></section>
      <section class="glass panel"><div class="section-title"><h2>${t('week')}</h2><small id="wx-week-label">7-day outlook</small></div><div id="wx-week"></div></section>
    </div>
  </div>`;

  const setupEvents = () => {
    $('#weather-form').onsubmit = e => {
      e.preventDefault();
      const c = $('#city-input').value.trim();
      if (c) { haptic(); renderWeather(c); }
    };
    $$('#city-presets .chip').forEach(btn => {
      btn.onclick = () => {
        haptic();
        renderWeather(btn.dataset.city);
      };
    });
  };
  setupEvents();

  let data = await fetchLiveWeather(cityName);
  if (!data) data = getFallbackWeather(cityName);

  const cityEl = $('#wx-city');
  if (!cityEl) return;

  cityEl.innerHTML = `${data.city} <small>${data.desc} · <span style="color:${data.live ? '#10b981' : '#f59e0b'}">${data.live ? t('liveApi') : t('demoData')}</span></small>`;
  $('#wx-temp').innerHTML = `${data.temp}<sup>°</sup>`;
  $('#wx-symbol').textContent = data.icon;
  $('#wx-feels').textContent = `${data.feels}°`;
  $('#wx-humidity').textContent = `${data.humidity}%`;
  $('#wx-wind').textContent = `${data.wind}`;
  $('#wx-sun').textContent = `${data.sunrise} · ${data.sunset}`;

  $('#wx-hourly').innerHTML = data.hourly.map(h => `
    <div class="glass hour">
      <small>${h.time}</small>
      <i>${h.sym}</i>
      <b>${h.temp}°</b>
    </div>`).join('');

  $('#wx-week').innerHTML = data.week.map((w, i) => `
    <div class="forecast-row">
      <b>${w.day}</b>
      <span>${w.sym}</span>
      <span>${w.max}° / ${w.min}°</span>
      <div class="temp-bar" style="opacity:${0.45 + i * 0.08}"></div>
    </div>`).join('');

  const details = $('#wx-details');
  if (details) {
    details.style.opacity = '1';
    details.style.pointerEvents = 'auto';
  }
}

/* ─── 3. Live Crypto Tracker (Binance Public Ticker) ─── */
const coins = [
  { s: 'BTC', n: 'Bitcoin', p: 68420.12, c: 2.84, color: '#f59e0b', pts: [7, 9, 8, 12, 11, 15, 14, 19, 18, 22] },
  { s: 'ETH', n: 'Ethereum', p: 3891.44, c: 1.43, color: '#a78bfa', pts: [18, 15, 16, 14, 17, 13, 14, 11, 13, 10] },
  { s: 'TON', n: 'Toncoin', p: 7.12, c: 4.78, color: '#00f2fe', pts: [16, 14, 15, 12, 11, 13, 9, 8, 5, 4] },
  { s: 'SOL', n: 'Solana', p: 172.83, c: -1.26, color: '#10b981', pts: [7, 6, 9, 8, 12, 11, 14, 13, 17, 19] },
  { s: 'BNB', n: 'BNB', p: 604.21, c: 0.64, color: '#facc15', pts: [18, 17, 14, 16, 12, 13, 10, 8, 9, 6] }
];

function spark(points, up) {
  const max = Math.max(...points), min = Math.min(...points);
  const pts = points.map((v, i) => `${i * 12.4},${34 - ((v - min) / (max - min || 1)) * 28}`).join(' ');
  return `<svg class="spark" viewBox="0 0 112 38" aria-hidden="true"><polyline points="${pts}" fill="none" stroke="${up ? '#34d399' : '#fb7185'}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

async function fetchBinancePrices() {
  try {
    const res = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbols=["BTCUSDT","ETHUSDT","TONUSDT","SOLUSDT","BNBUSDT"]');
    if (!res.ok) return null;
    const list = await res.json();
    return list;
  } catch {
    return null;
  }
}

function renderCrypto() {
  app.innerHTML = `<div class="page">${pageHero('03 · DIGITAL ASSETS', t('crypto'), t('cryptoSub'))}
    <section class="glass panel">
      <div class="section-title">
        <h2>${t('markets')}</h2>
        <small id="crypto-live-badge"><span style="color:#34d399">●</span> ${t('updated')}</small>
      </div>
      <div id="markets"></div>
    </section>
    <div class="grid grid-2">
      <section class="glass panel">
        <h2>${t('converter')}</h2>
        <div class="converter">
          <div class="field">
            <label>${t('amount')}</label>
            <div class="input-group">
              <input class="input" id="crypto-amount" type="number" value="1" min="0" step="any">
              <select class="select" id="crypto-from">${coins.map(c => `<option>${c.s}</option>`).join('')}</select>
            </div>
          </div>
          <span class="swap-arrow">⇄</span>
          <div class="field">
            <label>${t('total')}</label>
            <div class="input-group">
              <input class="input" id="crypto-result" readonly>
              <select class="select" id="crypto-to">
                <option>USD</option><option>EUR</option><option>UAH</option><option>RUB</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      <section class="glass panel">
        <h2>${t('portfolio')}</h2>
        <div class="portfolio">
          <div class="donut"><span>${t('total')}<b>$24,860</b></span></div>
          <div class="legend">${[['BTC', '#00f2fe', '48%'], ['ETH', '#a78bfa', '30%'], ['TON', '#10b981', '13%'], ['Other', '#f59e0b', '9%']].map(x => `
            <div class="legend-row"><span><i style="background:${x[1]}"></i>${x[0]}</span><b>${x[2]}</b></div>`).join('')}
          </div>
        </div>
      </section>
    </div>
  </div>`;

  const renderMarket = (animCoin = null, isUp = true) => {
    const el = $('#markets');
    if (!el) return;
    el.innerHTML = coins.map(c => `
      <div class="market-row ${animCoin === c.s ? (isUp ? 'flash-up' : 'flash-down') : ''}">
        <div class="coin"><span class="coin-icon" style="--coin:${c.color}">${c.s[0]}</span><div><b>${c.n}</b><small>${c.s}</small></div></div>
        <div class="price">$${fmt(c.p)}</div>
        ${spark(c.pts, c.c >= 0)}
        <div class="change ${c.c >= 0 ? 'up' : 'down'}">${c.c >= 0 ? '+' : ''}${c.c.toFixed(2)}%</div>
      </div>`).join('');
  };

  const convert = () => {
    const fromEl = $('#crypto-from');
    if (!fromEl) return;
    const c = coins.find(x => x.s === fromEl.value);
    const rates = { USD: 1, EUR: 0.92, UAH: 41.2, RUB: 91.4 };
    const to = $('#crypto-to').value;
    const amount = +$('#crypto-amount').value || 0;
    $('#crypto-result').value = fmt(amount * (c ? c.p : 1) * rates[to]);
  };

  ['crypto-amount', 'crypto-from', 'crypto-to'].forEach(id => {
    const el = $('#' + id);
    if (el) el.addEventListener('input', convert);
  });

  renderMarket();
  convert();

  const updateCryptoData = async () => {
    const liveTickers = await fetchBinancePrices();
    if (liveTickers && liveTickers.length) {
      const badge = $('#crypto-live-badge');
      if (badge) badge.innerHTML = `<span style="color:#10b981">${t('liveApi')}</span> · Binance 24h`;
      liveTickers.forEach(t => {
        const sym = t.symbol.replace('USDT', '');
        const target = coins.find(x => x.s === sym);
        if (target) {
          const newPrice = parseFloat(t.lastPrice);
          const isUp = newPrice >= target.p;
          target.p = newPrice;
          target.c = parseFloat(t.priceChangePercent);
          target.pts = [...target.pts.slice(1), target.p];
          renderMarket(sym, isUp);
        }
      });
      convert();
    } else {
      // Smooth fallback simulation
      const randomCoin = coins[Math.floor(Math.random() * coins.length)];
      const delta = (Math.random() - 0.49) * 0.003;
      const oldPrice = randomCoin.p;
      randomCoin.p *= (1 + delta);
      randomCoin.c += (Math.random() - 0.5) * 0.08;
      randomCoin.pts = [...randomCoin.pts.slice(1), randomCoin.pts.at(-1) + (Math.random() - 0.48) * 3];
      renderMarket(randomCoin.s, randomCoin.p >= oldPrice);
      convert();
    }
  };

  updateCryptoData();
  const timer = setInterval(updateCryptoData, 3500);
  cleanup = () => clearInterval(timer);
}

/* ─── 4. Language Teacher & Pronunciation ─── */
const words = [
  ['Serendipity', 'Счастливая случайность', 'Щасливий випадок', 'A fortunate discovery by chance'],
  ['Resilient', 'Стойкий / Несгибаемый', 'Стійкий / Незламний', 'Able to withstand and recover quickly'],
  ['Vivid', 'Яркий / Отчётливый', 'Яскравий / Чіткий', 'Producing powerful, detailed feelings or images'],
  ['Curious', 'Любознательный', 'Допитливий', 'Eager to know or learn new things'],
  ['Thrive', 'Процветать / Развиваться', 'Процвітати / Розвиватися', 'To grow, develop, and flourish vigorously'],
  ['Insight', 'Озарение / Понимание', 'Прозріння / Розуміння', 'A deep and clear understanding of a complex issue'],
  ['Luminous', 'Светящийся / Ясный', 'Сяючий / Променистий', 'Emitting light or clearly understandable']
];

function renderLanguage() {
  let index = 0, learned = +(localStorage.getItem('words-learned') || 4), startX = 0, dx = 0;
  app.innerHTML = `<div class="page">${pageHero('04 · DAILY PRACTICE', t('language'), t('languageSub'))}
    <div class="grid grid-3">
      <div class="glass stat"><div class="goal-ring" id="goal-ring" style="--goal:${Math.min(100, learned * 10)}%"><b id="goal-num">${learned}/10</b><small>${t('dailyGoal')}</small></div></div>
      <div class="glass stat"><span class="icon">↗</span><div><strong>14</strong><small>${t('streak')}</small></div></div>
      <div class="glass stat"><span class="icon">✓</span><div><strong id="learned-count">${learned}</strong><small>${t('learned')}</small></div></div>
    </div>
    <div class="grid language-layout">
      <section class="glass panel flash-zone">
        <div>
          <div class="flashcard" id="flashcard"></div>
          <div class="swipe-actions">
            <button class="btn btn-danger" id="learn-btn">← ${t('learn')}</button>
            <button class="speaker-btn" id="word-speech" title="${t('pronounce')}" aria-label="${t('pronounce')}">🔊</button>
            <button class="btn btn-green" id="know-btn">${t('know')} →</button>
          </div>
        </div>
      </section>
      <aside class="glass panel">
        <p class="eyebrow">${t('test')}</p>
        <h2>${t('choose')}</h2>
        <div style="font-size:32px;font-weight:700;margin:24px 0 12px;letter-spacing:-.02em">Resilient</div>
        <div id="mini-answers">${(lang === 'ua' ? ['Хиткий', 'Стійкий', 'Повільний', 'Спокійний'] : ['Хрупкий', 'Стойкий', 'Медленный', 'Спокойный']).map((x, i) => `
          <button class="answer" data-correct="${i === 1}">${x}</button>`).join('')}
        </div>
      </aside>
    </div>
  </div>`;

  const card = $('#flashcard');
  const paint = () => {
    const w = words[index % words.length];
    const tr = lang === 'en' ? w[3] : lang === 'ua' ? w[2] : w[1];
    card.innerHTML = `
      <div class="flash-meta"><span>EN → ${lang.toUpperCase()}</span><span>${index + 1}/${words.length}</span></div>
      <div>
        <div class="word">${w[0]}</div>
        <div class="translation">${tr}</div>
      </div>
      <div class="flash-meta"><span>↔ SWIPE / 🔊 AUDIO</span><span>SEOCRY WORDS</span></div>`;
    card.style.transform = '';
    card.style.opacity = '1';
  };

  const next = known => {
    card.style.transform = `translateX(${known ? 120 : -120}px) rotate(${known ? 6 : -6}deg)`;
    card.style.opacity = '0';
    if (known) {
      learned++;
      localStorage.setItem('words-learned', learned);
      $('#learned-count').textContent = learned;
      $('#goal-num').textContent = `${learned}/10`;
      $('#goal-ring').style.setProperty('--goal', `${Math.min(100, learned * 10)}%`);
      if (learned === 10) {
        fireConfetti(80);
        playChime(true);
        toast(t('goalReached'));
      }
    }
    haptic();
    setTimeout(() => {
      index = (index + 1) % words.length;
      paint();
    }, 220);
  };

  $('#know-btn').onclick = () => next(true);
  $('#learn-btn').onclick = () => next(false);

  $('#word-speech').onclick = () => {
    const w = words[index % words.length];
    speakWord(w[0]);
    haptic('light');
  };

  card.onpointerdown = e => {
    startX = e.clientX;
    dx = 0;
    card.setPointerCapture(e.pointerId);
    card.classList.add('dragging');
  };
  card.onpointermove = e => {
    if (!startX) return;
    dx = e.clientX - startX;
    card.style.transform = `translateX(${dx}px) rotate(${dx / 24}deg)`;
  };
  card.onpointerup = () => {
    card.classList.remove('dragging');
    startX = 0;
    if (Math.abs(dx) > 75) {
      next(dx > 0);
    } else {
      card.style.transform = '';
    }
  };

  $$('#mini-answers .answer').forEach(b => b.onclick = () => {
    if ($$('#mini-answers .correct, #mini-answers .wrong').length) return;
    const isOk = b.dataset.correct === 'true';
    b.classList.add(isOk ? 'correct' : 'wrong');
    playChime(isOk);
    notify(isOk ? 'success' : 'error');
    if (isOk) fireConfetti(45);
    if (!isOk) {
      const correctBtn = $$('#mini-answers .answer').find(x => x.dataset.correct === 'true');
      if (correctBtn) correctBtn.classList.add('correct');
    }
  });

  paint();
}

/* ─── 5. Real Estate & Mortgage Yield Calculator ─── */
const properties = [
  { id: 1, type: 'buy', beds: 3, price: 1280000, title: 'Skyline Residence', place: 'Budapest · District V', area: 186, rentEst: 5400, imgs: ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=82', 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=82'] },
  { id: 2, type: 'rent', beds: 2, price: 4800, title: 'Riverside Loft', place: 'Kyiv · Podil', area: 128, rentEst: 4800, imgs: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=82', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=82'] },
  { id: 3, type: 'buy', beds: 4, price: 2460000, title: 'Skyline Azure Villa', place: 'Dubai · Palm Jumeirah', area: 412, rentEst: 14500, imgs: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=82', 'https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1000&q=82'] },
  { id: 4, type: 'rent', beds: 1, price: 2600, title: 'Gallery Apartment', place: 'Warsaw · Śródmieście', area: 78, rentEst: 2600, imgs: ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=82', 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1000&q=82'] }
];

function renderEstate() {
  app.innerHTML = `<div class="page">${pageHero('05 · PRIME COLLECTION', t('estate'), t('estateSub'))}
    <section class="glass panel">
      <div class="section-title"><h2>${t('filters')}</h2><small>CURATED</small></div>
      <div class="filter-row">
        <select class="select" id="estate-type"><option value="all">${t('all')}</option><option value="rent">${t('rent')}</option><option value="buy">${t('buy')}</option></select>
        <select class="select" id="estate-beds"><option value="0">${t('bedrooms')}: ${t('all')}</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option></select>
        <select class="select" id="estate-price"><option value="9999999">${t('anyPrice')}</option><option value="5000">≤ $5K</option><option value="1500000">≤ $1.5M</option><option value="3000000">≤ $3M</option></select>
      </div>
    </section>

    <!-- Interactive Mortgage & Yield Calculator -->
    <section class="glass mortgage-box">
      <div class="section-title">
        <h2>${t('mortgageCalc')}</h2>
        <small id="calc-prop-label">Skyline Azure Villa ($2,460,000)</small>
      </div>
      <div class="grid grid-3" style="gap:14px;margin:16px 0">
        <div>
          <div class="calc-row"><span>${t('downPayment')}</span><b id="down-val">20% ($492,000)</b></div>
          <input class="range" id="slider-down" type="range" min="10" max="50" step="5" value="20" aria-label="${t('downPayment')}">
        </div>
        <div>
          <div class="calc-row"><span>${t('interestRate')}</span><b id="rate-val">5.5%</b></div>
          <input class="range" id="slider-rate" type="range" min="30" max="95" step="5" value="55" aria-label="${t('interestRate')}">
        </div>
        <div>
          <div class="calc-row"><span>${t('loanTerm')}</span><b id="term-val">20 ${t('years')}</b></div>
          <input class="range" id="slider-term" type="range" min="5" max="30" step="5" value="20" aria-label="${t('loanTerm')}">
        </div>
      </div>
      <div class="grid grid-2" style="border-top:1px solid var(--border);padding-top:12px">
        <div class="calc-row"><span>${t('monthlyPay')}:</span><b id="calc-monthly" style="font-size:16px;color:#00f2fe">$13,540 / mo</b></div>
        <div class="calc-row"><span>${t('estYield')}:</span><b id="calc-yield" style="font-size:16px;color:#10b981">7.07% ROI</b></div>
      </div>
    </section>

    <section class="grid properties" id="properties"></section>
  </div>`;

  let selectedProp = properties[2]; // Default to Skyline Azure Villa

  const updateCalculator = () => {
    const downPct = +$('#slider-down').value;
    const ratePct = +$('#slider-rate').value / 10;
    const termYears = +$('#slider-term').value;

    const price = selectedProp.price;
    const downAmount = price * (downPct / 100);
    const loanAmount = price - downAmount;

    const monthlyRate = (ratePct / 100) / 12;
    const totalMonths = termYears * 12;
    let monthlyPay = 0;
    if (monthlyRate > 0) {
      monthlyPay = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else {
      monthlyPay = loanAmount / totalMonths;
    }

    const annualRent = selectedProp.rentEst * 12;
    const grossYield = (annualRent / price) * 100;

    $('#calc-prop-label').textContent = `${selectedProp.title} ($${fmt(price)})`;
    $('#down-val').textContent = `${downPct}% ($${fmt(downAmount)})`;
    $('#rate-val').textContent = `${ratePct.toFixed(1)}%`;
    $('#term-val').textContent = `${termYears} ${t('years')}`;
    $('#calc-monthly').textContent = `$${fmt(monthlyPay)} / mo`;
    $('#calc-yield').textContent = `${grossYield.toFixed(2)}% ROI`;
  };

  ['slider-down', 'slider-rate', 'slider-term'].forEach(id => {
    $('#' + id).oninput = updateCalculator;
  });

  const draw = () => {
    const type = $('#estate-type').value;
    const beds = +$('#estate-beds').value;
    const price = +$('#estate-price').value;
    const list = properties.filter(p => (type === 'all' || p.type === type) && p.beds >= beds && p.price <= price);

    $('#properties').innerHTML = list.length ? list.map(p => `
      <article class="glass property" data-id="${p.id}" data-img="0">
        <div class="property-images">
          <img src="${p.imgs[0]}" alt="${p.title}" loading="lazy">
          <span class="property-tag">${p.type === 'rent' ? t('rent') : t('buy')} · PREMIUM</span>
          <div class="image-control">
            <button class="prev-img" aria-label="Previous">←</button>
            <button class="next-img" aria-label="Next">→</button>
          </div>
        </div>
        <div class="property-body">
          <h3>${p.title}</h3>
          <p>${p.place}</p>
          <div class="property-info">
            <span>⌂ ${p.beds} ${t('bedrooms')}</span>
            <span>□ ${p.area} m²</span>
          </div>
          <div class="property-price">$${fmt(p.price)} <small>${p.type === 'rent' ? t('perMonth') : ''}</small></div>
          <button class="btn btn-primary book" style="width:100%">${t('viewing')}</button>
        </div>
      </article>`).join('') : `<div class="glass empty">No matching properties</div>`;

    attachCards();
  };

  function attachCards() {
    $$('.property').forEach(card => {
      const p = properties.find(x => x.id === +card.dataset.id);
      $('.prev-img', card).onclick = () => slide(card, p, -1);
      $('.next-img', card).onclick = () => slide(card, p, 1);
      $('.book', card).onclick = () => book(p);
      card.onclick = e => {
        if (!e.target.closest('button')) {
          selectedProp = p;
          updateCalculator();
          haptic('light');
        }
      };
    });
  }

  function slide(card, p, dir) {
    let i = (+card.dataset.img + dir + p.imgs.length) % p.imgs.length;
    card.dataset.img = i;
    $('.property-images img', card).src = p.imgs[i];
    haptic();
  }

  function book(p) {
    const payload = JSON.stringify({ action: 'book_viewing', property_id: p.id, property: p.title });
    if (tg?.initData) {
      tg.sendData(payload);
      toast(t('sent'));
    } else {
      toast(`${t('sent')}: ${p.title}`);
    }
    playChime(true);
    notify();
  }

  ['estate-type', 'estate-beds', 'estate-price'].forEach(id => $('#' + id).onchange = draw);
  draw();
  updateCalculator();
}

/* ─── 6. Quiz Sprint with Chimes & Confetti ─── */
const quizQs = [
  { q: 'Какой язык и стек используется для создания Telegram Mini Apps?', a: ['Swift & Obj-C', 'JavaScript / TypeScript', 'Flutter / Dart', 'Kotlin / Java'], ok: 1 },
  { q: 'Какой метод WebApp SDK плавно раскрывает Mini App на весь экран?', a: ['openFullscreen()', 'maximize()', 'expand()', 'requestWindow()'], ok: 2 },
  { q: 'Как Mini App отправляет данные обратно боту в чат?', a: ['postWebhook()', 'sendData()', 'emitMessage()', 'botReply()'], ok: 1 },
  { q: 'Какой транспортный протокол строго обязателен для запуска Mini App?', a: ['HTTP/1.1', 'HTTPS (SSL/TLS)', 'WebRTC Direct', 'FTP'], ok: 1 },
  { q: 'Какое свойство в WebApp SDK отвечает за нативную кнопку возврата?', a: ['BackButton', 'NavReturn', 'HistoryBack', 'DismissPill'], ok: 0 }
];

function renderQuiz() {
  let qi = 0, score = 0, left = 15, timer, locked = false;
  app.innerHTML = `<div class="page">${pageHero('06 · KNOWLEDGE SPRINT', t('quiz'), t('quizSub'))}<section class="quiz-wrap" id="quiz-stage"></section></div>`;

  function draw() {
    clearInterval(timer);
    locked = false;
    left = 15;
    const q = quizQs[qi];
    $('#quiz-stage').innerHTML = `
      <div class="glass quiz-card">
        <div class="quiz-top">
          <div><p class="eyebrow">${t('question')} ${qi + 1} / ${quizQs.length}</p><b>${t('score')}: ${score}</b></div>
          <div class="countdown" id="countdown">15</div>
        </div>
        <div class="quiz-progress"><i style="--value:${(qi / quizQs.length) * 100}%"></i></div>
        <div class="quiz-question">${q.q}</div>
        <div class="quiz-answers">
          ${q.a.map((a, i) => `<button class="quiz-answer" data-i="${i}"><b>${String.fromCharCode(65 + i)}</b><span>${a}</span></button>`).join('')}
        </div>
      </div>`;

    $$('.quiz-answer').forEach(b => b.onclick = () => answer(+b.dataset.i));
    timer = setInterval(() => {
      left--;
      const cd = $('#countdown');
      if (cd) {
        cd.textContent = left;
        if (left <= 4) cd.style.borderColor = '#fb7185';
      }
      if (left <= 0) {
        toast(t('timeUp'));
        answer(-1);
      }
    }, 1000);
  }

  function answer(i) {
    if (locked) return;
    locked = true;
    clearInterval(timer);
    const ok = quizQs[qi].ok;
    const isCorrect = i === ok;

    playChime(isCorrect);
    if (isCorrect) {
      score++;
      notify('success');
    } else {
      notify('error');
    }

    $$('.quiz-answer').forEach((b, n) => {
      if (n === ok) b.classList.add('correct');
      else if (n === i) b.classList.add('wrong');
      b.disabled = true;
    });

    setTimeout(() => {
      qi++;
      qi < quizQs.length ? draw() : result();
    }, 900);
  }

  function result() {
    const pct = Math.round((score / quizQs.length) * 100);
    if (pct >= 80) {
      fireConfetti(90);
      playChime(true);
    }
    $('#quiz-stage').innerHTML = `
      <div class="glass quiz-card" style="text-align:center">
        <p class="eyebrow">RESULT</p>
        <div class="result-orb"><div><b>${pct}%</b><small>${t('accuracy')}</small></div></div>
        <h2>${t('score')}: ${score} / ${quizQs.length}</h2>
        <p class="muted">${pct >= 80 ? 'Mastery! Excellent Telegram Mini Apps knowledge.' : pct >= 50 ? 'Solid performance. One more round to reach 100%?' : 'Keep exploring the suite and try again.'}</p>
        <button class="btn btn-primary" id="quiz-again">↺ ${t('again')}</button>
      </div>`;

    $('#quiz-again').onclick = () => {
      qi = 0;
      score = 0;
      draw();
    };
  }

  draw();
  cleanup = () => clearInterval(timer);
}

/* ─── 7. P2P Escrow Simulator with Wallet & Verification ─── */
let wallet = JSON.parse(localStorage.getItem('p2p-wallet') || '{"usdt":1250,"ton":48.5}');
const saveWallet = () => localStorage.setItem('p2p-wallet', JSON.stringify(wallet));

const orders = [
  { name: 'Alex M.', rating: '99.8% · 1,248', asset: 'USDT', price: 1.001, amount: '18,420 USDT', limit: '$100–5,000', pay: ['Revolut', 'Wise'], side: 'buy', iban: 'LT89 3250 0123 4567 8901' },
  { name: 'CryptoFox', rating: '99.5% · 864', asset: 'USDT', price: 1.004, amount: '9,870 USDT', limit: '$50–2,500', pay: ['Monobank', 'Приват24'], side: 'buy', iban: 'UA44 3220 0100 0002 6007' },
  { name: 'North Star', rating: '98.9% · 2,104', asset: 'USDT', price: 1.007, amount: '31,200 USDT', limit: '$500–10K', pay: ['Wise', 'Revolut'], side: 'buy', iban: 'BE68 5390 0754 7034' },
  { name: 'Liquid Pro', rating: '99.9% · 516', asset: 'USDT', price: 0.998, amount: '12,750 USDT', limit: '$100–4,000', pay: ['Monobank', 'Revolut'], side: 'sell', iban: 'UA90 3052 9900 0002 6001' },
  { name: 'Volt Desk', rating: '99.2% · 733', asset: 'USDT', price: 0.996, amount: '7,330 USDT', limit: '$50–1,500', pay: ['Monobank', 'Wise'], side: 'sell', iban: 'GB29 NWBK 6016 1331 9268 19' }
];

function renderP2P() {
  let side = 'buy', method = 'all';
  app.innerHTML = `<div class="page">${pageHero('07 · SECURE EXCHANGE', t('p2p'), t('p2pSub'))}
    <div class="wallet-bar">
      <div class="wallet-balance">
        <span>${t('walletBalance')}:</span>
        <b id="wb-usdt">${fmt(wallet.usdt)} USDT</b>
        <span style="margin:0 6px;opacity:.35">|</span>
        <b id="wb-ton">${fmt(wallet.ton)} TON</b>
      </div>
      <button class="chip" id="wallet-faucet">${t('faucet')}</button>
    </div>
    <section class="glass panel">
      <div class="section-title">
        <div class="market-tabs">
          <button class="chip active" data-side="buy">${t('buyCrypto')}</button>
          <button class="chip" data-side="sell">${t('sellCrypto')}</button>
        </div>
        <small><span style="color:#34d399">●</span> ESCROW ONLINE</small>
      </div>
      <div class="chips" id="pay-filter">
        <button class="chip active" data-method="all">${t('all')}</button>
        ${['Monobank', 'Приват24', 'Revolut', 'Wise'].map(x => `<button class="chip" data-method="${x}">${x}</button>`).join('')}
      </div>
    </section>
    <section class="glass panel">
      <div class="order-head">
        <span>${t('merchant')}</span><span>${t('price')}</span><span>${t('available')} / ${t('limits')}</span><span>${t('payment')}</span><span>${t('trade')}</span>
      </div>
      <div id="order-book"></div>
    </section>
  </div>`;

  $('#wallet-faucet').onclick = () => {
    wallet.usdt += 200;
    saveWallet();
    $('#wb-usdt').textContent = `${fmt(wallet.usdt)} USDT`;
    playChime(true);
    notify();
    toast(t('faucetAdded'));
  };

  function draw() {
    const list = orders.filter(o => o.side === side && (method === 'all' || o.pay.includes(method)));
    $('#order-book').innerHTML = list.map(o => `
      <div class="order-row">
        <div class="merchant">
          <span class="avatar">${o.name[0]}</span>
          <div><b>${o.name}</b><small>✓ ${o.rating}</small></div>
        </div>
        <div class="order-cell"><b>$${o.price.toFixed(3)}</b><small>USD</small></div>
        <div class="order-cell"><span>${o.amount}</span><small>${o.limit}</small></div>
        <div class="payment-badges">${o.pay.map(x => `<i>${x}</i>`).join('')}</div>
        <button class="btn ${side === 'buy' ? 'btn-green' : 'btn-danger'} trade-btn" data-name="${o.name}">${t(side === 'buy' ? 'buyCrypto' : 'sellCrypto')}</button>
      </div>`).join('') || `<div class="empty">No offers</div>`;

    $$('.trade-btn').forEach(b => b.onclick = () => openTrade(b.dataset.name, side));
  }

  $$('.market-tabs .chip').forEach(b => b.onclick = () => {
    side = b.dataset.side;
    $$('.market-tabs .chip').forEach(x => x.classList.toggle('active', x === b));
    draw();
    haptic();
  });

  $$('#pay-filter .chip').forEach(b => b.onclick = () => {
    method = b.dataset.method;
    $$('#pay-filter .chip').forEach(x => x.classList.toggle('active', x === b));
    draw();
    haptic();
  });

  draw();
}

function openTrade(name, side = 'buy') {
  let step = 1;
  const target = orders.find(x => x.name === name) || orders[0];
  const orderAmount = 1000;
  const fiatTotal = (orderAmount * target.price).toFixed(2);

  modalRoot.innerHTML = `
    <div class="modal-backdrop" id="trade-modal">
      <div class="modal">
        <div class="modal-handle"></div>
        <div class="section-title">
          <div><p class="eyebrow">ESCROW SECURE CONTRACT</p><h2>${t('escrow')}</h2></div>
          <button class="btn icon-btn" id="modal-close" aria-label="Close">×</button>
        </div>
        <p class="muted">${t('protected')}</p>
        <div class="steps">
          ${[t('order'), t('pay'), t('release')].map((x, i) => `
            <div class="step ${i === 0 ? 'active' : ''}" data-step="${i + 1}"><b>${i + 1}</b>${x}</div>`).join('')}
        </div>
        <div id="modal-step-body">
          <div class="summary-line"><span>${t('merchant')}</span><b>${name} (${target.rating})</b></div>
          <div class="summary-line"><span>${t('amount')}</span><b>${orderAmount} USDT</b></div>
          <div class="summary-line"><span>${t('total')}</span><b>$${fiatTotal} USD</b></div>
          <div class="summary-line" style="margin-top:12px;background:rgba(255,255,255,.03);padding:10px 14px;border-radius:10px">
            <span style="font-size:12px;color:var(--muted)">IBAN / Requisites:</span>
            <b style="font-size:12px;font-family:monospace" id="iban-val">${target.iban}</b>
          </div>
          <button class="btn" id="copy-iban" style="width:100%;margin-top:8px;font-size:12px">${t('copyIban')}</button>
        </div>
        <button class="btn btn-primary" id="trade-next" style="width:100%;margin-top:20px">${t('continue')}</button>
      </div>
    </div>`;

  const close = () => modalRoot.innerHTML = '';
  $('#modal-close').onclick = close;
  $('#trade-modal').onclick = e => { if (e.target.id === 'trade-modal') close(); };

  $('#copy-iban').onclick = () => {
    try { navigator.clipboard.writeText(target.iban); } catch {}
    toast(t('copied'));
    haptic('light');
  };

  $('#trade-next').onclick = () => {
    step++;
    $$('.step').forEach(x => x.classList.toggle('active', +x.dataset.step <= step));
    haptic('medium');

    if (step === 2) {
      $('#modal-step-body').innerHTML = `
        <div style="text-align:center;padding:16px 0">
          <p style="margin-bottom:8px">Please confirm you transferred <b>$${fiatTotal} USD</b> to <b>${target.name}</b></p>
          <div style="font-size:12px;color:var(--muted)">TX ID: #TMA-${Math.floor(100000 + Math.random() * 900000)}</div>
        </div>`;
      $('#trade-next').textContent = t('confirm');
    } else if (step >= 3) {
      $('#trade-next').disabled = true;
      $('#modal-step-body').innerHTML = `
        <div style="text-align:center;padding:24px 0">
          <div style="font-size:24px;margin-bottom:12px">⏳</div>
          <p>${t('verifyingTx')}</p>
        </div>`;

      setTimeout(() => {
        wallet.usdt += orderAmount;
        saveWallet();
        playChime(true);
        fireConfetti(75);
        notify('success');
        toast(t('escrowReleased'));
        close();
        renderP2P();
      }, 1800);
    }
  };
}

/* ─── Router & Navigation ─── */
const routes = {
  '/': renderHome,
  '/meditation': renderMeditation,
  '/weather': renderWeather,
  '/crypto': renderCrypto,
  '/language': renderLanguage,
  '/real-estate': renderEstate,
  '/quiz': renderQuiz,
  '/p2p': renderP2P
};

function getCurrentRoute() {
  const params = new URLSearchParams(window.location.search);
  const appParam = params.get('app');
  if (appParam && routes['/' + appParam]) return '/' + appParam;
  if (window.location.hash) {
    const hash = '/' + window.location.hash.replace(/^#\/?/, '');
    if (routes[hash]) return hash;
  }
  let path = window.location.pathname.replace(/\/tma-portfolio-suite\/?/, '/');
  if (!path.startsWith('/')) path = '/' + path;
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return routes[path] ? path : '/';
}

function navigate(path, push = true) {
  cleanup();
  cleanup = () => {};
  modalRoot.innerHTML = '';
  let cleanPath = path;
  if (cleanPath.startsWith('/tma-portfolio-suite')) cleanPath = cleanPath.replace('/tma-portfolio-suite', '') || '/';
  if (!routes[cleanPath]) cleanPath = '/';

  // Telegram native BackButton state
  if (cleanPath === '/') {
    tg?.BackButton?.hide?.();
  } else {
    tg?.BackButton?.show?.();
  }

  if (push) {
    if (location.pathname.includes('tma-portfolio-suite')) {
      history.pushState({}, '', '#' + cleanPath);
    } else if (location.pathname !== cleanPath) {
      history.pushState({}, '', cleanPath);
    }
  }

  routes[cleanPath]();

  $$('.dock a').forEach(a => {
    const target = a.getAttribute('href');
    a.classList.toggle('active', target === cleanPath);
  });

  app.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function applyStaticI18n() {
  $$('[data-i18n]').forEach(el => el.textContent = t(el.dataset.i18n));
  $$('[data-lang]').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  document.documentElement.lang = lang === 'ua' ? 'uk' : lang;
}

document.addEventListener('click', e => {
  const link = e.target.closest('a[data-link]');
  if (link) {
    e.preventDefault();
    const href = link.getAttribute('href') || link.pathname;
    navigate(href);
  }
  const btn = e.target.closest('button');
  if (btn && !btn.disabled) haptic();
});

$$('[data-lang]').forEach(b => b.onclick = () => {
  lang = b.dataset.lang;
  localStorage.setItem('tma-lang', lang);
  applyStaticI18n();
  navigate(getCurrentRoute(), false);
});

window.addEventListener('popstate', () => navigate(getCurrentRoute(), false));
window.addEventListener('hashchange', () => navigate(getCurrentRoute(), false));

applyStaticI18n();
navigate(getCurrentRoute(), false);
