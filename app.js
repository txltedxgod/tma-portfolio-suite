const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  tg.setHeaderColor?.('#08090c');
  tg.setBackgroundColor?.('#08090c');
}

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const app = $('#app');
const modalRoot = $('#modal-root');
let cleanup = () => {};
let lang = localStorage.getItem('obsidian-lang') || tg?.initDataUnsafe?.user?.language_code?.slice(0, 2) || 'ru';
if (!['ru', 'en', 'ua'].includes(lang)) lang = 'ru';

const I18N = {
  ru: {
    live:'LIVE', navMeditation:'Дыхание', navWeather:'Погода', navCrypto:'Крипто', navLanguage:'Слова', navEstate:'Недвижимость', navQuiz:'Квиз', navP2p:'P2P',
    suite:'PORTFOLIO SUITE', homeTitle:'7 мини‑аппов. Одна система.', homeSub:'Коллекция мобильных Telegram‑продуктов с единой Obsidian Glass дизайн‑системой.', explore:'Открыть приложение', premium:'PREMIUM',
    meditation:'Медитация', meditationSub:'Дышите глубже. Возвращайтесь к себе.', weather:'Погода', weatherSub:'Чистый прогноз без визуального шума.', crypto:'Crypto Tracker', cryptoSub:'Рынок, конвертер и портфель в одном экране.', language:'Language Teacher', languageSub:'Учите слова короткими ежедневными сессиями.', estate:'Недвижимость', estateSub:'Премиальные объекты и запись на просмотр.', quiz:'Интерактивный квиз', quizSub:'15 секунд. Четыре варианта. Один ответ.', p2p:'P2P Swap', p2pSub:'Быстрые сделки с понятным escrow‑сценарием.',
    techniques:'Техники', sounds:'Фоновые звуки', sessions:'Сессии', minutes:'Минуты', streak:'Стрик', start:'Начать', pause:'Пауза', reset:'Сбросить', breatheIn:'Вдох', hold:'Задержка', breatheOut:'Выдох', ready:'Готовы?', volume:'Громкость', rain:'Дождь', fire:'Костёр', forest:'Лес', ocean:'Ночной океан',
    cityPlaceholder:'Найти город', feels:'Ощущается', humidity:'Влажность', wind:'Ветер', sunrise:'Рассвет', sunset:'Закат', hourly:'24 часа', week:'7 дней', demoData:'Демо‑прогноз',
    markets:'Рынок', updated:'Обновляется каждые 3 сек.', converter:'Конвертер', portfolio:'Портфель', amount:'Сумма', total:'Всего',
    flashcards:'Карточки', learn:'Учу', know:'Знаю', dailyGoal:'Цель дня', learned:'Изучено', test:'Мини‑тест дня', choose:'Выберите правильный перевод',
    filters:'Фильтры', rent:'Аренда', buy:'Покупка', all:'Все', bedrooms:'Спальни', anyPrice:'Любая цена', viewing:'Записаться на просмотр', perMonth:'/ месяц', sent:'Заявка отправлена в Telegram',
    question:'Вопрос', score:'Счёт', again:'Пройти заново', next:'Далее', accuracy:'Точность', timeUp:'Время вышло',
    buyCrypto:'Купить', sellCrypto:'Продать', payment:'Оплата', merchant:'Мерчант', available:'Доступно', limits:'Лимиты', price:'Цена', trade:'Сделка', escrow:'Безопасная сделка', order:'Ордер', pay:'Оплата', release:'Получение', continue:'Продолжить', confirm:'Подтвердить сделку', protected:'Активы защищены escrow до подтверждения оплаты.'
  },
  en: {
    live:'LIVE', navMeditation:'Breathe', navWeather:'Weather', navCrypto:'Crypto', navLanguage:'Words', navEstate:'Property', navQuiz:'Quiz', navP2p:'P2P',
    suite:'PORTFOLIO SUITE', homeTitle:'7 mini apps. One system.', homeSub:'A mobile Telegram product collection united by the Obsidian Glass design system.', explore:'Open app', premium:'PREMIUM',
    meditation:'Meditation', meditationSub:'Breathe deeper. Return to yourself.', weather:'Weather', weatherSub:'A clear forecast without visual noise.', crypto:'Crypto Tracker', cryptoSub:'Market, converter and portfolio in one view.', language:'Language Teacher', languageSub:'Learn words in short daily sessions.', estate:'Real Estate', estateSub:'Premium properties and instant viewing requests.', quiz:'Interactive Quiz', quizSub:'15 seconds. Four choices. One answer.', p2p:'P2P Swap', p2pSub:'Fast trades with a transparent escrow flow.',
    techniques:'Techniques', sounds:'Ambient sounds', sessions:'Sessions', minutes:'Minutes', streak:'Streak', start:'Start', pause:'Pause', reset:'Reset', breatheIn:'Inhale', hold:'Hold', breatheOut:'Exhale', ready:'Ready?', volume:'Volume', rain:'Rain', fire:'Fire', forest:'Forest', ocean:'Night ocean',
    cityPlaceholder:'Search city', feels:'Feels like', humidity:'Humidity', wind:'Wind', sunrise:'Sunrise', sunset:'Sunset', hourly:'24 hours', week:'7 days', demoData:'Demo forecast',
    markets:'Market', updated:'Updates every 3 sec.', converter:'Converter', portfolio:'Portfolio', amount:'Amount', total:'Total',
    flashcards:'Flashcards', learn:'Learning', know:'Know it', dailyGoal:'Daily goal', learned:'Learned', test:'Daily mini test', choose:'Choose the correct translation',
    filters:'Filters', rent:'Rent', buy:'Buy', all:'All', bedrooms:'Bedrooms', anyPrice:'Any price', viewing:'Book a viewing', perMonth:'/ month', sent:'Request sent to Telegram',
    question:'Question', score:'Score', again:'Try again', next:'Next', accuracy:'Accuracy', timeUp:'Time is up',
    buyCrypto:'Buy', sellCrypto:'Sell', payment:'Payment', merchant:'Merchant', available:'Available', limits:'Limits', price:'Price', trade:'Trade', escrow:'Secure trade', order:'Order', pay:'Payment', release:'Release', continue:'Continue', confirm:'Confirm trade', protected:'Assets stay in escrow until payment is confirmed.'
  },
  ua: {
    live:'LIVE', navMeditation:'Дихання', navWeather:'Погода', navCrypto:'Крипто', navLanguage:'Слова', navEstate:'Нерухомість', navQuiz:'Квіз', navP2p:'P2P',
    suite:'PORTFOLIO SUITE', homeTitle:'7 мініапів. Одна система.', homeSub:'Колекція мобільних Telegram‑продуктів з єдиною дизайн‑системою Obsidian Glass.', explore:'Відкрити застосунок', premium:'PREMIUM',
    meditation:'Медитація', meditationSub:'Дихайте глибше. Повертайтеся до себе.', weather:'Погода', weatherSub:'Чистий прогноз без візуального шуму.', crypto:'Crypto Tracker', cryptoSub:'Ринок, конвертер і портфель на одному екрані.', language:'Language Teacher', languageSub:'Вивчайте слова короткими щоденними сесіями.', estate:'Нерухомість', estateSub:'Преміальні об’єкти та запис на перегляд.', quiz:'Інтерактивний квіз', quizSub:'15 секунд. Чотири варіанти. Одна відповідь.', p2p:'P2P Swap', p2pSub:'Швидкі угоди зі зрозумілим escrow‑сценарієм.',
    techniques:'Техніки', sounds:'Фонові звуки', sessions:'Сесії', minutes:'Хвилини', streak:'Серія', start:'Почати', pause:'Пауза', reset:'Скинути', breatheIn:'Вдих', hold:'Затримка', breatheOut:'Видих', ready:'Готові?', volume:'Гучність', rain:'Дощ', fire:'Багаття', forest:'Ліс', ocean:'Нічний океан',
    cityPlaceholder:'Знайти місто', feels:'Відчувається', humidity:'Вологість', wind:'Вітер', sunrise:'Світанок', sunset:'Захід', hourly:'24 години', week:'7 днів', demoData:'Демо‑прогноз',
    markets:'Ринок', updated:'Оновлення кожні 3 сек.', converter:'Конвертер', portfolio:'Портфель', amount:'Сума', total:'Усього',
    flashcards:'Картки', learn:'Вчу', know:'Знаю', dailyGoal:'Ціль дня', learned:'Вивчено', test:'Мінітест дня', choose:'Оберіть правильний переклад',
    filters:'Фільтри', rent:'Оренда', buy:'Купівля', all:'Усі', bedrooms:'Спальні', anyPrice:'Будь-яка ціна', viewing:'Записатися на перегляд', perMonth:'/ місяць', sent:'Заявку надіслано в Telegram',
    question:'Питання', score:'Рахунок', again:'Пройти ще раз', next:'Далі', accuracy:'Точність', timeUp:'Час вийшов',
    buyCrypto:'Купити', sellCrypto:'Продати', payment:'Оплата', merchant:'Мерчант', available:'Доступно', limits:'Ліміти', price:'Ціна', trade:'Угода', escrow:'Безпечна угода', order:'Ордер', pay:'Оплата', release:'Отримання', continue:'Продовжити', confirm:'Підтвердити угоду', protected:'Активи захищені escrow до підтвердження оплати.'
  }
};
const t = key => I18N[lang]?.[key] ?? I18N.en[key] ?? key;
const haptic = (type = 'light') => { try { tg?.HapticFeedback?.impactOccurred(type); } catch {} };
const notify = (type = 'success') => { try { tg?.HapticFeedback?.notificationOccurred(type); } catch {} };
const fmt = n => new Intl.NumberFormat(lang === 'ua' ? 'uk-UA' : lang === 'ru' ? 'ru-RU' : 'en-US', {maximumFractionDigits: 2}).format(n);

