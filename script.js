// Define and initialize variable
let quizArray = [
    {
        question: 'Commonly used data types DO NOT include:',
        choice: ['1. strings', '2. booleans', '3. alerts','4. numbers']
    },

    {
        question: "What property can you use to change an element's class name with JavaScript?",
        choice: ['1. style', '2. className', '3. node','4. class']
    },

    {
        question: 'Which method can be used to remove an element from the DOM?',
        choice: ['1. removeChild', '2. removeElement', '3. removeNode','4. removeParent']
    },

    {
        question: 'What is one way to think of an array?',
        choice: ['1. As a racetrack ', '2. As a box of chocolate', '3. As a shopping list','4. As a carton of milk']
    },

    {
        question: 'Which array method adds an item to the end of an array?',
        choice: ['1. shift', '2. unshift', '3. pop','4. push']
    },
  
];

var myKey =['1. strings', '2. className', '1. removeChild','3. As a shopping list', '4. push' ];

var questIndex = 0;

var timer = 75;

var highScore = 0;

var myScore = '';

var startBtn = $(".btn-start");  //select the start button


var storedMyScore = JSON.parse(localStorage.getItem('myScore'));
if(storedMyScore !== null) {
    myScore = storedMyScore;

}

// Retrieve the highScore from local Storage
var storedHighScore = JSON.parse(localStorage.getItem('highScore'));
if (storedHighScore !== null) {
    highScore = storedHighScore;
}



startBtn.on('click', () => {
    $(".welcome").addClass("d-none");
    $(".quiz").removeClass("d-none");
    setTime();
    renderQuiz();
    $('.leadingScore').addClass("d-none");
});

// Choose multiple choice answer for each quiz question
$(".quiz").on('click', (event) => {
    if (event.target.tagName == 'BUTTON') {
        var myChoice = $(event.target).text();
        if (myChoice == myKey[questIndex]) {
            $('h3').text('Correct!');
            $('.multiChoice').empty();
            nextQuestion();
        }
        else {
            $('h3').text('Wrong!');
            if (timer < 10) {
                timer = 0;
            }
            else {
                timer -= 10;
            }
            $('.multiChoice').empty();
            nextQuestion();
        }
    }

});

// ---Render Quiz---//
function renderQuiz () {
    if(questIndex <= 4 && timer > 0){
        $(".question").text(quizArray[questIndex].question);
        var multiChoice = quizArray[questIndex].choice;
        for (let i = 0; i < multiChoice.length; i++) {
            var button = $("<button>");
            button.addClass("btn-lg btn-info d-inline mb-2");
            button.text(multiChoice[i]);
            $(".multiChoice").append(button);
        }
    }
}

// ---Render next question---//
function nextQuestion () {
    if (questIndex < 5) {
        questIndex++;
        renderQuiz();
    }
    else {
        alert ('You are done!');
    }
}

// ---Set up timer--//
function setTime() {
    var timeInterval = setInterval( () => {
        timer--;
        $('.timer').text(timer);
    if (questIndex >=5 || timer === 0) {
        highScore = timer;
        clearInterval(timeInterval);
        $(".score").text(highScore);
        $(".quiz").addClass("d-none");
        $(".savedScore").removeClass("d-none");
        localStorage.setItem('highScore', JSON.stringify(highScore));
    }

    else if (timer < 0) {
        timer = 0;
        highScore = timer;
        clearInterval(timeInterval);
        $(".score").text(highScore);
        
        $(".savedScore").removeClass("d-none");
        localStorage.setItem('highScore', JSON.stringify(highScore));
    }
    },1000);
}

// ---Enter name and Submit---//
$('.submit').on('click', () => {
    // var myScore = `${$(".nameInput").val()} - ${highScore}`;
    myScore = `${$(".nameInput").val()} - ${highScore}`;
    var li = $('<li>');
    li.text(myScore);
    li.addClass("bg-success list-group-item text-white mb-3");
    $('.scoreList').append(li);
    $(".savedScore").addClass("d-none");
    $(".scoreBoard").removeClass("d-none");
    $('.leadingScore').removeClass("d-none");
    localStorage.setItem('myScore', JSON.stringify(myScore));

});

//---Clear scoreBoard---//
$('.clear').on('click', () => {
    $('.scoreList').empty();
});

//---Go Back or Start Game again---//
$('.goBack').on('click', () => {
    questIndex = 0;
    timer = 75;
    $('h3').text("");
    $(".scoreBoard").addClass("d-none");
    $(".welcome").removeClass("d-none");
});

$('.leadingScore').on('click', () => {
    $(".scoreBoard").removeClass("d-none");
    $(".welcome").addClass("d-none");
})