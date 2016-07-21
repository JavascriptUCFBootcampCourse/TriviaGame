(function() {
  var questions = [{
    question: "What is 7*5?",
    choices: [30, 35, 40, 50, 60],
    correctAnswer: 1

  }, {
    question:"What is 4*6?",
    choices: [0, 6, 12, 18, 24],
    correctAnswer: 4
  }, {
    question: "What is 8*10?",
    choices: [80, 90, 100, 110, 120],
    correctAnswer: 0
  }, {
    question: "What is 11*7",
    choices: [44, 55, 66, 77, 88],
    correctAnswer: 3
  }, {
    question: "What is 100*9",
    choices: [500, 600, 700, 800, 900],
    correctAnswer: 4
  }];

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object

// Display initial question
displayNext();

// Click handler for the 'next' button
$('#next').on('click', function (e) {
  e.preventDefault();

  // Suspend click listner during fade animation
  if(quiz.is(':animated')) {
    return false;
  }

  choose();

  // If no user selection, progress is stopped
  if (isNaN(selections[questionCounter])) {
    alert('Please make a selection!');
  } else {
    questionCounter++;
    displayNext();
  }
});

// Click handler for the 'prev' button
$('#prev').on('click', function(e) {
  e.preventDefault();

  if(quiz.is(':animated')) {
    return false;
  }
  choose();
  questionCounter--;
  displayNext();
});

// Click hanlder for the 'Start Over' button
$('#start').on('click', function(e) {
  e.preventDefault();

  if(quiz.is(':animated')) {
    return false;
  }
  questionCounter = 0;
  selections = [];
  displayNext();
  $('#start').hide();
});

// Creates and returns the div contains the questions and the answer selections
function createQuestionElement(index) {
  var qElement = $('<div>', {
    id: 'question'
  });

  var header = $('<h2>Question ' + (index + 1) + '</h2>');
  qElement.append(header);

  var question = $('<p>').append(questions[index].question);
  qElement.append(question);

  var radioButtons = createRadios(index);
  qElement.append(radioButtons);

  return qElement;

}

// Creates a list of the answer choices as radio inputs
function createRadios(index) {
  var radioList =$('<ul>');
  var item;
  var input = '';
  for (var i = 0; i < questions[index].choices.length; i++) {
    item=$('<li>');
    input = '<input type="radio" name="answer" value=' + i + ' />';
    input += questions[index].choices[i];
    item.append(input);
    radioList.append(item); 
  }

  return radioList
}


// Reads the user selection and pushes the value to an array
function choose() {
  selections[questionCounter] = 
+$('input[name="answer"]:checked').val();
}

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });

    // Timer function that only allows 30 seconds per question

    setTimeout(function() {
      alert('Times up!');
      
      questionCounter++;
      displayNext();

    }, 305000)
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();