function toast(message) {
  const el = $('#toast'); el.textContent = message; el.classList.add('show');
  clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove('show'), 2200);
}

function pageHero(eyebrow, title, subtitle, badge = '07', badgeText = 'APPS') {
  return `<section class="hero"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p>${subtitle}</p></div><div class="hero-badge"><div><b>${badge}</b><small>${badgeText}</small></div></div></section>`;
}

const appCards = [
  ['meditation','◌','meditation','meditationSub','rgba(0,242,254,.35)'], ['weather','☼','weather','weatherSub','rgba(245,158,11,.35)'],
  ['crypto','◇','crypto','cryptoSub','rgba(121,40,202,.42)'], ['language','文','language','languageSub','rgba(16,185,129,.34)'],
  ['real-estate','⌂','estate','estateSub','rgba(245,158,11,.28)'], ['quiz','◎','quiz','quizSub','rgba(0,242,254,.3)'],
  ['p2p','⇄','p2p','p2pSub','rgba(121,40,202,.4)']
];

function renderHome() {
  app.innerHTML = `<div class="page">${pageHero(t('suite'), t('homeTitle'), t('homeSub'), '07', t('premium'))}
    <section class="grid app-grid">${appCards.map((c,i)=>`<a class="glass app-card ${i>4?'wide':''}" href="/${c[0]}" data-link style="--accent:${c[4]}"><div class="app-icon">${c[1]}</div><div><h2>${t(c[2])}</h2><p>${t(c[3])}</p><span class="card-link">${t('explore')} <b>↗</b></span></div></a>`).join('')}</section>
  </div>`;
}

