var promptContainer = window.document.querySelector(".prompt");
var buttonContainer = window.document.querySelector(".buttons");
var iconContainer = window.document.querySelector("#icon");
var playerScore = 0;


// Look into whether do all strings or just 0/1's for isAnswer
var arrQuestions = [
    {
        id:0, 
        points:"500",
        prompt:`How could you use pseudo-elements to display the message, 'Thanks for checking the box!', after a user clicks on a check box?`, 
        choices:[
            {isAnswer:"1", text:`.checkbox:checked + label::after {content: "Thanks for checking the box!";}`}, 
            {isAnswer:"0", text:`.checkbox:checked + label:: after {message:"Thanks for checking the box!";}`}, 
            {isAnswer:"0", text:`.checkbox + label {message:"Thanks for checking the box!";}`},
            {isAnswer:"0", text:`.checkbox + label {content:"Thanks for checking the box!";}`}
        ]
    },
    {
        id:1, 
        points:"100",
        prompt:`What is wireframing?`, 
        choices:[
            {isAnswer:"1", text:`A blueprint of our website's page layout.`}, 
            {isAnswer:"0", text:`A 3D model of our websites structure made from wires.`}, 
            {isAnswer:"0", text:`A CSS library that helps in the creation of borders around our boxed elements.`},
            {isAnswer:"0", text:`Wireframing helps us quickly set up our HTML page.`}
        ]
    },
    {
        id:2, 
        points:"200",
        prompt:`How is Flexbox related to mobile-first design?`, 
        choices:[
            {isAnswer:"1", text:`The flex layout allows responsive elements within a container to be automatically arranged depending upon screen size (or device).`}, 
            {isAnswer:"0", text:`The flex layout allows developers to design the mobile user interface first, then other screen resolutions and devices.`}, 
            {isAnswer:"0", text:`The flex layout allows non-responsive elements within a container to behave as responsive elements depending upon screen size (or device).`},
            {isAnswer:"0", text:`The flex layout allows for the user to select an interface based on the screen size (or device).`}
        ]
    },
];



//
buttonContainer.addEventListener("click", function(event){

    // Get the button pressed AND see if it is the correct answer
    var element = event.target;

    // Check if the clicked element was a button...if a button, then do the following:
    if (element.matches("button")) {
        
        // Collect data attributes from button
        var isAnswer = element.getAttribute("data-answer");
        var points = element.getAttribute("data-points");
        console.log(`Points: ${points}`);

        // Cases --> If Correct Answer: Add points --> If Wrong Answer: Subtract time
        if(isAnswer.toLowerCase() === "yes" || isAnswer.toLowerCase() === "y" || isAnswer == 1){
            playerScore += (points * 1);
            iconContainer.setAttribute("class", "fa fa-check-circle");
            console.log(`Correct! \nPlayer Total Score: ${playerScore}`);

        } else {
            iconContainer.setAttribute("class", "fa fa-times-circle");
            console.log(`Wrong Answer \nPlayer Total Score: ${playerScore}`);
        }

        // Clear the button container to get ready for the new question's buttons
        for(var j = (buttonContainer.children.length - 1); j >= 0; j--) {
            buttonContainer.children[j].remove();
        }

        // Choose a random question from the Array of Questions and add prompt to the page
        var newQuestion = arrQuestions[ Math.floor( Math.random() * arrQuestions.length ) ];
        promptContainer.textContent = newQuestion.prompt;
        console.log(`Prompt: ${newQuestion.prompt}`);

        // Randomize choices array using the Durstenfeld shuffle algorithm --> Source: (Stack Overflow - See post by Laurens Holst and edited by ashleedawg) --> [How To Randomly Shuffle a JavaScript Array - Durstenfeld Shuffle](https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
        var arrChoices = newQuestion.choices.slice(0);
        for(var i = arrChoices.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = arrChoices[i];
            arrChoices[i] = arrChoices[j];
            arrChoices[j] = temp;
        }
        
        // Add Choice buttons to the page
        for(var i=0; i < arrChoices.length; i++) {
            var newElement= document.createElement("button");
            newElement.setAttribute("data-answer", arrChoices[i].isAnswer);
            newElement.setAttribute("data-points", newQuestion.points);
            newElement.textContent = arrChoices[i].text;
            buttonContainer.appendChild(newElement);
            // Console log the correct answer
            if(arrChoices[i].isAnswer.toLowerCase() === "yes" || arrChoices[i].isAnswer.toLowerCase() === "y" || arrChoices[i].isAnswer == 1) {
                console.log(`Correct Answer: \nPoints: ${newQuestion.points} \nIndex: ${i+1} \n${arrChoices[i].text}`)
            }
        }

    }
});


function initializeStart() {

}
initializeStart();





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

