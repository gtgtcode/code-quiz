//Multiplier Progress Bar

//Variable Initializion

let gameTime = 0;
let timerLocation = document.getElementById("timer-display");
let gameScore = 0;
let scoreLocation = document.getElementById("score-container");
let titleParagraph = document.getElementById("title-paragraph");
let incorrectBackground = document.getElementById("incorrect-background");
let currentQuestion = 0;
let randomizedQuestions = [];
let gameMultiplier = 1;
let scoreTimeDrain = 0;
let scoreTimeDrainCounter = 500;
let displayMultiplier = gameMultiplier + "x";
let nextMultiplier = 2;
let multiplierLocation = document.getElementById("multiplier-container");
let progDrainCount = 1;
let multiplierOn = false;
let progressNumber = document.getElementById("progress-percentage");
let rootCSS = document.querySelector(':root');
let multBackgroundLocation = document.getElementById("multiplier-background");
let progressBarStyle = document.getElementById("colored-bar").style;
let rainbowBarStyle = document.getElementById("rainbow-bar").style;
let answerLocation1 = document.getElementById("option-1");
let answerLocation2 = document.getElementById("option-2");
let answerLocation3 = document.getElementById("option-3");
let answerLocation4 = document.getElementById("option-4");

multBackgroundLocation.style.background =  "linear-gradient(-45deg, #ee7752, #e73c7e)";
multBackgroundLocation.style.opacity = "0";

console.log(progressBarStyle);

let appendNumber = getComputedStyle(document.documentElement).getPropertyValue("--progress-percentage");
let percentToNum = parseFloat(appendNumber) / 100.0;
let outputPercent = percentToNum.toLocaleString("en", {style: "percent"});

rootCSS.style.setProperty('--progress-percentage', outputPercent);

progressNumber.innerHTML = outputPercent;
multiplierLocation.innerHTML = displayMultiplier;

var wait = (ms) => {
    const start = Date.now();
    let now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}

function changePercentage(number) {
    percentToNum += number;

    //Limiting Progress Bar Percentages

    if (percentToNum < 0) {
        percentToNum = 0;
    }
    
    //1 would be 100% on the progress bar.

    if (percentToNum > 1) {
        percentToNum = 1;
    }

    //Change BG gradient to Orange-Red when multiplier bar is full, change back when empty.

    if (percentToNum <= 0) {
        multBackgroundLocation.style.opacity = "0";
        progressBarStyle.display = "block";
        progressBarStyle.opacity = 1;
        rainbowBarStyle.display = "none";
        rainbowBarStyle.opacity = 0; 
        console.log(progressBarStyle);
        gameMultiplier = 1;
    }
    
    if (percentToNum >= 1) {
        multBackgroundLocation.style.opacity = "1";
        progressBarStyle.display = "none";
        progressBarStyle.opacity = 0;
        rainbowBarStyle.display = "block";
        rainbowBarStyle.opacity = 1;
        console.log(progressBarStyle);
        setTimeout(3000)
        gameMultiplier = nextMultiplier;
        nextMultiplier += 1;
        displayMultiplier = gameMultiplier + "x";
        multiplierLocation.innerHTML = displayMultiplier;
        progDrainLoop()
    }

    outputPercent = percentToNum.toLocaleString("en", {style: "percent"});
    rootCSS.style.setProperty('--progress-percentage', outputPercent);

    progressNumber.innerHTML = outputPercent;
}

function setPercentage(number) {
    percentToNum = number;
    outputPercent = percentToNum.toLocaleString("en", {style: "percent"});
    rootCSS.style.setProperty('--progress-percentage', outputPercent);

    if (percentToNum <= 0) {
        multBackgroundLocation.style.opacity = "0";
    }
    
    if (percentToNum >= 1) {
        multBackgroundLocation.style.opacity = "1";
        setTimeout(3000)
        gameMultiplier = nextMultiplier;
        nextMultiplier += 1;
        displayMultiplier = gameMultiplier + "x";
        multiplierLocation.innerHTML = displayMultiplier;
        console.log(displayMultiplier);
        progDrainLoop()
    }

    progressNumber.innerHTML = outputPercent;
}