const techniques = { '4-7-8': [4,7,8], Box: [4,4,4,4], Relax: [5,2,6] };
let audioCtx, ambientNode;
function stopAmbient(){ if (ambientNode) { try { ambientNode.stop(); } catch {} ambientNode.disconnect?.(); ambientNode = null; } }
function startAmbient(type, volume=.3){
  stopAmbient(); audioCtx ||= new (window.AudioContext || window.webkitAudioContext)();
  const len = audioCtx.sampleRate * 2, buffer = audioCtx.createBuffer(1,len,audioCtx.sampleRate), data = buffer.getChannelData(0);
  for(let i=0;i<len;i++) data[i]=(Math.random()*2-1) * (type==='fire' && Math.random()>.985 ? 2.8 : 1);
  const src=audioCtx.createBufferSource(), filter=audioCtx.createBiquadFilter(), gain=audioCtx.createGain();
  src.buffer=buffer; src.loop=true; filter.type= type==='ocean'?'lowpass':type==='forest'?'bandpass':'highpass'; filter.frequency.value= type==='ocean'?420:type==='forest'?1200:2600; gain.gain.value=volume*.25;
  src.connect(filter).connect(gain).connect(audioCtx.destination); src.start(); src.gainNode=gain; ambientNode=src;
}

function renderMeditation(){
  const stats=JSON.parse(localStorage.getItem('meditation-stats')||'{"sessions":12,"minutes":86,"streak":4}');
  app.innerHTML=`<div class="page">${pageHero('01 · MINDFULNESS',t('meditation'),t('meditationSub'),'04','MIN')}
    <div class="grid grid-3"><div class="glass stat"><span class="icon">◌</span><div><strong>${stats.sessions}</strong><small>${t('sessions')}</small></div></div><div class="glass stat"><span class="icon">⌁</span><div><strong>${stats.minutes}</strong><small>${t('minutes')}</small></div></div><div class="glass stat"><span class="icon">↗</span><div><strong>${stats.streak}</strong><small>${t('streak')}</small></div></div></div>
    <div class="grid meditation-layout"><section class="glass panel breathe-panel"><div><div class="chips" id="techniques">${Object.keys(techniques).map((x,i)=>`<button class="chip ${!i?'active':''}" data-tech="${x}">${x}</button>`).join('')}</div><div class="breath-ring" id="breath-ring"><div class="breath-core"><div><strong id="breath-time">04:00</strong><span id="breath-label">${t('ready')}</span></div></div></div><div class="timer-actions"><button class="btn btn-primary" id="timer-start">▶ ${t('start')}</button><button class="btn icon-btn" id="timer-reset" aria-label="${t('reset')}">↺</button></div></div></section>
    <aside class="glass panel"><div class="section-title"><h2>${t('sounds')}</h2><small>${t('volume')}</small></div><input class="range" id="sound-volume" type="range" min="0" max="100" value="35" aria-label="${t('volume')}">${[['rain','╱',t('rain')],['fire','✦',t('fire')],['forest','♧',t('forest')],['ocean','≈',t('ocean')]].map(x=>`<div class="sound-row"><span class="sound-icon">${x[1]}</span><div><b>${x[2]}</b><small>Ambient loop</small></div><button class="sound-toggle" data-sound="${x[0]}" aria-label="${x[2]}"></button></div>`).join('')}</aside></div></div>`;
  let total=240, remain=240, running=false, timer=null, tech='4-7-8', phase=0, phaseLeft=techniques[tech][0];
  const ring=$('#breath-ring'), label=$('#breath-label'), time=$('#breath-time'), start=$('#timer-start');
  const phaseNames=()=>[t('breatheIn'),t('hold'),t('breatheOut'),t('hold')];
  function paint(){ time.textContent=`${String(Math.floor(remain/60)).padStart(2,'0')}:${String(remain%60).padStart(2,'0')}`; ring.style.setProperty('--progress',`${(1-remain/total)*360}deg`); label.textContent=running?`${phaseNames()[phase]} · ${phaseLeft}`:t('ready'); ring.classList.toggle('inhale',running&&phase===0); ring.classList.toggle('exhale',running&&phase===2); start.innerHTML=running?`Ⅱ ${t('pause')}`:`▶ ${t('start')}`; }
  function tick(){ if(remain<=0){clearInterval(timer);running=false; stats.sessions++;stats.minutes+=4;localStorage.setItem('meditation-stats',JSON.stringify(stats));notify();toast(t('sessions')+' +1');paint();return;} remain--;phaseLeft--;if(phaseLeft<=0){phase=(phase+1)%techniques[tech].length;phaseLeft=techniques[tech][phase];haptic();}paint(); }
  start.onclick=()=>{running=!running;running?timer=setInterval(tick,1000):clearInterval(timer);paint();};
  $('#timer-reset').onclick=()=>{clearInterval(timer);running=false;remain=total;phase=0;phaseLeft=techniques[tech][0];paint();};
  $$('#techniques .chip').forEach(b=>b.onclick=()=>{$$('#techniques .chip').forEach(x=>x.classList.remove('active'));b.classList.add('active');tech=b.dataset.tech;phase=0;phaseLeft=techniques[tech][0];haptic();});
  $$('.sound-toggle').forEach(b=>b.onclick=()=>{const was=b.classList.contains('active');$$('.sound-toggle').forEach(x=>x.classList.remove('active'));stopAmbient();if(!was){b.classList.add('active');startAmbient(b.dataset.sound,+$('#sound-volume').value/100);}haptic();});
  $('#sound-volume').oninput=e=>{ if(ambientNode?.gainNode) ambientNode.gainNode.gain.value=(+e.target.value/100)*.25; };
  cleanup=()=>{clearInterval(timer);stopAmbient();}; paint();
}

