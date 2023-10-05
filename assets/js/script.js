// Global Variables
var promptContainer = window.document.querySelector(".prompt");  // child of mainContainer
var buttonContainer = window.document.querySelector(".buttons"); // child of mainContainer
var iconContainer = window.document.querySelector("#icon");
var headerButton = window.document.querySelector(".header-button");
var subHeaderEl = window.document.querySelector(".sub-header");
var highScoresLink = headerButton.getAttribute("href");

var highScores = JSON.parse(localStorage.getItem('highScores')) || [];    // Null || empty array []
var playerScore = 0;
var playerName = "";

let gameState = "start";  // start || active || end
var iconState = true;  // correct := true, wrong := false
var arrQuestions = []; // seed the arrQuestions to be manipulate, maintain a single source of truht with initQuestions
const quizTimeLength = 20;
var secondsLeft = quizTimeLength;
subHeaderEl.textContent = secondsLeft + "  Seconds Remaining";

console.log(`Loading Coding Quiz Script....`);
console.log("Initial Array of Questions:");  // Array of Questions [ Initial Array is created in data.js and loaded first in index.html ]
console.log(initQuestions);



function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function(){

        secondsLeft--;
        subHeaderEl.textContent = [secondsLeft] + "  Seconds Remaining";

        if(secondsLeft === 0 || gameState === "end") {
            // Stops execution of action at set interval and reset timer
            clearInterval(timerInterval);
            subHeaderEl.textContent = "";
            // End Game and go to submission screen
            gameState = "end";
            renderMainContainer();
        } 

    }, 1000);
}




function shuffleQuestions() {
    
    // Seed the arrQuestions to be manipulate, maintain a single source of truht with initQuestions
    arrQuestions = initQuestions.slice(0);
    
    // Shuffle the initial Questions array to randomize the Questions order using the Durstenfeld shuffle algorithm --> Source: (Stack Overflow - See post by Laurens Holst and edited by ashleedawg) --> [How To Randomly Shuffle a JavaScript Array - Durstenfeld Shuffle](https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
    for(var i = arrQuestions.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arrQuestions[i];
        arrQuestions[i] = arrQuestions[j];
        arrQuestions[j] = temp;
    }   

    // Randomize choices array using the Durstenfeld shuffle algorithm --> Source: (Stack Overflow - See post by Laurens Holst and edited by ashleedawg) --> [How To Randomly Shuffle a JavaScript Array - Durstenfeld Shuffle](https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
    for(var k=0; k < arrQuestions.length; k++) {
        
        // Shuffle the choices in place
        for(var i = arrQuestions[k].choices.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = arrQuestions[k].choices[i];
            arrQuestions[k].choices[i] = arrQuestions[k].choices[j];
            arrQuestions[k].choices[j] = temp;
        }

    }
    console.log("Shuffled Array of Questions:");
    console.log(arrQuestions); 
}



function renderMainContainer() {

    // Clear the main container to get ready for the new rendering
    promptContainer.textContent = "";
    for(var j = (buttonContainer.children.length - 1); j >= 0; j--) {
        buttonContainer.children[j].remove();
    }

    switch(gameState){
        case "start":
            
            // Seed arrQuestions and shuffle question order (and their choices) & reload highScores
            shuffleQuestions();
            highScores = JSON.parse(localStorage.getItem('highScores')) || [];    // Null || empty array []

            // render start prompt and button
            promptContainer.textContent = "Click 'START' to begin the Quiz";
            console.log(`Prompt: ${promptContainer.textContent}`);
            var newElement= document.createElement("button");
            // newElement.setAttribute("data-answer", "start");    // Start button ... used to disable header button
            newElement.setAttribute("data-answer", true);    // Start button ... used to disable header button
            newElement.setAttribute("data-points", "0");    // However, no points for starting the quiz...lol
            newElement.setAttribute("style", "font-size:3rem"); // only updates this singular button element and not future buttons
            newElement.textContent = "START";
            buttonContainer.appendChild(newElement);
            
            // Reset player variables
            playerScore = 0;
            playerName = "";
            secondsLeft = quizTimeLength;
            subHeaderEl.textContent = secondsLeft + "  Seconds Remaining";
            break;
        
        case "active":
            // render question prompt and buttons
            // Check that there are questions remaining, if none remaining go then its game end
            console.log(`arrQuestions.length: ${arrQuestions.length}`)
            if(arrQuestions.length > 0){

                // Choose last item from shuffled arrQuestions and remove item so it doesn't get repeated
                var newQuestion = arrQuestions[ arrQuestions.length - 1 ]; // Get the last element in the array
                var arrChoices = newQuestion.choices.slice(0);
                arrQuestions.pop(); // Remove the last element in the array
                promptContainer.textContent = newQuestion.prompt;

                // Add Choice buttons to the page
                for(var i=0; i < arrChoices.length; i++) {
                    var newElement= document.createElement("button");
                    newElement.setAttribute("data-answer", arrChoices[i].isAnswer);
                    newElement.setAttribute("data-points", newQuestion.points);
                    newElement.textContent = arrChoices[i].text;
                    buttonContainer.appendChild(newElement);
                    // Console log the correct answer
                    if(arrChoices[i].isAnswer === true || arrChoices[i].isAnswer == "true") {
                        console.log(`Prompt: ${newQuestion.prompt} \nCorrect Choice #: ${i+1} \n${arrChoices[i].text} \nPoints: ${newQuestion.points}`)
                    }
                }
            } 
            break;
        

        case "end":
            // Render Prompt field
            promptContainer.textContent = "Thanks for taking the Coding Quiz!";
            console.log(`Prompt: ${promptContainer.textContent}`);

            // Render Score Field
            var newElement = document.createElement("h2");
            newElement.textContent = "Your Score: " + playerScore;
            buttonContainer.appendChild(newElement);
            
            // Render Input field
            var newElement = document.createElement("input");
            newElement.setAttribute("type", "text");
            newElement.setAttribute("placeholder", "Enter Initials...");
            newElement.setAttribute("name","player-name");
            newElement.setAttribute("id","player-name");
            buttonContainer.appendChild(newElement);
            
            
            // Render SUBMIT button
            var newElement = document.createElement("button");
            newElement.setAttribute("data-answer", true);    
            newElement.setAttribute("data-points", "0");    
            newElement.setAttribute("style", "font-size:3rem"); 
            newElement.textContent = "SUBMIT";
            buttonContainer.appendChild(newElement);

            break;
    }
}
renderMainContainer();


