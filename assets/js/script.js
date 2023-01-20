//Multiplier Progress Bar

//Variable Initializion

let gameTime = 300;
let timerLocation = document.getElementById("timer-display");
let gameScore = 0;
let scoreSaveContainer = document.getElementById("save-score-container");
let scoreLocation = document.getElementById("score-container");
let titleParagraph = document.getElementById("title-paragraph");
let incorrectBackground = document.getElementById("incorrect-background");
let startGameButtonContainer = document.getElementById("start-game-button-container");
let answerButtonContainer = document.getElementById("answer-option-container");
let currentQuestion = 0;
let randomizedQuestions = [];
let gameMultiplier = 1;
let timerLength = 300;
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


let appendNumber = getComputedStyle(document.documentElement).getPropertyValue("--progress-percentage");
let percentToNum = parseFloat(appendNumber) / 100.0;
let outputPercent = percentToNum.toLocaleString("en", {style: "percent"});

rootCSS.style.setProperty('--progress-percentage', outputPercent);

scoreSaveContainer.style.display = "none";
progressNumber.innerHTML = outputPercent;
multiplierLocation.innerHTML = displayMultiplier;

let highscoreList = localStorage.getItem("highscores");

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
        gameMultiplier = 1;
    }
    
    if (percentToNum >= 1) {
        multBackgroundLocation.style.opacity = "1";
        progressBarStyle.display = "none";
        progressBarStyle.opacity = 0;
        rainbowBarStyle.display = "block";
        rainbowBarStyle.opacity = 1;
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
            progDrainCount = Math.floor((progDrainCount - 0.01) * 100) / 100;
            percentToNum = progDrainCount;
            if (percentToNum == -0.01) {
                percentToNum = 0;
            }
        }

        if (percentToNum == 1) {
            setTimeout(function() {
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
    document.getElementById("questions-answered").innerHTML = currentQuestion;
    gameScore = 0;
    scoreLocation.innerHTML = gameScore;
    gameTime = 300;
    timerLength = 300;
    timerLocation.innerHTML = gameTime;
    scoreTimeDrain = 500;
    answerButtonContainer.style.display = "block";
    startGameButtonContainer.style.display = "none";
    scoreSaveContainer.style.display = "none";

    function timerLoop() {
        if (gameTime > 0) {
            setTimeout(() => {
                gameTime = gameTime - 1;
                timerLength -= 1;
                timerLocation.innerHTML = gameTime;
                timerLoop();
            }, 1000);
        }
        else {
            endGame();
        }
    }

    timerLoop();
    setPercentage(0);
    resetMultiplier();
    questionShuffle();
    randomizedAnswers = questions[currentQuestion][1].sort(function(){return 0.5 - Math.random()});
    titleParagraph.innerHTML = randomizedQuestions[currentQuestion][0];
    answerLocation1.innerHTML = "A. " + questions[currentQuestion][1][0][0];
    answerLocation2.innerHTML = "B. " + questions[currentQuestion][1][1][0];
    answerLocation3.innerHTML = "C. " + questions[currentQuestion][1][2][0];
    answerLocation4.innerHTML = "D. " + questions[currentQuestion][1][3][0];
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
    question11 = [
        questionContent = "Which tag would you prefix to link to an e-mail?",
        answers = [
            answer1 = [answerContent = `mailto:`, type="correct"],
            answer2 = [answerContent = `e-mail:`, type="incorrect"],
            answer3 = [answerContent = `mail:`, type="incorrect"],
            answer4 = [answerContent = `email:`, type="incorrect"],
        ]
    ],
    question12 = [
        questionContent = "Where is the < .. style='' > tag used?",
        answers = [
            answer1 = [answerContent = `In the < body > element.`, type="correct"],
            answer2 = [answerContent = `There is no < .. style='' > tag`, type="incorrect"],
            answer3 = [answerContent = `In the < head > element.`, type="incorrect"],
            answer4 = [answerContent = `In the < script > element.`, type="incorrect"],
        ]
    ],
    question13 = [
        questionContent = "How do you create an ordered list?",
        answers = [
            answer1 = [answerContent = `< ol >`, type="correct"],
            answer2 = [answerContent = `< ul >`, type="incorrect"],
            answer3 = [answerContent = `< order >`, type="incorrect"],
            answer4 = [answerContent = `< list type='ordered' >`, type="incorrect"],
        ]
    ],
    question14 = [
        questionContent = "How do you refer to an id in CSS (Ex. id='question-content')?",
        answers = [
            answer1 = [answerContent = `#question-content`, type="correct"],
            answer2 = [answerContent = `.question-content`, type="incorrect"],
            answer3 = [answerContent = `#questionContent`, type="incorrect"],
            answer4 = [answerContent = `question-content`, type="incorrect"],
        ]
    ],
    question15 = [
        questionContent = "Which property do you need to change the background color?",
        answers = [
            answer1 = [answerContent = `background-color`, type="correct"],
            answer2 = [answerContent = `bg-color`, type="incorrect"],
            answer3 = [answerContent = `color`, type="incorrect"],
            answer4 = [answerContent = `colorbg`, type="incorrect"],
        ]
    ],
    question16 = [
        questionContent = "Which property controls the size of a text?",
        answers = [
            answer1 = [answerContent = `font-size`, type="correct"],
            answer2 = [answerContent = `text-size`, type="incorrect"],
            answer3 = [answerContent = `text-scale`, type="incorrect"],
            answer4 = [answerContent = `text-width`, type="incorrect"],
        ]
    ],
    question17 = [
        questionContent = "How can you change the bottom margin of an element?",
        answers = [
            answer1 = [answerContent = `margin-bottom`, type="correct"],
            answer2 = [answerContent = `margin-down`, type="incorrect"],
            answer3 = [answerContent = `margin`, type="incorrect"],
            answer4 = [answerContent = `margin-below`, type="incorrect"],
        ]
    ],
    question18 = [
        questionContent = "Which of the following events occurs when the user clicks on an HTML element?",
        answers = [
            answer1 = [answerContent = `onclick`, type="correct"],
            answer2 = [answerContent = `onmouse`, type="incorrect"],
            answer3 = [answerContent = `on-mb-left`, type="incorrect"],
            answer4 = [answerContent = `ontap`, type="incorrect"],
        ]
    ],
    question19 = [
        questionContent = "How do you make a JavaScript function?",
        answers = [
            answer1 = [answerContent = `function newFunction() {}`, type="correct"],
            answer2 = [answerContent = `function = new.Function() {}`, type="incorrect"],
            answer3 = [answerContent = `function.NewFunction() {}`, type="incorrect"],
            answer4 = [answerContent = `function:newFunction() {}`, type="incorrect"],
        ]
    ],
    question20 = [
        questionContent = "How do you make a JavaScript array?",
        answers = [
            answer1 = [answerContent = `let array = [x, y, z];`, type="correct"],
            answer2 = [answerContent = `let array = x, y, z;`, type="incorrect"],
            answer3 = [answerContent = `let array = x + y + z;`, type="incorrect"],
            answer4 = [answerContent = `let array = 0.x, 1.y, 2.z;`, type="incorrect"],
        ]
    ],
]
 
function questionShuffle() {
    randomizedQuestions = questions.sort(function(){return 0.5 - Math.random()});
    randomizedAnswers = questions[currentQuestion][1].sort(function(){return 0.5 - Math.random()});
    titleParagraph.innerHTML = randomizedQuestions[currentQuestion][0];
}

function nextQuestion() {
        currentQuestion += 1;
        if (currentQuestion < 20) {
            if (multBackgroundLocation.style.opacity == "0") {
                changePercentage(.40);
            }
            
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
        else {
            endGame();
        }
}

function endGame() {
    currentQuestion = 20;
    document.getElementById("questions-answered").innerHTML = currentQuestion;
    titleParagraph.innerHTML = `Good Job! Your final score was ${gameScore}! Would you like to play again?`;
    document.getElementById("final-score-display").innerHTML = `Final Score: ${gameScore}`;
    answerButtonContainer.style.display = "none";
    startGameButtonContainer.style.display = "block";
    scoreSaveContainer.style.display = "block";
    gameTime = 1;
    console.log("game ended");
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

function displayLeaderboard() {
    if (document.getElementById("leaderboard-menu") == null) {
        leaderboardMenu = document.createElement("div");
        leaderboardMenu.setAttribute("id", "leaderboard-menu");
        leaderboardMenu.innerHTML = `
        <p style="text-align: center;margin-top: 10px;">Leaderboard</p>
        <button onclick="closeLeaderboard();" style="padding: 0;border: none;background: none;position: absolute;right: 20px;top: 20px;"><span class="material-symbols-outlined">
        close
        </span></button>
        <div id="highscore-container" style="padding: 20px;position: absolute; left: 50%; transform: translate(-50%); width: 300px; height: 400px; background: rgba(154, 169, 197, 0.2); border-radius: 20px; overflow:auto;"></div>
        `;
        document.body.appendChild(leaderboardMenu);
        if (localStorage.getItem("playerScores") !== null) {
            parsedScoresCont = JSON.parse("["+localStorage.getItem("playerScores")+"]");
            outputParse = [parsedScoresCont];
            for (i = 0; i < outputParse[0].length; i++) {
                console.log(document.getElementById("highscore-container"));
                document.getElementById("highscore-container").innerHTML = document.getElementById("highscore-container").innerHTML + `
                <div id="lb-score-container">
                    ${outputParse[0][i][0]}
                    <p style="float: right;">${outputParse[0][i][1]}</p>
                </div>
                `;
            }
        }
    }
}

function closeLeaderboard() {
    document.getElementById("leaderboard-menu").remove();
}

function displayInformation() {
    if (document.getElementById("information-menu") == null) {
    informationMenu = document.createElement("div");
    informationMenu.setAttribute("id", "information-menu");
    informationMenu.innerHTML = informationMenu.innerHTML + `
    <p style="text-align: center;margin-top: 10px;">Information</p>
    <button onclick="closeInformation();" style="padding: 0;border: none;background: none;position: absolute;right: 20px;top: 20px;"><span class="material-symbols-outlined">
        close
    </span></button>
    <p>The quiz is best played when you are trying to raise your "multiplier". Your multiplier directly influences the score you receive after answering a question correctly, doubling it, or sometimes even tripling or quadrupling it!<br><br>

    Once you answer a certain amount of questions, you will enter a "flow state". When you are in this state, your multiplier is raised and the quiz background changes colors. The bar and percentage at the top of your screen indicate your flow state percentage. When it is full, it will drain over time but your multiplier will be raised. Each time the bar is filled, your multiplier will go up by one. When the bar is empty, your multiplier will return to one.<br><br>
    
    Be careful with getting questions wrong! If you do, your screen will flicker red and you will lose score and time! If you run out of time, you will get a game over!</p>
    `;
    document.body.appendChild(informationMenu);
    }
}

function closeInformation() {
    document.getElementById("information-menu").remove();
}

function incorrectAnswerDisplay() {
    incorrectBackground.style.opacity = "1";
    gameScore -= 500;
    gameTime -= 50;
    scoreLocation.innerHTML = gameScore;
    setTimeout(() => { 
        incorrectBackground.style.opacity = "0";
    }, 300);
}

function storeScore(name, score) {
    if (localStorage.getItem("playerScores") !== null) {
        parsedScores = localStorage.getItem("playerScores");
    }
    else {
        parsedScores = "";
    }
    console.log(parsedScores);
    if (parsedScores !== "") {
        parsedScores = parsedScores + `, ["${name}", ${score}]`;
    }
    else {
        parsedScores = `["${name}", ${score}]`;
    }

    localStorage.setItem("playerScores", parsedScores);
    console.log("["+localStorage.getItem("playerScores")+"]");

    confirmationBox = document.createElement("div");
    confirmationBox.innerHTML = `
    <div id="confirmation-box">
        <p>Your score has been saved.</p>
    </div>`;
    document.body.appendChild(confirmationBox);
    setTimeout(() => {
    confirmationBox.innerHTML = `
    <div id="confirmation-box" style="opacity: 0;">
        <p>Your score has been saved.</p>
    </div>`;}, 1500);
    setTimeout(() => {
    confirmationBox.remove();
    }, 1600);
}

answerLocation1.innerHTML = "A. " + questions[currentQuestion][1][0][0];
answerLocation2.innerHTML = "B. " + questions[currentQuestion][1][1][0];
answerLocation3.innerHTML = "C. " + questions[currentQuestion][1][2][0];
answerLocation4.innerHTML = "D. " + questions[currentQuestion][1][3][0];








