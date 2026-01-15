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

// Create a fresh shuffled pool for each game and avoid repeats

let questionPool = [];

// Utility: shuffle array

function shuffle(a) { 
    for (let i = a.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]] } 
        return a 
    }

// Build a new question pool (replaces old random picking option)

function buildQuestionPool() {
    totalQ = parseInt(modeSel.value, 10);   // 10 or 20
    questionPool = shuffle([...countries]).slice(0, totalQ);

    qIndex = 0;
    qnumEl.textContent = 0;
    totalEl.textContent = totalQ;
}

// Pick a new question with options

// function pickQuestion() { 
//     const correct = countries[Math.floor(Math.random() * countries.length)], 
//     others = shuffle(countries.filter(c => c.name !== correct.name)).slice(0, 3), 
//     opts = shuffle([correct, ...others]); 
//     return { correct, opts } 
// }

// pick next question from pool without repetition

function pickQuestion() {
    return questionPool[qIndex];
}

// Render the current question

// function renderQuestion() { 
//     if (totalQ !== 0 && qIndex >= totalQ) { 
//         feedbackEl.className = 'feedback'; feedbackEl.textContent = `Finished! Your score: ${score} / ${totalQ}`; 
//         flagEl.textContent = '🏁'; 
//         optionsEl.innerHTML = ''; 
//         nextBtn.textContent = 'Restart'; 
//         answering = false; 
//         clearInterval(timer); 
//         timerEl.textContent = '--'; return } 
        
//         current = pickQuestion(); 
//         flagEl.textContent = current.correct.flag; 
//         optionsEl.innerHTML = ''; 


        
//   // Render options buttons        
//         current.opts.forEach((opt, i) => { 
//             const b = document.createElement('button'); 
//             b.className = 'opt'; 
//             b.dataset.name = opt.name; 
//             b.innerHTML = `<div style="font-weight:700">${i + 1}. ${opt.name}</div>`; 
//             b.addEventListener('click', () => selectAnswer(opt.name, b)); 
//             optionsEl.appendChild(b) 
//         }); 
//             qIndex++; qnumEl.textContent = qIndex; 
//             feedbackEl.textContent = ''; 
//             nextBtn.disabled = true; 
//             answering = true; startTimer() 
//         }

// Render question (new code)

function renderQuestion() {

    // End of quiz
    if (qIndex >= totalQ) {
        feedbackEl.className = 'feedback';
        feedbackEl.textContent = `Finished! Your score: ${score} / ${totalQ}`;
        flagEl.textContent = '🏁';
        optionsEl.innerHTML = '';
        nextBtn.textContent = 'Restart';
        answering = false;
        clearInterval(timer);
        timerEl.textContent = '--';
        return;
    }

    current = pickQuestion();
    flagEl.textContent = current.flag;
    optionsEl.innerHTML = '';

    const others = shuffle(
        countries.filter(c => c.name !== current.name)
    ).slice(0, 3);

    const opts = shuffle([current, ...others]);

    opts.forEach((opt, i) => {
        const b = document.createElement('button');
        b.className = 'opt';
        b.dataset.name = opt.name;
        b.innerHTML = `<div style="font-weight:700">${i + 1}. ${opt.name}</div>`;
        b.addEventListener('click', () => selectAnswer(opt.name, b));
        optionsEl.appendChild(b);
    });

    qIndex++;
    qnumEl.textContent = qIndex;
    feedbackEl.textContent = '';
    nextBtn.disabled = true;
    answering = true;
    startTimer();
}

// Handle answer selection
      function selectAnswer(name, btn) { 
    if (!answering) return; answering = false; 
    clearInterval(timer); 
    

        if (name === correctName) { 
            score++; scoreEl.textContent = score; 
            feedbackEl.className = 'feedback correct'; 
            feedbackEl.textContent = 'Correct! 🎉'; 
            btn.style.borderColor = 'rgba(16,185,129,0.9)' 
        } else {feedbackEl.className = 'feedback wrong'; 
                feedbackEl.textContent = `Wrong — correct answer: ${correctName}`; 
                btn.style.borderColor = 'rgba(239,68,68,0.9)';
                [...optionsEl.children].forEach(b => { 
                    if (b.dataset.name === correctName) b.style.borderColor = 'rgba(16,185,129,0.9)' }) 
                } 
        nextBtn.disabled = false;  
        }

// Timer for each question
function startTimer() { 
    clearInterval(timer); 
    timeLeft = 15; 
    timerEl.textContent = `${timeLeft}s`; 

    timer = setInterval(() => { timeLeft--; 
    timerEl.textContent = `${timeLeft}s`; 
        if (timeLeft <= 0) { clearInterval(timer); 
            answering = false; 
            feedbackEl.className = 'feedback wrong'; 
            feedbackEl.textContent = `Time! correct: ${current.name}`;
            [...optionsEl.children].forEach(b => { 
                if (b.dataset.name === current.name) {b.style.borderColor = 'rgba(16,185,129,0.9)';
                }
            }); 
            
            nextBtn.disabled = false; }}, 1000); 
                
            }


// Start/restart the game
// function startGame() { 
//     score = 0; 
//     qIndex = 0; 
//     scoreEl.textContent = score; 
//     totalQ = parseInt(modeSel.value, 10); 
//     totalEl.textContent = totalQ === 0 ? '∞' : totalQ; nextBtn.textContent = 'Next'; 
//     renderQuestion() 
// }

function startGame() {
    score = 0;
    scoreEl.textContent = 0;
    answering = false;

    buildQuestionPool(); // applies mode immediately (fixed)
    nextBtn.textContent = 'Next';

    renderQuestion();
}

    // nextBtn.addEventListener('click', () => { 
    //     if (nextBtn.textContent === 'Restart') { startGame(); 
    //         return 
    //     } 
    //         if (answering) { clearInterval(timer); 
    //             answering = false; 
    //             feedbackEl.className = 'feedback wrong'; 
    //             feedbackEl.textContent = `Skipped — correct: ${current.correct.name}`;
    //             [...optionsEl.children].forEach(b => { 
    //                 if (b.dataset.name === current.correct.name) b.style.borderColor = 'rgba(16,185,129,0.9)' }); 

    //                 nextBtn.textContent = (totalQ !== 0 && qIndex >= totalQ) ? 'See results' : 'Next'; 
    //                 nextBtn.disabled = false; 
    //                 return 
    //             } 
    //             renderQuestion(); 
    //         });

    nextBtn.addEventListener('click', () => {

    if (nextBtn.textContent === 'Restart' || qIndex === 0) {
        startGame();
        return;
    }

    if (answering) {
        clearInterval(timer);
        answering = false;

        feedbackEl.className = 'feedback wrong';
        feedbackEl.textContent = `Skipped — correct: ${current.name}`;

        [...optionsEl.children].forEach(b => {
            if (b.dataset.name === current.name) {
                b.style.borderColor = 'rgba(16,185,129,0.9)';
            }
        });

        nextBtn.disabled = false;
        return;
    }

    renderQuestion();
});

restartBtn.addEventListener('click', () => startGame());

    totalEl.textContent = totalQ; 
    qnumEl.textContent = 0; 
    scoreEl.textContent = 0; 
    timerEl.textContent = '--';