function progDrainLoop() {

    if (percentToNum >= 1) {
        progDrainCount = 1;
    }

    setTimeout(function() {
        if (percentToNum < 1) {
            console.log(progDrainCount)
            progDrainCount = Math.floor((progDrainCount - 0.01) * 100) / 100;
            percentToNum = progDrainCount;
            if (percentToNum == -0.01) {
                percentToNum = 0;
            }
        }

        if (percentToNum == 1) {
            setTimeout(function() {
                console.log(progDrainCount)
                progDrainCount = Math.floor((progDrainCount - 0.01) * 100) / 100;
                percentToNum = progDrainCount;
                if (percentToNum == -0.01) {
                    percentToNum = 0;
                }
            }, 600)
        }

        outputPercent = percentToNum.toLocaleString("en", {style: "percent"});
        rootCSS.style.setProperty('--progress-percentage', outputPercent);
        progressNumber.innerHTML = outputPercent;

        if (progDrainCount >= 0) {
            progDrainLoop();
        } else {
            progDrainCount = 0;
            multBackgroundLocation.style.opacity = "0";
            progressBarStyle.display = "block";
            progressBarStyle.opacity = 1;
            rainbowBarStyle.display = "none";
            rainbowBarStyle.opacity = 0; 
            gameMultiplier = 1;
            displayMultiplier = gameMultiplier + "x";
            multiplierLocation.innerHTML = displayMultiplier;
        }
    }, 100)
}

function resetMultiplier() {
    nextMultiplier = 2;
}

function gameStart() {
    currentQuestion = 0;
    gameScore = 0;
    scoreLocation.innerHTML = gameScore;
    gameTime = 300;
    timerLocation.innerHTML = gameTime;
    scoreTimeDrain = 500;

    setPercentage(0);
    resetMultiplier();
    questionShuffle();
    startTimer();
}

// Game Questions

// Variable Initialization

let questions = [
    question1 = [
        questionContent = "What does HTML stand for?",
        answers = [
            answer1 = [answerContent = "Hyper Text Markup Language", type="correct"],
            answer2 = [answerContent = "Hyper Text Markdown Language", type="incorrect"],
            answer3 = [answerContent = "Hyper Travel Martian Language", type="incorrect"],
            answer4 = [answerContent = "Hyper Text Market Language", type="incorrect"]
        ]
    ],
    question2 = [
        questionContent = "What does CSS stand for?",
        answers = [
            answer1 = [answerContent = "Cascading Style Sheets", type="correct"],
            answer2 = [answerContent = "Cool Style Sheets", type="incorrect"],
            answer3 = [answerContent = "Coding Style Samples", type="incorrect"],
            answer4 = [answerContent = "Cascading Sophisticated Sheets", type="incorrect"]
        ]
    ],
    question3 = [
        questionContent = "What is a computer bug?",
        answers = [
            answer1 = [answerContent = "An error or unexpected occurance in an application.", type="correct"],
            answer2 = [answerContent = "A worm that lives exclusively in computers.", type="incorrect"],
            answer3 = [answerContent = "A computer aficionado.", type="incorrect"],
            answer4 = [answerContent = "A disease caught by using computers too much.", type="incorrect"]
        ]
    ],
    question4 = [
        questionContent = "Which of these is not a language used in web development?",
        answers = [
            answer1 = [answerContent = "FOX", type="correct"],
            answer2 = [answerContent = "HTML", type="incorrect"],
            answer3 = [answerContent = "CSS", type="incorrect"],
            answer4 = [answerContent = "JavaScript", type="incorrect"]
        ]
    ],
    question5 = [
        questionContent = "Choose the correct HTML element for the largest heading:",
        answers = [
            answer1 = [answerContent = "< h1 >", type="correct"],
            answer2 = [answerContent = "< h6 >", type="incorrect"],
            answer3 = [answerContent = "< header >", type="incorrect"],
            answer4 = [answerContent = "< heading >", type="incorrect"],
        ]
    ],
    question6 = [
        questionContent = "How can you open a link in a new tab/browser window?",
        answers = [
            answer1 = [answerContent = `< a href="#" target="_blank">`, type="correct"],
            answer2 = [answerContent = `< a href="#" new-tab >`, type="incorrect"],
            answer3 = [answerContent = `< a href="#" >`, type="incorrect"],
            answer4 = [answerContent = `< a href="# target="new_tab" >`, type="incorrect"],
        ]
    ],
    question7 = [
        questionContent = "What is the correct HTML for referring to an external style sheet?",
        answers = [
            answer1 = [answerContent = `< link rel="stylesheet" type="text/css" href="mystyle.css" >`, type="correct"],
            answer2 = [answerContent = `< link rel="stylesheet" >`, type="incorrect"],
            answer3 = [answerContent = `< stylesheet add href="style.css" >`, type="incorrect"],
            answer4 = [answerContent = `< stylesheet href="style.css" >`, type="incorrect"],
        ]
    ],
    question8 = [
        questionContent = "Which HTML tag is used to define an internal style sheet?",
        answers = [
            answer1 = [answerContent = `< style >`, type="correct"],
            answer2 = [answerContent = `< css >`, type="incorrect"],
            answer3 = [answerContent = `< script >`, type="incorrect"],
            answer4 = [answerContent = `< stylesheet >`, type="incorrect"],
        ]
    ],
    question9 = [
        questionContent = "How do you insert a comment in a CSS file?",
        answers = [
            answer1 = [answerContent = `/* Like this */`, type="correct"],
            answer2 = [answerContent = `< // Like this >`, type="incorrect"],
            answer3 = [answerContent = `< ** Like this ** >`, type="incorrect"],
            answer4 = [answerContent = `< // Like this // >`, type="incorrect"],
        ]
    ],
    question10 = [
        questionContent = "What is the use of an iframe tag?",
        answers = [
            answer1 = [answerContent = `To display a website on a website.`, type="correct"],
            answer2 = [answerContent = `Used for iOS compatibility.`, type="incorrect"],
            answer3 = [answerContent = `To frame an image within a site.`, type="incorrect"],
            answer4 = [answerContent = `The tag is non-existant.`, type="incorrect"],
        ]
    ],
]
 