buttonContainer.addEventListener("click", function(event){

    event.stopPropagation();
    event.preventDefault();
    
    // Get the button pressed AND see if it is the correct answer
    var element = event.target;

    // Check if the clicked element was a button...if a button, then do the following:
    if (element.matches("button")) {
    
        // Collect data attributes from button
        var isAnswer = element.getAttribute("data-answer");
        var points = element.getAttribute("data-points");
        console.log(`isAnswer: ${isAnswer} \npoints: ${points} \ngameState: ${gameState}`);

        // Cases --> If Correct Answer: Add points --> If Wrong Answer: Subtract time
        if(isAnswer == 1 || isAnswer === true || isAnswer == "true"){
            playerScore += (points * 1);
            iconContainer.setAttribute("class", "fa fa-check-circle");
            console.log(`Correct! \nPlayer Total Score: ${playerScore}`);

        } else {
            iconContainer.setAttribute("class", "fa fa-times-circle");
            console.log(`Wrong Answer \nPlayer Total Score: ${playerScore}`);
        }

        // Change the gameState
        switch(gameState){

            case "start":
                // Change to active state
                gameState = "active";
    
                // Disable High Scores Link during the Quiz
                headerButton.setAttribute("href", "javascript:void(0)");
                console.log(`Loading Questions... gameState: ${gameState}`);
                
                renderMainContainer();
                setTime(); //Game Begins
                break;
            
            case "active":
                // Keep in active state (state changes if the arrQuestions.length is 0)
                if (arrQuestions.length === 0) {
                    gameState = "end";
                    console.log(`Game Over. gameState: ${gameState}`);
                } 
                else {
                    console.log(`Loading More Questions... gameState: ${gameState}`);
                }
                renderMainContainer();
                break;
            
            case "end":
                
                // Collect Player Name
                var inputField = document.querySelector("#player-name");
                console.log(inputField.value);
                playerName = inputField.value;
                gameState = "start";

                // Record score -- this will store the scores in order of which they were recieved
                var playerEntry = {name:playerName, score:playerScore};
                highScores.push(playerEntry);  // local array
                localStorage.setItem('highScores', JSON.stringify(highScores));

                console.log(`Submitted ${playerName}'s score of ${playerScore}. Going back to Start... gameState: ${gameState}`);

                headerButton.setAttribute("href", highScoresLink);  // Enable High Scores Link
                renderMainContainer();
                break;

        }
    }
});


/*

    Items left to complete
    1. High Scores to a header button
        a. Disable Header Button during game
        b. Enable during high scores container (change to back to quiz)
    2. Log Scores / Input User's Initials / Sort Scores
    3. Display Scores via button container
    4. Timer and Subtract Time

*/


/*
    1. Initial function sets up the browser
        a. Loads Start Button & Directions
        b. Load a JSON of questions??
    2. Countdown Timer
        a. Keeps track of the time once started
        b. Updates the timer element
        c. Subtracts Time from Timer element???
        d. Ends Game triggers Record Score Function
    2. Button Listener: Main function
        a. Waiting for Start to be pressed --> Start the Timer
            1. Loads the prompt and choices to the screen
        b. Listens for Correct/Incorrect Button press
            1. Tally's Points
            2. Subtracts Time from Timer element???
            3. If (Start Button), then start timer
        c. Load the next prompt and choices to the screen
            1. Randomly load a question from array of objects
    3. Record Score Function
        a. Records Initial and Score Save to Local Storage
    4. Load Local Storage Scores
        a. High Scores links to page that lists the high scores

*/

