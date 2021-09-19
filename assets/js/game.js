




const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
const timeH = document.getElementById('timer');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;

let timeSecond = 120;
let availableQuesions = [

    {
      "question": "Math.random() returns",
      "choice1": "a random number that can be any value",
      "choice2": "a random number between 0 and 100",
      "choice3": "a random number between 0 and 1",
      "choice4": "a random number between 0 and 1000",
      "answer": 3
    },
    {
      "question": "What should appear at the very end of your javascript?",
      "choice1": "the End statment",
      "choice2": "the </script>",
      "choice3": "the <script>",
      "choice4": "none of the above",
      "answer": 2
    },
    {
      "question": "Inside which HTML element do we put the Javascript?",
      "choice1": "<js>",
      "choice2": "<scripting>",
      "choice3": "<script>",
      "choice4": "<javascript>",
      "answer": 3
    }
]
  
      

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
   
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});


    incrementScore = (num) => {
        score += num;
        scoreText.innerText = score;
   };
   displayTime(120);

   const countDown = setInterval(()=>{
     timeSecond--;
     displayTime(timeSecond);
     if(timeSecond == 0 || timeSecond < 1){
       endCount();
       clearInterval(countDown);
     }
   }, 1000);
   
   function displayTime(second){
     const min = Math.floor(second / 60);
     const sec = Math.floor(second % 60);
     timeH.innerHTML = `
     ${(min < 10) ? '0' : ''}${min}:${(sec < 10) ? '0' : ''}${sec}
     `; 
   }
   
function endCount() {
    timeH.innerHTML = 'Time out';

    localStorage.setItem('mostRecentScore', score);
    window.location.assign('end.html')
}
startGame()