function questionShuffle() {
    randomizedQuestions = questions.sort(function(){return 0.5 - Math.random()});
    randomizedAnswers = questions[currentQuestion][1].sort(function(){return 0.5 - Math.random()});
    console.log(randomizedQuestions);
    titleParagraph.innerHTML = randomizedQuestions[currentQuestion][0];
}

function nextQuestion() {
        if (multBackgroundLocation.style.opacity == "0") {
            changePercentage(.40);
        }
        currentQuestion += 1;
        document.getElementById("questions-answered").innerHTML = currentQuestion;
        gameScore += ((300 * gameMultiplier) + scoreTimeDrain);
        scoreLocation.innerHTML = gameScore;
        scoreTimeDrain = 500;
        scoreTimeDrainCounter = 500;
        scoreBonusDrain();
        function scoreBonusDrain() {
            if (scoreTimeDrainCounter > 0) {
                setTimeout(() => {
                    scoreTimeDrain = scoreTimeDrain - 1;
                    scoreTimeDrainCounter -= 1;
                    console.log(scoreTimeDrain);
                    scoreBonusDrain();
                }, 20);
            }
        }
        randomizedAnswers = questions[currentQuestion][1].sort(function(){return 0.5 - Math.random()});
        titleParagraph.innerHTML = randomizedQuestions[currentQuestion][0];
        answerLocation1.innerHTML = "A. " + questions[currentQuestion][1][0][0];
        answerLocation2.innerHTML = "B. " + questions[currentQuestion][1][1][0];
        answerLocation3.innerHTML = "C. " + questions[currentQuestion][1][2][0];
        answerLocation4.innerHTML = "D. " + questions[currentQuestion][1][3][0];
}

function answerSelected(number) {
    selectedAnswer = questions[currentQuestion][1][number];
    if (selectedAnswer[1] === "correct") {
        nextQuestion();
    }
    else {
        incorrectAnswerDisplay();
    }
}

function incorrectAnswerDisplay() {
    incorrectBackground.style.opacity = "1";
    console.log("Changed Opacity.");
    setTimeout(() => { 
        incorrectBackground.style.opacity = "0";
        console.log("Changed Opacity Again.");
    }, 300);
}

function startTimer() {
        gameTime = gameTime - 1;
        timerLocation.innerHTML = gameTime;
        setTimeout(1000);

        if (gameTime > 0) {
            startTimer();
        }
}

questionShuffle();

gameStart();

answerLocation1.innerHTML = "A. " + questions[currentQuestion][1][0][0];
answerLocation2.innerHTML = "B. " + questions[currentQuestion][1][1][0];
answerLocation3.innerHTML = "C. " + questions[currentQuestion][1][2][0];
answerLocation4.innerHTML = "D. " + questions[currentQuestion][1][3][0];

console.log(outputPercent);







