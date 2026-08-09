const quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" }
];

const quoteEl = document.querySelector('#quote');
const authorEl = document.querySelector('#author');
const newQuoteBtn = document.querySelector('#new-quote');
const cardEl = document.querySelector('#quote-card');
const themeToggle = document.querySelector('#theme-toggle');

function applyTheme(theme){
  const body = document.body;
  if(theme === 'dark'){
    body.classList.add('dark');
    if(themeToggle) themeToggle.textContent = '☀️';
    if(themeToggle) themeToggle.setAttribute('aria-pressed','true');
  } else {
    body.classList.remove('dark');
    if(themeToggle) themeToggle.textContent = '🌙';
    if(themeToggle) themeToggle.setAttribute('aria-pressed','false');
  }
}

function getRandomIndex(max){
  return Math.floor(Math.random() * max);
}

function setQuote(obj){
  quoteEl.textContent = obj.text;
  authorEl.textContent = `— ${obj.author}`;
}

function showRandomQuote(){
  // Smooth fade: add fade-out, change text after transition, then remove
  quoteEl.classList.add('fade-out');
  authorEl.classList.add('fade-out');

  setTimeout(()=>{
    const idx = getRandomIndex(quotes.length);
    setQuote(quotes[idx]);
    quoteEl.classList.remove('fade-out');
    authorEl.classList.remove('fade-out');
  }, 220);
}

// Initialize
document.addEventListener('DOMContentLoaded', ()=>{
  // initialize theme first
  const saved = localStorage.getItem('rpg-theme');
  if(saved){
    applyTheme(saved);
  } else {
    // follow system preference if available
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  const idx = getRandomIndex(quotes.length);
  setQuote(quotes[idx]);
});

newQuoteBtn.addEventListener('click', showRandomQuote);

// Theme toggle click handler
if(themeToggle){
  themeToggle.addEventListener('click', ()=>{
    const isDark = document.body.classList.contains('dark');
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('rpg-theme', next);
  });
}
