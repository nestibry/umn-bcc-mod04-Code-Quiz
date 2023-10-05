// Global Variables
var promptContainer = window.document.querySelector(".prompt");  // child of mainContainer
var buttonContainer = window.document.querySelector(".buttons"); // child of mainContainer
var iconContainer = window.document.querySelector("#icon");
var headerButton = window.document.querySelector(".header-button");
var playerScore = 0;
var playerName = "";
var iconState = true;  // correct := true, wrong := false


var highScores = JSON.parse(localStorage.getItem('highScores')) || [];    // Null || empty array []


// Array of Questions [ Initial Array is created in data.js and loaded first in index.html ]
console.log("Initial Array of Questions:");
console.log(initQuestions);
var arrQuestions = initQuestions.slice(0); // seed the arrQuestions to be manipulate, maintain a single source of truht with initQuestions


var gameState = "start";  // start || active || end
console.log(`Starting Game. gameState: ${gameState}`);

function renderMainContainer() {

    // Clear the main container to get ready for the new rendering
    promptContainer.textContent = "";
    for(var j = (buttonContainer.children.length - 1); j >= 0; j--) {
        buttonContainer.children[j].remove();
    }

    switch(gameState){
        case "start":
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
            
            gameState = "active";
            console.log(`Loading Questions... gameState: ${gameState}`);
            break;
        
        case "active":
            // render question prompt and buttons
            // Check that there are questions remaining, if none remaining go to gameEnd()
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
                    // if(arrChoices[i].isAnswer.toLowerCase() === "yes" || arrChoices[i].isAnswer.toLowerCase() === "y" || arrChoices[i].isAnswer == 1) {
                    if(arrChoices[i].isAnswer === true || arrChoices[i].isAnswer == "true") {
                        console.log(`Prompt: ${newQuestion.prompt} \nCorrect Choice #: ${i+1} \n${arrChoices[i].text} \nPoints: ${newQuestion.points}`)
                    }
                }
                if (arrQuestions.length === 0) {
                    gameState = "end";
                    console.log(`Game Over. gameState: ${gameState}`);
                }
            } 
            break;
        

        case "end":
            // Render Prompt field
            promptContainer.textContent = "Thanks for taking the Quiz! Enter initials then click 'SUBMIT'";
            console.log(`Prompt: ${promptContainer.textContent}`);


            // Render Input field
            var newElement = document.createElement("input");
            newElement.setAttribute("type", "text");
            newElement.setAttribute("placeholder", "Enter Initials...");
            newElement.setAttribute("name","player-name");
            newElement.setAttribute("id","player-name");
            buttonContainer.appendChild(newElement);
            
            
            // Render SUBMIT button
            var newElement = document.createElement("button");
            newElement.setAttribute("data-answer", true);    // Submit button
            newElement.setAttribute("data-points", "0");    // However, no points for starting the quiz...lol
            newElement.setAttribute("style", "font-size:3rem"); // only updates this singular button element and not future buttons
            newElement.addEventListener("click", function(){
                var inputField = document.querySelector("#player-name");
                console.log(inputField.value);
                playerName = inputField.value;
            })
            newElement.textContent = "SUBMIT";
            buttonContainer.appendChild(newElement);

            gameState = "start";
            console.log(`Re-starting game... gameState: ${gameState}`);
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
        // if(isAnswer.toLowerCase() === "yes" || isAnswer.toLowerCase() === "y" || isAnswer == 1 || isAnswer.toLowerCase() === "start" || isAnswer.toLowerCase() === "end"){
        if(isAnswer == 1 || isAnswer === true || isAnswer == "true"){
            playerScore += (points * 1);
            iconContainer.setAttribute("class", "fa fa-check-circle");
            console.log(`Correct! \nPlayer Total Score: ${playerScore}`);
            
            // Disable header button when start has been selected
            if(isAnswer.toLowerCase() === "start"){ 
                headerButton.disabled = true;
            } else if (isAnswer.toLowerCase() === "end"){
                headerButton.disabled = false;
            }

        } else {
            iconContainer.setAttribute("class", "fa fa-times-circle");
            console.log(`Wrong Answer \nPlayer Total Score: ${playerScore}`);
        }
    }
});













// //
// buttonContainer.addEventListener("click", function(event){

//     event.stopPropagation();

//     // Get the button pressed AND see if it is the correct answer
//     var element = event.target;

//     // Check if the clicked element was a button...if a button, then do the following:
//     if (element.matches("button")) {
        
//         // Collect data attributes from button
//         var isAnswer = element.getAttribute("data-answer");
//         var points = element.getAttribute("data-points");
//         // console.log(`Points: ${points}`);

//         // Cases --> If Correct Answer: Add points --> If Wrong Answer: Subtract time
//         if(isAnswer.toLowerCase() === "yes" || isAnswer.toLowerCase() === "y" || isAnswer == 1 || isAnswer.toLowerCase() === "start" || isAnswer.toLowerCase() === "end"){
//             playerScore += (points * 1);
//             iconContainer.setAttribute("class", "fa fa-check-circle");
//             console.log(`Correct! \nPlayer Total Score: ${playerScore}`);
//             // Disable header button when start has been selected
//             if(isAnswer.toLowerCase() === "start"){ 
//                 headerButton.disabled = true;
//             } else if (isAnswer.toLowerCase() === "end"){
//                 // Initialize Start prompt and button
//                 var promptText = "Thanks for taking the Quiz! Click 'START' to re-take the Quiz.";
//                 initializeStart(promptText);
//             }

