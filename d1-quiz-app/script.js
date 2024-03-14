const questions = [
  {
    question:
      "Có 5 quả táo trong giỏ. An lấy thêm 2 quả táo nữa. An có bao nhiêu quả táo?",
    answers: [
      { text: "3", correct: false },
      { text: "4", correct: false },
      { text: "5", correct: false },
      { text: "7", correct: true },
    ],
  },
  {
    question:
      "Mẹ mua 10 quả cam. Mẹ bán đi 4 quả cam. Mẹ còn lại bao nhiêu quả cam?",
    answers: [
      { text: "4", correct: false },
      { text: "5", correct: false },
      { text: "6", correct: true },
      { text: "7", correct: false },
    ],
  },
  {
    question:
      "Lớp học có 20 học sinh. 12 học sinh là nam. Lớp học có bao nhiêu học sinh nữ?",
    answers: [
      { text: "8", correct: true },
      { text: "9", correct: false },
      { text: "10", correct: false },
      { text: "11", correct: false },
    ],
  },
  {
    question:
      "Có 3 con chim đang đậu trên cành cây. 5 con chim bay đến đậu thêm. Có bao nhiêu con chim đậu trên cành cây?",
    answers: [
      { text: "5", correct: false },
      { text: "6", correct: false },
      { text: "7", correct: false },
      { text: "8", correct: true },
    ],
  },
  {
    question:
      "Bố đi chợ mua 1kg thịt bò giá 120.000 đồng. Bố trả tiền bằng tờ 200.000 đồng. Bố nhận được bao nhiêu tiền thừa?",
    answers: [
      { text: "50.000", correct: false },
      { text: "60.000", correct: false },
      { text: "70.000", correct: true },
      { text: "80.000", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = `${questionNo}. ` + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    // if (button.dataset.correct === "true") {
    //   button.classList.add("correct");
    // }
    button.disabled = true;
  });
  nextButton.style.display = "block";
  showQuestionLeft()
}

function showScore() {
    resetState()
    questionElement.innerHTML = `Your scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
}

function handleNextButton() {
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        showQuestion()
    } else {
        showScore()
    }
}

const notification = document.querySelector(".notification")

function showQuestionLeft() {
    notification.innerHTML = `${questions.length - currentQuestionIndex - 1} question left`
    notification.style.display = "block"
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton()
    console.log(currentQuestionIndex)
    notification.style.display = "none"
} else {
    startQuiz()
    console.log(currentQuestionIndex)
  }
});

startQuiz()