const weatherCities={Budapest:[24,15,'Budapest','Partly cloudy'],Kyiv:[21,13,'Kyiv','Clear intervals'],London:[17,11,'London','Light rain'],Dubai:[37,29,'Dubai','Sunny'],Warsaw:[19,10,'Warsaw','Cloudy'],Lviv:[18,9,'Lviv','Light clouds']};
function cityWeather(name){ const key=Object.keys(weatherCities).find(x=>x.toLowerCase()===name.trim().toLowerCase()); if(key)return weatherCities[key]; let seed=[...name].reduce((a,c)=>a+c.charCodeAt(0),0); return [16+seed%18,9+seed%12,name||'Budapest',seed%2?'Clear intervals':'Partly cloudy']; }
function renderWeather(city='Budapest'){
  const [hi,lo,label,desc]=cityWeather(city), now=Math.round((hi+lo)/2+3), icons=['☼','☼','◒','☁','☁','◒','☼','☼'];
  app.innerHTML=`<div class="page">${pageHero('02 · ATMOSPHERE',t('weather'),t('weatherSub'),'24','HRS')}
    <section class="glass weather-hero"><form class="weather-search" id="weather-form"><input class="input" id="city-input" value="${label}" placeholder="${t('cityPlaceholder')}" aria-label="${t('cityPlaceholder')}"><button class="btn icon-btn" aria-label="Search">⌕</button></form><div class="weather-main"><div><div class="weather-city">${label}<small>${desc} · ${t('demoData')}</small></div><div class="temperature">${now}<sup>°</sup></div></div><div class="weather-symbol">${now>28?'☼':now<18?'☂':'◒'}</div></div></section>
    <section class="grid grid-4"><div class="glass stat"><span class="icon">◔</span><div><strong>${now-2}°</strong><small>${t('feels')}</small></div></div><div class="glass stat"><span class="icon">⌁</span><div><strong>${54+(now%16)}%</strong><small>${t('humidity')}</small></div></div><div class="glass stat"><span class="icon">→</span><div><strong>${11+(now%7)}</strong><small>${t('wind')} · km/h</small></div></div><div class="glass stat"><span class="icon">☼</span><div><strong>06:14</strong><small>${t('sunrise')} · 19:23 ${t('sunset')}</small></div></div></section>
    <section class="glass panel"><div class="section-title"><h2>${t('hourly')}</h2><small>${label}</small></div><div class="hourly">${Array.from({length:24},(_,i)=>`<div class="glass hour"><small>${String((new Date().getHours()+i)%24).padStart(2,'0')}:00</small><i>${icons[Math.floor(i/3)%icons.length]}</i><b>${Math.round(now+Math.sin(i/4)*4)}°</b></div>`).join('')}</div></section>
    <section class="glass panel"><div class="section-title"><h2>${t('week')}</h2><small>${hi}° / ${lo}°</small></div>${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d,i)=>`<div class="forecast-row"><b>${d}</b><span>${icons[i]}</span><span>${hi-(i%3)}°</span><div class="temp-bar" style="opacity:${.45+i*.07}"></div></div>`).join('')}</section></div>`;
  $('#weather-form').onsubmit=e=>{e.preventDefault();const c=$('#city-input').value.trim(); if(c){haptic();renderWeather(c);}};
}

