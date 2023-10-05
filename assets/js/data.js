// Look into whether do all strings or just 0/1's for isAnswer

// Creating an array of High Scores for demoing/debugging purposes only
var highScores = [
    {rank:0,  name:"BKN",    score:500},
    {rank:1,  name:"BryGuy", score:1500},
    {rank:2,  name:"MLH",    score:100},
    {rank:3,  name:"WHN",    score:600},
];
localStorage.setItem('highScores', JSON.stringify(highScores));

// 
var initQuestions = [
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