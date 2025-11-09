// FAQ accordion is removed in this simplified layout - keep quiz
const quiz = [
  {
    q: "Что нужно сделать, если тебе прислали ссылку от незнакомого человека?",
    choices: ["Сразу открыть — возможно это подарок", "Перейти и ввести свои данные", "Не переходить и спросить у взрослых", "Переслать друзьям"],
    a: 2
  },
  {
    q: "Какой пароль лучше?",
    choices: ["123456", "Имя+год рождения", "Длинная фраза со знаками", "Повторяющийся набор букв"],
    a: 2
  },
  {
    q: "Что такое фишинг?",
    choices: ["Рыбалка", "Попытка обманом получить личные данные", "Программа для музыки", "Антивирус"],
    a: 1
  },
  {
    q: "Кому стоит рассказать, если тебя оскорбляют онлайн?",
    choices: ["Никому", "Только самому агрессору", "Родителям или школьному психологу", "Только друзьям"],
    a: 2
  }
];

let current = 0;
let score = 0;
const qText = document.getElementById('q-text');
const answersEl = document.getElementById('answers');
const nextBtn = document.getElementById('nextBtn');
const scoreEl = document.getElementById('score');
const quizEnd = document.getElementById('quiz-end');

function renderQuestion(){
  if(current >= quiz.length){
    document.getElementById('quiz-area').style.display = 'none';
    quizEnd.style.display = 'block';
    return;
  }
  const item = quiz[current];
  qText.textContent = (current + 1) + '. ' + item.q;
  answersEl.innerHTML = '';
  item.choices.forEach((ch, idx) => {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.style.background = 'var(--glass)';
    btn.style.color = 'inherit';
    btn.textContent = ch;
    btn.type = 'button';
    btn.addEventListener('click', function(){
      if(btn.dataset.locked) return;
      answersEl.querySelectorAll('button').forEach(b=>{
        b.dataset.locked = '1';
        b.disabled = true;
      });
      if(idx === item.a){
        btn.style.outline = '2px solid rgba(34,197,94,0.25)';
        score += 1;
        scoreEl.textContent = 'Баллы: ' + score;
      } else {
        btn.style.outline = '2px solid rgba(239,68,68,0.18)';
        const correctBtn = answersEl.querySelectorAll('button')[item.a];
        if(correctBtn) correctBtn.style.outline = '2px solid rgba(34,197,94,0.25)';
      }
    });
    answersEl.appendChild(btn);
  });
}

nextBtn.addEventListener('click', function(){
  current++;
  renderQuestion();
});

// initialize
renderQuestion();
