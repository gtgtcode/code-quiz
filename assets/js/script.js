//Multiplier Progress Bar

let progressNumber = document.getElementById("progress-percentage");
let rootCSS = document.querySelector(':root');

let appendNumber = getComputedStyle(document.documentElement).getPropertyValue('--progress-percentage');
let percentToNum = parseFloat(appendNumber) / 100.0;
let outputPercent = percentToNum.toLocaleString("en", {style: "percent"});

rootCSS.style.setProperty('--progress-percentage', outputPercent);



function changePercentage(number) {
    
    percentToNum += number;
    outputPercent = percentToNum.toLocaleString("en", {style: "percent"});
    rootCSS.style.setProperty('--progress-percentage', outputPercent);

    progressNumber.append(outputPercent);
    
    return outputPercent, progressNumber;
}

progressNumber.append(outputPercent);





