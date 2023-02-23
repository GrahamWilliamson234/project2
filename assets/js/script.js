// question api //
const endpoint = 'https://opentdb.com/api.php?amount=10&type=multiple';
let questions = [];
let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const submitBtn = document.getElementById('submit');
const scoresEl = document.getElementById('scores');
// get questions //
async function getQuestions() {
  const response = await fetch(endpoint);
  const data = await response.json();
  questions = data.results;
  showQuestion();
}
// show questions //
function showQuestion() {
    const question = questions[currentQuestion];
    questionEl.innerText = question.question;
  
    const choices = question.incorrect_answers.concat(question.correct_answer);
    choicesEl.innerHTML = '';
    choices.forEach(choice => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'choice';
      input.value = choice;
      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      choicesEl.appendChild(label);
    });
  }
  // check question //
function checkAnswer() {
    const selectedChoice = document.querySelector('input[name="choice"]:checked');
    if (!selectedChoice) {
      return;
    }
    const selectedAnswer = selectedChoice.value;
    const correctAnswer = questions[currentQuestion].correct_answer;
    if (selectedAnswer === correctAnswer) {
      score++;
    }
    currentQuestion++;
    if (currentQuestion >= questions.length) {
      endGame();
    } else {
      showQuestion();
    }
  }
  // end game //
function endGame() {
    questionEl.innerText = `Your score: ${score}`;
    choicesEl.innerHTML = '';
    submitBtn.disabled = true;
    saveScore();
    showScores();
  }
  // save game //
function saveScore() {
    const name = prompt('Leaderboard - Enter your name:');
    const scoreObj = { name, score };
    let scores = localStorage.getItem('scores');
    if (scores) {
      scores = JSON.parse(scores);
    } else {
      scores = [];
    }
    scores.push(scoreObj);
    scores.sort((a, b) => b.score - a.score);
    localStorage.setItem('scores', JSON.stringify(scores));
  }
// show scores //
function showScores() {
    let scores = localStorage.getItem('scores');
    if (!scores) {
      scores = [];
    } else {
      scores = JSON.parse(scores);
    }
    scoresEl.innerHTML = '';
    scores.forEach(scoreObj => {
      const li = document.createElement('li');
      li.innerText = `${scoreObj.name}: ${scoreObj.score}`;
      scoresEl.appendChild(li);
    });
  }
  
  submitBtn.addEventListener('click', checkAnswer);
  
  getQuestions();
  // rest quiz //
function resetQuiz() {
    score = 0;
    currentQuestion = 0;
    questions = [];
    showQuestion();
    submitBtn.disabled = false;
  }
  