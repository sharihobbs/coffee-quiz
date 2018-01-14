const coffeeArray = [
      {qNum: 1,
      question: 'How many cups of coffee are enjoyed daily around the world?',
      answerOptions: ['1 Billion','2.25 Billion','150 Million','3.5 Billion'],
      correctAnswer: '2.25 Billion'          
    }, 
      {qNum: 2,
      question: 'What country is the world\'s leading coffee consumer?',
      answerOptions: ['Brazil','Costa Rica','France','United States'],
      correctAnswer: 'United States'
    }, 
      {qNum: 3,
      question: 'What is added to coffee to make a Latte?',
      answerOptions: ['Half & Half', 'Cinnamon','Milk','Water'],
      correctAnswer: 'Milk'
    }, 
      {qNum: 4,
      question: 'How many cups of coffee would deliver a lethal dose of caffeine?',
      answerOptions: [12,50,100,300],
      correctAnswer: 100
    }, 
      {qNum: 5,
      question: 'What animals assisted in the discovery of coffee?',
      answerOptions: ['Cats','Goats','Elephants','Bears'],
      correctAnswer: 'Goats'
    }, 
      {qNum: 6,
      question: 'What country is home to a spa where you can swim in coffee?',
      answerOptions: ['Finland','Japan','Indonesia','Colombia'],
      correctAnswer: 'Japan'
    }, 
      {qNum: 7,
      question: 'How many calories are found in one 8 ounce cup of coffee?',
      answerOptions: [1,4,0,6],
      correctAnswer: 1
    }, 
      {qNum: 8, 
      question: 'What is Green coffee?',
      answerOptions: ['Vegan coffee','Sustainably sourced coffee','Unroasted coffee','Coffee beans that have spoiled'],
      correctAnswer: 'Unroasted coffee'
    }, 
      {qNum: 9, 
      question: 'Coffee is a...',
      answerOptions: ['Legume','Vegetable','Fruit','Spice'],
      correctAnswer: 'Fruit'
    }, 
      {qNum: 10,
      question: 'What is the world\'s top coffee producing country?',
      answerOptions: ['Brazil','Colombia','India','Ethiopia'],
      correctAnswer: 'Brazil'
    }
  ];
  
let currentQ = 0;

function startQuizAtStart() {
  // begin quiz, reveal submit button, and hide start page
  $('#start-page').on('click', '.button', event => {
    $('#start-page').addClass('hidden');
    $('#question-page').removeClass('hidden');
    $('#submit-answer').removeClass('hidden');
  });
}

function renderQuestions() {
  // populate questions and answers from array of questions and answers
  const answer1 = `${coffeeArray[currentQ].answerOptions[0]}`;
  const answer2 = `${coffeeArray[currentQ].answerOptions[1]}`;
  const answer3 = `${coffeeArray[currentQ].answerOptions[2]}`;
  const answer4 = `${coffeeArray[currentQ].answerOptions[3]}`;
  const questionText = `<legend>${currentQ+1}/10: ${coffeeArray[currentQ].question}<legend>`;
  const answersText = 
  `<input type='radio' name='option' class='radio-buttons' id='answer1' value='${answer1}'><label for='answer1'>${answer1}</label><br>
  <input type='radio' name='option' class='radio-buttons' id='answer2' value='${answer2}'><label for='answer2'>${answer2}</label><br>
  <input type='radio' name='option' class='radio-buttons' id='answer3' value='${answer3}'><label for='answer3'>${answer3}</label><br>
  <input type='radio' name='option' class='radio-buttons' id='answer4' value='${answer4}'><label for='answer4'>${answer4}</label><br>`;
  $('.coffee-question').html(questionText);
  $('.coffee-answers').html(answersText);
  enableSubmitButton();
}

function enableSubmitButton() {
  // restore submit button after disabling it
  $('input[name=option]').on('click', function(event) {
    $('#submit-answer').removeClass('disabled').removeAttr('disabled');
  });
}
    
function submitQuizAnswer() {
  // submit selected answer, disable radio buttons
  $('#submit-answer').click(function(event) {
    event.preventDefault();
    evaluateAnswers();
    $('#submit-answer').addClass('hidden');
    $('#next-question').removeClass('hidden');
    $('input[type=radio]').attr('disabled', true);
  });
}

let userScore = {
  correct: 0,
  incorrect: 0,
};

function evaluateAnswers() {
  //check for correct answer and display results and/or correct answer, also display updated score
  let radioValue = $('input[name=option]:checked').val();
  if (radioValue == coffeeArray[currentQ].correctAnswer) {
    userScore.correct++;
    $('#feedbackcorrect').removeClass('hidden');
  } else {
    userScore.incorrect++;
    getCorrectAnswer();
    $('#feedbackincorrect').removeClass('hidden');
    $('.sad-coffee').removeClass('hidden');
  }
  $('.results-counter').html(`<p>Correct: ${userScore.correct} | Incorrect: ${userScore.incorrect}</p>`);
}  
  
function getCorrectAnswer() {
  //create text for incorrect result including correct answer
  let popupAnswerText = `<h3>Incorrect! But don't worry, be frappe!<br>The correct answer is: ${coffeeArray[currentQ].correctAnswer}.</h3><br>`;
  $('#feedbackincorrect').html(popupAnswerText);
} 
      
function advanceToNextQuestion() {
  // advance user to the next question or show final score depending on current question 
  $('#next-question').on('click', function(event) {
    if (currentQ < coffeeArray.length-1) {
      currentQ++;
      renderQuestions();
      resetQuestion();
    } else {
      showFinalScore();
    } 
  });
}

function resetQuestion() {
  // reset question and answers, remove previous results and swap submit and next buttons
  $('input[type=radio]').attr('disabled', false);
  $('#next-question').addClass('hidden');
  $('#submit-answer').removeClass('hidden');
  $('#feedbackcorrect').addClass('hidden');
  $('#feedbackincorrect').addClass('hidden');
  $('.sad-coffee').addClass('hidden');
  $('#submit-answer').addClass('disabled');
  $('#submit-answer').attr('disabled', 'disabled');
}

function showFinalScore() {
  // hide submit button and display final page with final score
      $('#submit-answer').addClass('hidden');
      $('#final-page').removeClass('hidden');
      $('#question-page').addClass('hidden');
      let finalScoreText = `<h3>You answered ${userScore.correct} out of 10 questions correctly!</h3>`;
      $('#final-correct').append(finalScoreText);
  }

function restartQuiz() {
  // takes user back to start upon click
  $('#retake').click(function() {
    location.reload();
  });
}

function handleQuizFunctions() {
  startQuizAtStart();
  renderQuestions();
  submitQuizAnswer();
  advanceToNextQuestion();
  restartQuiz();
  enableSubmitButton();
}

$(handleQuizFunctions);
