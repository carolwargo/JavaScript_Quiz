//VARIABLES- html elements defined by Id & class
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const scoreText = document.getElementById("score");
const progressText = document.getElementById('progressText');
const progressBarFull = document.getElementById('progressBarFull');


const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];


//QUESTION & CHOICE ARRAY 
const questions = [
  {
      question: "Which of the following would you use to store a list of items within a single variable?",
      choice1: "array",
      choice2: "for loop",
      choice3: "string",
      choice4: "if statement",
      answer: 1
  },
  {
      question: "Which of the following Datatypes represent true -or- false?",
      choice1: "undefined",
      choice2: "string",
      choice3: "number",
      choice4: "boolean",
      answer: 4
  },

  {
      question: "Which of the following is not a variable declaration in JavaScript?",
      choice1: "const",
      choice2: "let",
      choice3: "for",
      choice4: "var",
      answer: 3
  },
  {
      question: "Inside which HTML element do we put the JavaScript?",
      choice1: "<script>",
      choice2: "<javascript>",
      choice3: "<js>",
      choice4: "<scripting>",
      answer: 1
  },
  {
      question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
      choice1: "<script href='xxx.js'>",
      choice2: "<script name='xxx.js'>",
      choice3: "<script src='xxx.js'>",
      choice4: "<script file='xxx.js'>",
      answer: 3
  },
  {
      question: "How do you write 'Hello World' in an alert box?",
      choice1: "msgBox('Hello World');",
      choice2: "alertBox('Hello World');",
      choice3: "msg('Hello World');",
      choice4: "alert('Hello World');",
      answer: 4
  }
];

// Now you can use the 'questions' array in your JavaScript code


//CONSTANTS max pts allowed,10 points given for each correct answer
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 6;

//RESETS counter, score and questions & makes CALL for NEW QUESTION (1st question)
startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions]; // Use the loaded questions
  getNewQuestion();
  game.classList.remove('hidden');
};

//GET NEW QUESTION until no more NEW QUESTIONS are available
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    // go to the end page
    return window.location.assign("/End/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  // Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};
//EVENT LISTENER: award pts for CORRECT answers & UPDATE progress bar
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    //LOG WRONG ANSWERS
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
    selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    //RETURNS red or green based correct answer
    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);
    
    // TIME LIMIT
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

// ADDS & UPDATES SCORE
incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

// Start the game when page loads
startGame();