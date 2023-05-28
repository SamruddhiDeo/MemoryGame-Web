//Declarations of variables and arrays
const backgrounds = [
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png",
    "7.png",
    "8.png",
    "9.png",
    "10.png",
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png",
    "7.png",
    "8.png",
    "9.png",
    "10.png",
];
movesTaken = document.getElementById("moves")
playAgain = document.getElementById("playAgain")
gridItem = document.getElementsByClassName("grid-item");
let randomNumber;
let oldRandomNumber;
let i = 40;
gridItemArray = Array.from(gridItem);
let matchArr = [];
let keepOpen = [];
let a;
let b;
let moves = 0;

//Main logic
playAgain.addEventListener("click",playAgainHandler)


//Iterate all grid items and set hidden random cards on each
Array.from(gridItem).forEach((e) => {
    randomNumber = Math.floor(Math.random() * backgrounds.length);
    oldRandomNumber = randomNumber;
    place = backgrounds[randomNumber];
    e.style.backgroundImage = `url("memoryimg/${place}")`;
    e.style.backgroundSize = "100% 100%";
    backgrounds.splice(randomNumber, 1);
});

//function for click on cards
function clickHandler(id) {
    gridItemArray[id].classList.remove("bg-blue");
    moves++;
    displayMoves()
    matchArr.push(document.getElementById(id))
    alwaysOpen();
    checkIfTwoOpen();
    gameFinish();
}

//function to check no of caards open
function checkIfTwoOpen() {
    i = 0;
    for (let j = 0; j < gridItemArray.length; j++) {
        if (!(gridItemArray[j].classList.contains("bg-blue"))) {
            i++;
        }
    }
    if (i % 2 == 0) {
        removeClickHandlers()
        console.log("removed")
        if(!checkMatch()){
            setTimeout(() => {
                addClickHandler()
            }, 1400);
        }
        else{
            addClickHandler()
        }
        return
    }
}

//function to remove click handlers
function removeClickHandlers() {
    for (let j = 0; j < gridItemArray.length; j++) {
        gridItemArray[j].removeAttribute("onclick");
    }
}

//function to add click handler
function addClickHandler() {
    for (let j = 0; j < gridItemArray.length; j++) {
        // if (gridItemArray[j].classList.contains("bg-blue")){
        gridItemArray[j].setAttribute("onclick", "clickHandler(id)");
        gridItemArray[j].classList.add("bg-blue");
    }
    alwaysOpen()
}

//function to keep cards always open
function alwaysOpen() {
    for (let j = 0; j < keepOpen.length; j++) {
        keepOpen[j].className = "grid-item";
    }
}

//function to keep cards close
function alwaysClose() {
    for (let j = 0; j < gridItemArray.length; j++) {
        gridItemArray[j].classList.add("bg-blue");
    }
}

//funtion to check cards match or not
function checkMatch() {
    for (let j = 0; j < matchArr.length; j++) {
        bg1 = matchArr[matchArr.length - 1].style.backgroundImage;
        bg2 = matchArr[matchArr.length - 2].style.backgroundImage;
        if (bg1 == bg2) {
            keepOpen.push(matchArr[matchArr.length - 1]);
            keepOpen.push(matchArr[matchArr.length - 2]);
            alwaysOpen()
            return true;
        }
    }
}

//function to check gameFinish
let k = 0
function gameFinish() {
    k = 0
    gridItemArray.forEach((e) => {
        attr = e.className
        if (attr == "grid-item") {
            k++;
        }
    })
    if (k == gridItemArray.length) {
        alert(`You Won\nYou used ${movesTaken.innerText.slice(8)} moves`)

    }
}

//function to display no of moves
function displayMoves(){
    movesTaken.innerText = `Moves : ${Math.floor(moves/2)}`
}

function playAgainHandler(){
 location.reload();
}