//         } else {
//             iconContainer.setAttribute("class", "fa fa-times-circle");
//             console.log(`Wrong Answer \nPlayer Total Score: ${playerScore}`);
//         }

//         // Clear the button container to get ready for the new question's buttons
//         for(var j = (buttonContainer.children.length - 1); j >= 0; j--) {
//             buttonContainer.children[j].remove();
//         }
        
//         // Check that there are questions remaining, if none remaining go to gameEnd()
//         if (arrQuestions.length > 0) {

//             // Choose last item from shuffled arrQuestions and remove item so it doesn't get repeated
//             var newQuestion = arrQuestions[ arrQuestions.length - 1 ]; // Get the last element in the array
//             arrQuestions.pop(); // Remove the last element in the array

//             promptContainer.textContent = newQuestion.prompt;
//             console.log(`Prompt: ${newQuestion.prompt}`);

//             // Randomize choices array using the Durstenfeld shuffle algorithm --> Source: (Stack Overflow - See post by Laurens Holst and edited by ashleedawg) --> [How To Randomly Shuffle a JavaScript Array - Durstenfeld Shuffle](https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
//             var arrChoices = newQuestion.choices.slice(0);
//             for(var i = arrChoices.length - 1; i > 0; i--) {
//                 var j = Math.floor(Math.random() * (i + 1));
//                 var temp = arrChoices[i];
//                 arrChoices[i] = arrChoices[j];
//                 arrChoices[j] = temp;
//             }
            
//             // Add Choice buttons to the page
//             for(var i=0; i < arrChoices.length; i++) {
//                 var newElement= document.createElement("button");
//                 newElement.setAttribute("data-answer", arrChoices[i].isAnswer);
//                 newElement.setAttribute("data-points", newQuestion.points);
//                 newElement.textContent = arrChoices[i].text;
//                 buttonContainer.appendChild(newElement);
//                 // Console log the correct answer
//                 if(arrChoices[i].isAnswer.toLowerCase() === "yes" || arrChoices[i].isAnswer.toLowerCase() === "y" || arrChoices[i].isAnswer == 1) {
//                     console.log(`Correct Answer: \nPoints: ${newQuestion.points} \nChoice #: ${i+1} \n${arrChoices[i].text}`)
//                 }
//             }
//         } else {
//             gameEnd();
//         }

//     }
// });


// function gameEnd() {
    
//     // Render Prompt field
//     promptContainer.textContent = "Thanks for taking the Quiz! Enter initials then click 'SUBMIT'";
//     console.log(`Prompt: ${promptContainer.textContent}`);


//     // Render Input field
//     var newElement = document.createElement("input");
//     newElement.setAttribute("type", "text");
//     newElement.setAttribute("placeholder", "Enter Initials...");
//     newElement.setAttribute("name","player-name");
//     newElement.setAttribute("id","player-name");

//     buttonContainer.appendChild(newElement);
    
    
    
//     // Render SUBMIT button
//     var newElement = document.createElement("button");
//     newElement.setAttribute("data-answer", "end");    // Submit button
//     newElement.setAttribute("data-points", "0");    // However, no points for starting the quiz...lol
//     newElement.setAttribute("style", "font-size:3rem"); // only updates this singular button element and not future buttons
//     newElement.textContent = "SUBMIT";

//     buttonContainer.appendChild(newElement);


//     // Record score -- this will store the scores in order of which they were recieved
//     var playerEntry = {name:"BKN--69", score:playerScore};
//     highScores.push(playerEntry);  // local array
//     localStorage.setItem('highScores', JSON.stringify(highScores));
//     playerScore = 0; // Reset the global playerScore for the next game






//     // // Initialize Start prompt and button
//     // var promptText = "Thanks for taking the Quiz! Click 'START' to re-take the Quiz.";
//     // initializeStart(promptText);





//     // // Log scores to highScores local storage
//     // var playerEntry = {name:"BKN29", score:2500};

//     // highScores = JSON.parse(localStorage.getItem('highScores'));    // Defined in data.js, duplicated here for readability 

//     // // highScores += playerEntry;
//     // highScores.push(playerEntry);

//     // localStorage.setItem('highScores', JSON.stringify(highScores));
//     // highScores2 = JSON.parse(localStorage.getItem('highScores'));    // Defined in data.js, duplicated here for readability 



    
// }


// function initializeStart(promptText = "Click 'START' to begin the Quiz") {
    
//     // Initialize Start prompt and button
//     promptContainer.textContent = promptText;
//     console.log(`Prompt: ${promptContainer.textContent}`);

//     var newElement= document.createElement("button");
//     newElement.setAttribute("data-answer", "start");    // Start button ... used to disable header button
//     newElement.setAttribute("data-points", "0");    // However, no points for starting the quiz...lol
//     newElement.setAttribute("style", "font-size:3rem"); // only updates this singular button element and not future buttons
//     newElement.textContent = "START";

//     buttonContainer.appendChild(newElement);

//     // Enable the High Scores Button
//     headerButton.disabled = false;

//     // Shuffle the initial Questions array to randomize the Questions order using the Durstenfeld shuffle algorithm --> Source: (Stack Overflow - See post by Laurens Holst and edited by ashleedawg) --> [How To Randomly Shuffle a JavaScript Array - Durstenfeld Shuffle](https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
//     arrQuestions = initQuestions.slice(0);
//     for(var i = arrQuestions.length - 1; i > 0; i--) {
//         var j = Math.floor(Math.random() * (i + 1));
//         var temp = arrQuestions[i];
//         arrQuestions[i] = arrQuestions[j];
//         arrQuestions[j] = temp;
//     }

// }
// initializeStart();


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

