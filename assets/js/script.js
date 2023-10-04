var buttonContainer = window.document.querySelector(".buttons");







buttonContainer.addEventListener("click", function(event){

    var element = event.target;
    console.log(element);

    var isAnswer= element.getAttribute("data-answer");

    if(isAnswer.toLowerCase() === "yes" || isAnswer.toLowerCase() === "y"){

        console.log("Correct Answer");

        var myTag = document.createElement("button");

    } else {

        console.log("Wrong Answer");

    }
    
});





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