const coins=[
  {s:'BTC',n:'Bitcoin',p:68420.12,c:2.84,color:'#f59e0b',pts:[7,9,8,12,11,15,14,19,18,22]},
  {s:'ETH',n:'Ethereum',p:3891.44,c:1.43,color:'#a78bfa',pts:[18,15,16,14,17,13,14,11,13,10]},
  {s:'TON',n:'Toncoin',p:7.12,c:4.78,color:'#00f2fe',pts:[16,14,15,12,11,13,9,8,5,4]},
  {s:'SOL',n:'Solana',p:172.83,c:-1.26,color:'#10b981',pts:[7,6,9,8,12,11,14,13,17,19]},
  {s:'BNB',n:'BNB',p:604.21,c:.64,color:'#facc15',pts:[18,17,14,16,12,13,10,8,9,6]}
];
function spark(points,up){ const max=Math.max(...points),min=Math.min(...points),pts=points.map((v,i)=>`${i*12.4},${34-(v-min)/(max-min||1)*28}`).join(' ');return `<svg class="spark" viewBox="0 0 112 38" aria-hidden="true"><polyline points="${pts}" fill="none" stroke="${up?'#34d399':'#fb7185'}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`; }
function renderCrypto(){
  app.innerHTML=`<div class="page">${pageHero('03 · DIGITAL ASSETS',t('crypto'),t('cryptoSub'),'5','ASSETS')}
  <section class="glass panel"><div class="section-title"><h2>${t('markets')}</h2><small><span style="color:#34d399">●</span> ${t('updated')}</small></div><div id="markets"></div></section>
  <div class="grid grid-2"><section class="glass panel"><h2>${t('converter')}</h2><div class="converter"><div class="field"><label>${t('amount')}</label><div class="input-group"><input class="input" id="crypto-amount" type="number" value="1" min="0" step="any"><select class="select" id="crypto-from">${coins.map(c=>`<option>${c.s}</option>`).join('')}</select></div></div><span class="swap-arrow">⇄</span><div class="field"><label>${t('total')}</label><div class="input-group"><input class="input" id="crypto-result" readonly><select class="select" id="crypto-to"><option>USD</option><option>EUR</option><option>UAH</option><option>RUB</option></select></div></div></div></section>
  <section class="glass panel"><h2>${t('portfolio')}</h2><div class="portfolio"><div class="donut"><span>${t('total')}<b>$24,860</b></span></div><div class="legend">${[['BTC','#00f2fe','48%'],['ETH','#a78bfa','30%'],['TON','#10b981','13%'],['Other','#f59e0b','9%']].map(x=>`<div class="legend-row"><span><i style="background:${x[1]}"></i>${x[0]}</span><b>${x[2]}</b></div>`).join('')}</div></div></section></div></div>`;
  const renderMarket=()=>$('#markets').innerHTML=coins.map(c=>`<div class="market-row"><div class="coin"><span class="coin-icon" style="--coin:${c.color}">${c.s[0]}</span><div><b>${c.n}</b><small>${c.s}</small></div></div><div class="price">$${fmt(c.p)}</div>${spark(c.pts,c.c>=0)}<div class="change ${c.c>=0?'up':'down'}">${c.c>=0?'+':''}${c.c.toFixed(2)}%</div></div>`).join('');
  const convert=()=>{const c=coins.find(x=>x.s===$('#crypto-from').value), rates={USD:1,EUR:.92,UAH:41.2,RUB:91.4};$('#crypto-result').value=fmt((+$('#crypto-amount').value||0)*c.p*rates[$('#crypto-to').value]);};
  ['crypto-amount','crypto-from','crypto-to'].forEach(id=>$('#'+id).addEventListener('input',convert));renderMarket();convert();
  const timer=setInterval(()=>{coins.forEach(c=>{const k=1+(Math.random()-.5)*.002;c.p*=k;c.c+=(Math.random()-.5)*.08;c.pts=[...c.pts.slice(1),c.pts.at(-1)+(Math.random()-.48)*3]});renderMarket();convert();},3000); cleanup=()=>clearInterval(timer);
}

