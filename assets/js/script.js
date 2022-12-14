//Multiplier Progress Bar

//Variable Initializion

let progDrainCount = 1;
let multiplierOn = false;
let progressNumber = document.getElementById("progress-percentage");
let rootCSS = document.querySelector(':root');
let multBackgroundLocation = document.getElementById("multiplier-background");
multBackgroundLocation.style.background =  "linear-gradient(-45deg, #ee7752, #e73c7e)";
multBackgroundLocation.style.opacity = "0";

let appendNumber = getComputedStyle(document.documentElement).getPropertyValue("--progress-percentage");
let percentToNum = parseFloat(appendNumber) / 100.0;
let outputPercent = percentToNum.toLocaleString("en", {style: "percent"});

rootCSS.style.setProperty('--progress-percentage', outputPercent);

progressNumber.innerHTML = outputPercent;

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
        multiplierOn = false;
    }
    
    if (percentToNum >= 1) {
        multBackgroundLocation.style.opacity = "1";
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
        }
    }, 100)
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
    
]
 


let titleParagraph = document.getElementById("title-paragraph");
titleParagraph.innerHTML = questions[1][0];

console.log(outputPercent);







