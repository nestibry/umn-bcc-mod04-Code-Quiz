var buttonContainer = window.document.querySelector(".buttons");
var buttonContainer2 = window.document.getElementsByTagName("button");


var arrQuestions = [
    {id:0, prompt:"What is a best choice?", choices:[
        {isAnswer:"no", text:"A"}, 
        {isAnswer:"no", text:"B"}, 
        {isAnswer:"yes", text:"C"},
        {isAnswer:"no", text:"D"}
    ]},
    {id:1, prompt:"What is the best color?", choices:[
        {isAnswer:"yes", text:"blue"}, 
        {isAnswer:"no", text:"green"}, 
        {isAnswer:"no", text:"red"},
        {isAnswer:"no", text:"black"}
    ]}
];




buttonContainer.addEventListener("click", function(event){

    var element = event.target;
    console.log(element);

    var isAnswer= element.getAttribute("data-answer");

    if(isAnswer.toLowerCase() === "yes" || isAnswer.toLowerCase() === "y"){

        console.log("Correct Answer");

        var newElement= document.createElement("button");
        newElement.setAttribute("data-answer", "no");
        newElement.textContent = "This is a Test Button..."
        buttonContainer.appendChild(newElement);


    } else {

        console.log("Wrong Answer");

    }

    // var completedButtons = window.document.querySelector("button");
    // console.log(completedButtons);
    console.log("Buttons Container:");
    console.log(buttonContainer.children.length);

    // console.log(buttonContainer2);

    for(var j = (buttonContainer.children.length - 1); j >= 0; j--) {
        buttonContainer.children[j].remove();
    }

    newQuestion = arrQuestions[0].choices[0];
    var newElement= document.createElement("button");
    newElement.setAttribute("data-answer", newQuestion.isAnswer);
    newElement.textContent = newQuestion.text;
    buttonContainer.appendChild(newElement);
    
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

