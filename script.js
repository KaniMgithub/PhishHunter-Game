let currentQuestion = 0;
let score = 0;
let questions = [];

const questionBox = document.getElementById("questionBox");
const optionsList = document.getElementById("optionsList");
const nextBtn = document.getElementById("nextBtn");
const scoreBox = document.getElementById("scoreBox");

fetch('questions.json')
  .then(res => res.json())
  .then(data => {
    questions = data;
    loadQuestion();
  })
  .catch(err => {
    questionBox.innerText = "⚠️ Failed to load questions.";
    console.error(err);
  });

function loadQuestion() {
  nextBtn.disabled = true;
  optionsList.innerHTML = "";

  const q = questions[currentQuestion];
  questionBox.innerText = q.question;

  q.options.forEach(option => {
    const li = document.createElement("li");
    li.innerText = option;
    li.onclick = () => selectAnswer(li, q.answer);
    optionsList.appendChild(li);
  });
}

function selectAnswer(selected, correct) {
  [...optionsList.children].forEach(li => {
    li.style.pointerEvents = "none";
    if (li.innerText === correct) li.style.background = "green";
  });

  if (selected.innerText === correct) {
    selected.style.background = "green";
    score++;
  } else {
    selected.style.background = "red";
  }

  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    endGame();
  }
};

function endGame() {
  document.getElementById("game").style.display = "none";
  scoreBox.style.display = "block";
  scoreBox.innerHTML = `<h2>🎉 Quiz Complete!</h2><p>Your Score: ${score}/${questions.length}</p>`;
}