const words=[['Serendipity','Счастливая случайность','A fortunate discovery'],['Resilient','Стойкий','Able to recover quickly'],['Vivid','Яркий','Producing powerful feelings'],['Curious','Любознательный','Eager to know or learn'],['Thrive','Процветать','Grow or develop well']];
function renderLanguage(){
  let index=0, learned=+(localStorage.getItem('words-learned')||3), startX=0, dx=0;
  app.innerHTML=`<div class="page">${pageHero('04 · DAILY PRACTICE',t('language'),t('languageSub'),'12','DAY')}
  <div class="grid grid-3"><div class="glass stat"><div class="goal-ring" style="--goal:${Math.min(100,learned*10)}%"><b>${learned}/10</b><small>${t('dailyGoal')}</small></div></div><div class="glass stat"><span class="icon">↗</span><div><strong>12</strong><small>${t('streak')}</small></div></div><div class="glass stat"><span class="icon">✓</span><div><strong>${learned}</strong><small>${t('learned')}</small></div></div></div>
  <div class="grid language-layout"><section class="glass panel flash-zone"><div><div class="flashcard" id="flashcard"></div><div class="swipe-actions"><button class="btn btn-danger" id="learn-btn">← ${t('learn')}</button><button class="btn btn-green" id="know-btn">${t('know')} →</button></div></div></section><aside class="glass panel"><p class="eyebrow">${t('test')}</p><h2>${t('choose')}</h2><div style="font-size:34px;font-weight:700;margin:28px 0 12px">Resilient</div><div id="mini-answers">${['Хрупкий','Стойкий','Медленный','Спокойный'].map((x,i)=>`<button class="answer" data-correct="${i===1}">${x}</button>`).join('')}</div></aside></div></div>`;
  const card=$('#flashcard');
  const paint=()=>{const w=words[index%words.length];card.innerHTML=`<div class="flash-meta"><span>EN → ${lang==='en'?'DEFINITION':'RU'}</span><span>${index+1}/${words.length}</span></div><div><div class="word">${w[0]}</div><div class="translation">${lang==='en'?w[2]:w[1]}</div></div><div class="flash-meta"><span>↔ SWIPE</span><span>OBSIDIAN WORDS</span></div>`;card.style.transform='';card.style.opacity='1';};
  const next=(known)=>{card.style.transform=`translateX(${known?120:-120}px) rotate(${known?6:-6}deg)`;card.style.opacity='0';if(known){learned++;localStorage.setItem('words-learned',learned)};haptic();setTimeout(()=>{index=(index+1)%words.length;paint()},220);};
  $('#know-btn').onclick=()=>next(true);$('#learn-btn').onclick=()=>next(false);
  card.onpointerdown=e=>{startX=e.clientX;dx=0;card.setPointerCapture(e.pointerId);card.classList.add('dragging')};card.onpointermove=e=>{if(!startX)return;dx=e.clientX-startX;card.style.transform=`translateX(${dx}px) rotate(${dx/24}deg)`};card.onpointerup=()=>{card.classList.remove('dragging');startX=0;Math.abs(dx)>75?next(dx>0):card.style.transform='';};
  $$('#mini-answers .answer').forEach(b=>b.onclick=()=>{if($$('#mini-answers .correct, #mini-answers .wrong').length)return;b.classList.add(b.dataset.correct==='true'?'correct':'wrong');notify(b.dataset.correct==='true'?'success':'error');if(b.dataset.correct!=='true'){$$('#mini-answers .answer').find(x=>x.dataset.correct==='true').classList.add('correct')}});paint();
}

const properties=[
  {id:1,type:'buy',beds:3,price:1280000,title:'Skyline Residence',place:'Budapest · District V',area:186,imgs:['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=82','https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=82']},
  {id:2,type:'rent',beds:2,price:4800,title:'Riverside Loft',place:'Kyiv · Podil',area:128,imgs:['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=82','https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=82']},
  {id:3,type:'buy',beds:4,price:2460000,title:'Obsidian Villa',place:'Dubai · Palm Jumeirah',area:412,imgs:['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=82','https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1000&q=82']},
  {id:4,type:'rent',beds:1,price:2600,title:'Gallery Apartment',place:'Warsaw · Śródmieście',area:78,imgs:['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=82','https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1000&q=82']}
];
function renderEstate(){
  app.innerHTML=`<div class="page">${pageHero('05 · PRIME COLLECTION',t('estate'),t('estateSub'),'18','LISTINGS')}
  <section class="glass panel"><div class="section-title"><h2>${t('filters')}</h2><small>CURATED</small></div><div class="filter-row"><select class="select" id="estate-type"><option value="all">${t('all')}</option><option value="rent">${t('rent')}</option><option value="buy">${t('buy')}</option></select><select class="select" id="estate-beds"><option value="0">${t('bedrooms')}: ${t('all')}</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option></select><select class="select" id="estate-price"><option value="9999999">${t('anyPrice')}</option><option value="5000">≤ $5K</option><option value="1500000">≤ $1.5M</option><option value="3000000">≤ $3M</option></select></div></section><section class="grid properties" id="properties"></section></div>`;
  const draw=()=>{const type=$('#estate-type').value,beds=+$('#estate-beds').value,price=+$('#estate-price').value;const list=properties.filter(p=>(type==='all'||p.type===type)&&p.beds>=beds&&p.price<=price);$('#properties').innerHTML=list.length?list.map(p=>`<article class="glass property" data-id="${p.id}" data-img="0"><div class="property-images"><img src="${p.imgs[0]}" alt="${p.title}" loading="lazy"><span class="property-tag">${p.type==='rent'?t('rent'):t('buy')} · PREMIUM</span><div class="image-control"><button class="prev-img" aria-label="Previous">←</button><button class="next-img" aria-label="Next">→</button></div></div><div class="property-body"><h3>${p.title}</h3><p>${p.place}</p><div class="property-info"><span>⌂ ${p.beds} ${t('bedrooms')}</span><span>□ ${p.area} m²</span></div><div class="property-price">$${fmt(p.price)} <small>${p.type==='rent'?t('perMonth'):''}</small></div><button class="btn btn-primary book" style="width:100%">${t('viewing')}</button></div></article>`).join(''):`<div class="glass empty">No matching properties</div>`;attachCards();};
  function attachCards(){$$('.property').forEach(card=>{const p=properties.find(x=>x.id===+card.dataset.id);$('.prev-img',card).onclick=()=>slide(card,p,-1);$('.next-img',card).onclick=()=>slide(card,p,1);$('.book',card).onclick=()=>book(p);});}
  function slide(card,p,dir){let i=(+card.dataset.img+dir+p.imgs.length)%p.imgs.length;card.dataset.img=i;$('.property-images img',card).src=p.imgs[i];haptic();}
  function book(p){const payload=JSON.stringify({action:'book_viewing',property_id:p.id,property:p.title});if(tg?.initData){tg.sendData(payload);toast(t('sent'));}else{toast(`${t('sent')}: ${p.title}`);}notify();}
  ['estate-type','estate-beds','estate-price'].forEach(id=>$('#'+id).onchange=draw);draw();
}

