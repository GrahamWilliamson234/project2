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
  