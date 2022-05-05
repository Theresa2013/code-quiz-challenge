var startButton = document.getElementById("start-btn")
var nextButton = document.getElementById("next-btn")
var questionContainerElement = document.getElementById("question-container")
var questionElement = document.getElementById("question")
var answerButtonsElement = document.getElementById("answer-buttons")
var timerEl = document.getElementById("timer")

var shuffledQuestions, currentQuestionIndex

function startTimer() {
    var timeLeft = 60;

    var timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        }
    }, 1000);
}


function startGame() {
    startButton.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    setNextQuestion();
    startTimer();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    })
}
function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    }
    else {
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    }
    else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

var questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyperlinks and Text Markup Language", correct: false },
            { text: "Hypertext Markup Language", correct: true },
            { text: "Hybrids Teslas Maseratis and Lamborghinis", correct: false },
            { text: "Hyper Texting Mother in Law", correct: false }
        ]
    },
    {
        question: "What does CSS stand for?",
        answsers: [
            { text: "Correct Style Sheets", correct: false },
            { text: "Correct Starting Styles", correct: false },
            { text: "CSS Style Starters", correct: false },
            { text: "Cascading Style Sheets", correct: true }
        ]
    },
    {
        question: "Commonly used data types DO NOT include",
        answsers: [
            { text: "strings", correct: false },
            { text: "booleans", correct: false },
            { text: "alerts", correct: true },
            { text: "numbers", correct: false }
        ]
    }
]

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
})

startButton.addEventListener("click", startGame)