const quizQs=[
  {q:'Какой язык используется для Telegram Mini Apps?',a:['Swift','JavaScript','Dart','Kotlin'],ok:1},
  {q:'Какой метод раскрывает Mini App?',a:['open()','maximize()','expand()','full()'],ok:2},
  {q:'Что хранит выбор языка локально?',a:['localStorage','Canvas','Webhook','BotFather'],ok:0},
  {q:'Какой транспорт защищает Mini App?',a:['FTP','HTTPS','SMTP','Telnet'],ok:1},
  {q:'Что отправляет данные обратно боту?',a:['postBot()','sendData()','emit()','reply()'],ok:1}
];
function renderQuiz(){let qi=0,score=0,left=15,timer,locked=false;
  const shell=()=>`<div class="page">${pageHero('06 · KNOWLEDGE SPRINT',t('quiz'),t('quizSub'),'15','SEC')}<section class="quiz-wrap" id="quiz-stage"></section></div>`;app.innerHTML=shell();
  function draw(){clearInterval(timer);locked=false;left=15;const q=quizQs[qi];$('#quiz-stage').innerHTML=`<div class="glass quiz-card"><div class="quiz-top"><div><p class="eyebrow">${t('question')} ${qi+1} / ${quizQs.length}</p><b>${t('score')}: ${score}</b></div><div class="countdown" id="countdown">15</div></div><div class="quiz-progress"><i style="--value:${(qi/quizQs.length)*100}%"></i></div><div class="quiz-question">${q.q}</div><div class="quiz-answers">${q.a.map((a,i)=>`<button class="quiz-answer" data-i="${i}"><b>${String.fromCharCode(65+i)}</b><span>${a}</span></button>`).join('')}</div></div>`;$$('.quiz-answer').forEach(b=>b.onclick=()=>answer(+b.dataset.i));timer=setInterval(()=>{left--;$('#countdown').textContent=left;if(left<=0){toast(t('timeUp'));answer(-1)}},1000);}
  function answer(i){if(locked)return;locked=true;clearInterval(timer);const ok=quizQs[qi].ok;if(i===ok){score++;notify();}else notify('error');$$('.quiz-answer').forEach((b,n)=>{if(n===ok)b.classList.add('correct');else if(n===i)b.classList.add('wrong');b.disabled=true});setTimeout(()=>{qi++;qi<quizQs.length?draw():result()},850);}
  function result(){const pct=Math.round(score/quizQs.length*100);$('#quiz-stage').innerHTML=`<div class="glass quiz-card" style="text-align:center"><p class="eyebrow">RESULT</p><div class="result-orb"><div><b>${pct}%</b><small>${t('accuracy')}</small></div></div><h2>${t('score')}: ${score} / ${quizQs.length}</h2><p class="muted">${pct>=80?'Excellent. Premium-level knowledge.':pct>=50?'Good start. One more round?':'Keep exploring the suite.'}</p><button class="btn btn-primary" id="quiz-again">↺ ${t('again')}</button></div>`;$('#quiz-again').onclick=()=>{qi=0;score=0;draw()};} draw();cleanup=()=>clearInterval(timer);
}

