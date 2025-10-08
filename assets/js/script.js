// script.js

// Countries and flag data //

const countries = [
    { name: 'United States', flag: '🇺🇸' },
    { name: 'Canada', flag: '🇨🇦' },
    { name: 'United Kingdom', flag: '🇬🇧' },
    { name: 'France', flag: '🇫🇷' },
    { name: 'Germany', flag: '🇩🇪' },
    { name: 'Italy', flag: '🇮🇹' },
    { name: 'Spain', flag: '🇪🇸' },
    { name: 'Japan', flag: '🇯🇵' },
    { name: 'China', flag: '🇨🇳' },
    { name: 'India', flag: '🇮🇳' },
    { name: 'Brazil', flag: '🇧🇷' },
    { name: 'Australia', flag: '🇦🇺' },
    { name: 'Mexico', flag: '🇲🇽' },
    { name: 'Sweden', flag: '🇸🇪' },
    { name: 'Norway', flag: '🇳🇴' },
    { name: 'Russia', flag: '🇷🇺' },
    { name: 'South Korea', flag: '🇰🇷' },
    { name: 'South Africa', flag: '🇿🇦' },
    { name: 'Argentina', flag: '🇦🇷' },
    { name: 'Turkey', flag: '🇹🇷' }
];

// DOM elements

const flagEl = document.getElementById('flag'),
optionsEl = document.getElementById('options'), 
feedbackEl = document.getElementById('feedback'), 
scoreEl = document.getElementById('score'), 
qnumEl = document.getElementById('qnum'), 
totalEl = document.getElementById('total'), 
nextBtn = document.getElementById('nextBtn'), 
restartBtn = document.getElementById('restartBtn'), 
modeSel = document.getElementById('mode'), 
timerEl = document.getElementById('timer');

// Game state variables

let score = 0, 
qIndex = 0, totalQ = 10, 
current = null, timer = null, 
timeLeft = 15, 
answering = false;

// Utility: shuffle array

function shuffle(a) { 
    for (let i = a.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]] } 
        return a 
    }