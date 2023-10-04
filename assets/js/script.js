var buttonContainer = window.document.querySelector(".buttons");
var promptContainer = window.document.querySelector(".prompt");


// Look into whether do all strings or just 0/1's for isAnswer
var arrQuestions = [
    {id:0, prompt:`How could you use pseudo-elements to display the message, 'Thanks for checking the box!', after a user clicks on a check box?`, 
        choices:[
            {isAnswer:"1", text:`.checkbox:checked + label::after {content: "Thanks for checking the box!";}`}, 
            {isAnswer:"0", text:`.checkbox:checked + label:: after {message:"Thanks for checking the box!";}`}, 
            {isAnswer:"0", text:`.checkbox + label {message:"Thanks for checking the box!";}`},
            {isAnswer:"0", text:`.checkbox + label {content:"Thanks for checking the box!";}`}
        ]
    },
    {id:1, prompt:`What is wireframing?`, 
        choices:[
            {isAnswer:"1", text:`A blueprint of our website's page layout.`}, 
            {isAnswer:"0", text:`A 3D model of our websites structure made from wires.`}, 
            {isAnswer:"0", text:`A CSS library that helps in the creation of borders around our boxed elements.`},
            {isAnswer:"0", text:`Wireframing helps us quickly set up our HTML page.`}
        ]
    },
    {id:2, prompt:`How is Flexbox related to mobile-first design?`, 
        choices:[
            {isAnswer:"1", text:`The flex layout allows responsive elements within a container to be automatically arranged depending upon screen size (or device).`}, 
            {isAnswer:"0", text:`The flex layout allows developers to design the mobile user interface first, then other screen resolutions and devices.`}, 
            {isAnswer:"0", text:`The flex layout allows non-responsive elements within a container to behave as responsive elements depending upon screen size (or device).`},
            {isAnswer:"0", text:`The flex layout allows for the user to select an interface based on the screen size (or device).`}
        ]
    },
];




buttonContainer.addEventListener("click", function(event){

    // Get the button pressed AND see if it is the correct answer
    var element = event.target;
    var isAnswer= element.getAttribute("data-answer");
    // console.log(`isAnswer: ${isAnswer}  type: ${typeof isAnswer}`);

    // If Correct Answer: Add points
    // If Wrong Answer: Subtract time
    if(isAnswer.toLowerCase() === "yes" || isAnswer.toLowerCase() === "y" || isAnswer == 1){

        console.log("User Selected the Correct Answer");

    } else {

        console.log("User Selected the Wrong Answer");
    }

    // Remove the buttons to get ready for the new question's buttons
    // console.log("Buttons Container:");
    // console.log(buttonContainer.children.length);
    for(var j = (buttonContainer.children.length - 1); j >= 0; j--) {
        buttonContainer.children[j].remove();
    }

    // Choose a random question from the Array of Questions and add choice buttons to the page
    var newQuestion = arrQuestions[ Math.floor( Math.random() * arrQuestions.length ) ];

    promptContainer.textContent = newQuestion.prompt;
    console.log(`Prompt: ${newQuestion.prompt}`);

    for(var i=0; i < newQuestion.choices.length; i++) {
        var newElement= document.createElement("button");
        newElement.setAttribute("data-answer", newQuestion.choices[i].isAnswer);
        newElement.textContent = newQuestion.choices[i].text;
        buttonContainer.appendChild(newElement);
        // Console log the correct answer --> Look into whether do all strings or just 0/1's for isAnswer
        if(newQuestion.choices[i].isAnswer.toLowerCase() === "yes" || newQuestion.choices[i].isAnswer.toLowerCase() === "y" || newQuestion.choices[i].isAnswer == 1) {
            console.log(`Correct Answer: \nIndex: ${i} \n${newQuestion.choices[i].text}`)
        }
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