const orders=[
  {name:'Alex M.',rating:'99.8% · 1,248',asset:'USDT',price:1.001,amount:'18,420 USDT',limit:'$100–5,000',pay:['Revolut','Wise'],side:'buy'},
  {name:'CryptoFox',rating:'99.5% · 864',asset:'USDT',price:1.004,amount:'9,870 USDT',limit:'$50–2,500',pay:['Monobank','Приват24'],side:'buy'},
  {name:'North Star',rating:'98.9% · 2,104',asset:'USDT',price:1.007,amount:'31,200 USDT',limit:'$500–10K',pay:['Wise','Revolut'],side:'buy'},
  {name:'Liquid Pro',rating:'99.9% · 516',asset:'USDT',price:.998,amount:'12,750 USDT',limit:'$100–4,000',pay:['Сбер','Revolut'],side:'sell'},
  {name:'Volt Desk',rating:'99.2% · 733',asset:'USDT',price:.996,amount:'7,330 USDT',limit:'$50–1,500',pay:['Monobank','Wise'],side:'sell'}
];
function renderP2P(){let side='buy',method='all';
 app.innerHTML=`<div class="page">${pageHero('07 · SECURE EXCHANGE',t('p2p'),t('p2pSub'),'0.1%','FEE')}
 <section class="glass panel"><div class="section-title"><div class="market-tabs"><button class="chip active" data-side="buy">${t('buyCrypto')}</button><button class="chip" data-side="sell">${t('sellCrypto')}</button></div><small><span style="color:#34d399">●</span> ESCROW ONLINE</small></div><div class="chips" id="pay-filter"><button class="chip active" data-method="all">${t('all')}</button>${['Monobank','Приват24','Сбер','Revolut','Wise'].map(x=>`<button class="chip" data-method="${x}">${x}</button>`).join('')}</div></section>
 <section class="glass panel"><div class="order-head"><span>${t('merchant')}</span><span>${t('price')}</span><span>${t('available')} / ${t('limits')}</span><span>${t('payment')}</span><span>${t('trade')}</span></div><div id="order-book"></div></section></div>`;
 function draw(){const list=orders.filter(o=>o.side===side&&(method==='all'||o.pay.includes(method)));$('#order-book').innerHTML=list.map((o,i)=>`<div class="order-row"><div class="merchant"><span class="avatar">${o.name[0]}</span><div><b>${o.name}</b><small>✓ ${o.rating}</small></div></div><div class="order-cell"><b>$${o.price.toFixed(3)}</b><small>USD</small></div><div class="order-cell"><span>${o.amount}</span><small>${o.limit}</small></div><div class="payment-badges">${o.pay.map(x=>`<i>${x}</i>`).join('')}</div><button class="btn ${side==='buy'?'btn-green':'btn-danger'} trade-btn" data-name="${o.name}">${t(side==='buy'?'buyCrypto':'sellCrypto')}</button></div>`).join('')||`<div class="empty">No offers</div>`;$$('.trade-btn').forEach(b=>b.onclick=()=>openTrade(b.dataset.name));}
 $$('.market-tabs .chip').forEach(b=>b.onclick=()=>{side=b.dataset.side;$$('.market-tabs .chip').forEach(x=>x.classList.toggle('active',x===b));draw();haptic();});$$('#pay-filter .chip').forEach(b=>b.onclick=()=>{method=b.dataset.method;$$('#pay-filter .chip').forEach(x=>x.classList.toggle('active',x===b));draw();haptic();});draw();
}
function openTrade(name){let step=1;modalRoot.innerHTML=`<div class="modal-backdrop" id="trade-modal"><div class="modal"><div class="modal-handle"></div><div class="section-title"><div><p class="eyebrow">ESCROW PROTECTED</p><h2>${t('escrow')}</h2></div><button class="btn icon-btn" id="modal-close">×</button></div><p class="muted">${t('protected')}</p><div class="steps">${[t('order'),t('pay'),t('release')].map((x,i)=>`<div class="step ${i===0?'active':''}" data-step="${i+1}"><b>${i+1}</b>${x}</div>`).join('')}</div><div class="summary-line"><span>${t('merchant')}</span><b>${name}</b></div><div class="summary-line"><span>${t('amount')}</span><b>1,000 USDT</b></div><div class="summary-line"><span>${t('total')}</span><b>$1,001.00</b></div><button class="btn btn-primary" id="trade-next" style="width:100%;margin-top:20px">${t('continue')}</button></div></div>`;
 const close=()=>modalRoot.innerHTML='';$('#modal-close').onclick=close;$('#trade-modal').onclick=e=>{if(e.target.id==='trade-modal')close()};$('#trade-next').onclick=()=>{step++;$$('.step').forEach(x=>x.classList.toggle('active',+x.dataset.step<=step));haptic('medium');if(step>=3){$('#trade-next').textContent=t('confirm');$('#trade-next').onclick=()=>{notify();toast(t('protected'));close();};}};
}

const routes={'/':renderHome,'/meditation':renderMeditation,'/weather':renderWeather,'/crypto':renderCrypto,'/language':renderLanguage,'/real-estate':renderEstate,'/quiz':renderQuiz,'/p2p':renderP2P};

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

function navigate(path,push=true){
  cleanup();cleanup=()=>{};modalRoot.innerHTML='';
  let cleanPath = path;
  if (cleanPath.startsWith('/tma-portfolio-suite')) cleanPath = cleanPath.replace('/tma-portfolio-suite', '') || '/';
  if(!routes[cleanPath]) cleanPath='/';
  if(push) {
    if (location.pathname.includes('tma-portfolio-suite')) {
      history.pushState({}, '', '#' + cleanPath);
    } else if (location.pathname !== cleanPath) {
      history.pushState({}, '', cleanPath);
    }
  }
  routes[cleanPath]();
  $$('.dock a').forEach(a=>{
    const target = a.getAttribute('href');
    a.classList.toggle('active', target === cleanPath);
  });
  app.focus({preventScroll:true});
  window.scrollTo({top:0,behavior:'smooth'});
}

function applyStaticI18n(){
  $$('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));
  $$('[data-lang]').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));
  document.documentElement.lang=lang==='ua'?'uk':lang;
}

document.addEventListener('click',e=>{
  const link=e.target.closest('a[data-link]');
  if(link){
    e.preventDefault();
    const href = link.getAttribute('href') || link.pathname;
    navigate(href);
  }
  const btn=e.target.closest('button');
  if(btn&&!btn.disabled)haptic();
});

$$('[data-lang]').forEach(b=>b.onclick=()=>{
  lang=b.dataset.lang;
  localStorage.setItem('obsidian-lang',lang);
  applyStaticI18n();
  navigate(getCurrentRoute(),false);
});

window.addEventListener('popstate',()=>navigate(getCurrentRoute(),false));
window.addEventListener('hashchange',()=>navigate(getCurrentRoute(),false));
applyStaticI18n();
navigate(getCurrentRoute(),false);
