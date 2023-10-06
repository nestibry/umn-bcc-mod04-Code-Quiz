// Look into whether do all strings or just 0/1's for isAnswer

// Creating an array of High Scores for demoing/debugging purposes only
// var highScores = [
//     {rank:0,  name:"BKN",    score:500},
//     {rank:1,  name:"BryGuy", score:1500},
//     {rank:2,  name:"MLH",    score:100},
//     {rank:3,  name:"WHN",    score:600},
// ];
// localStorage.setItem('highScores', JSON.stringify(highScores));

// 
const initQuestions = [
    {
        id:0, 
        points:"500",
        prompt:`How could you use pseudo-elements to display the message, 'Thanks for checking the box!', after a user clicks on a check box?`, 
        choices:[
            {isAnswer:true, text:`.checkbox:checked + label::after {content: "Thanks for checking the box!";}`}, 
            {isAnswer:false, text:`.checkbox:checked + label:: after {message:"Thanks for checking the box!";}`}, 
            {isAnswer:false, text:`.checkbox + label {message:"Thanks for checking the box!";}`},
            {isAnswer:false, text:`.checkbox + label {content:"Thanks for checking the box!";}`}
        ]
    },
    {
        id:1, 
        points:"100",
        prompt:`What is wireframing?`, 
        choices:[
            {isAnswer:true, text:`A blueprint of our website's page layout.`}, 
            {isAnswer:false, text:`A 3D model of our websites structure made from wires.`}, 
            {isAnswer:false, text:`A CSS library that helps in the creation of borders around our boxed elements.`},
            {isAnswer:false, text:`Wireframing helps us quickly set up our HTML page.`}
        ]
    },
    {
        id:2, 
        points:"200",
        prompt:`How is Flexbox related to mobile-first design?`, 
        choices:[
            {isAnswer:true, text:`The flex layout allows responsive elements within a container to be automatically arranged depending upon screen size (or device).`}, 
            {isAnswer:false, text:`The flex layout allows developers to design the mobile user interface first, then other screen resolutions and devices.`}, 
            {isAnswer:false, text:`The flex layout allows non-responsive elements within a container to behave as responsive elements depending upon screen size (or device).`},
            {isAnswer:false, text:`The flex layout allows for the user to select an interface based on the screen size (or device).`}
        ]
    },
    {
        id:3, 
        points:"200",
        prompt:`What is a media query?`, 
        choices:[
            {isAnswer:true, text:`A feature of CSS3 allowing content rendering to adapt to different conditions such as screen resolution`}, 
            {isAnswer:false, text:`A feature of JavaScript allowing content rendering to adapt to different conditions such as screen resolution`}, 
            {isAnswer:false, text:`A feature of HTML allowing content rendering to adapt to different conditions such as screen resolution`},
            {isAnswer:false, text:`A feature of Flexbox allowing content rendering to adapt to different conditions such as screen resolution`}
        ]
    },
    {
        id:4, 
        points:"200",
        prompt:`What is one advantage of Responsive Design for a developer?`, 
        choices:[
            {isAnswer:true, text:`Faster development`}, 
            {isAnswer:false, text:`Faster page loading time`}, 
            {isAnswer:false, text:`More social sharing`},
            {isAnswer:false, text:`Improved SEO`}
        ]
    },
    {
        id:5, 
        points:"200",
        prompt:`When using flexbox, which property needs to be adjusted in order to add space between items?`, 
        choices:[
            {isAnswer:true, text:`justify-content`}, 
            {isAnswer:false, text:`flex-flow`}, 
            {isAnswer:false, text:`align-content`},
            {isAnswer:false, text:`space-between`}
        ]
    },
    {
        id:6, 
        points:"200",
        prompt:`How would you create a box with rounded corners using CSS?`, 
        choices:[
            {isAnswer:true, text:`border-radius: 50px;`}, 
            {isAnswer:false, text:`transform: round(corner)`}, 
            {isAnswer:false, text:`corner-style: round;`},
            {isAnswer:false, text:`box-corner: round;`}
        ]
    },
    {
        id:7, 
        points:"200",
        prompt:`What is a CSS reset?`, 
        choices:[
            {isAnswer:true, text:`A stylesheet that clears the default formatting of the browser`}, 
            {isAnswer:false, text:`Deleting the contenst of a stylesheet to implement entirely new design`}, 
            {isAnswer:false, text:`A CSS property that resets the values of child elements`},
            {isAnswer:false, text:`A media query that resets the responsive design when switching devices`}
        ]
    },
    {
        id:8, 
        points:"200",
        prompt:`A client wants to make sure that the browser has multiple fonts to choose from, just in case the default font isn't supported. How would you make sure that the default font is set to "Arial", but that there are also two other fonts available to the browser?`, 
        choices:[
            {isAnswer:true, text:`Assign multiple fonts to the font-family property`}, 
            {isAnswer:false, text:`Add a stylesheet for each additional font`}, 
            {isAnswer:false, text:`Assign "Arial" to the default-font property and use the alternative-font property for the backups`},
            {isAnswer:false, text:`None of the above. The default font of all browsers is "Arial" and you can only specify one alternative.`}
        ]
    },
    {
        id:9, 
        points:"200",
        prompt:`Which user-action pseudo-class would you need to add in order to change an element when the mouse is over it?`, 
        choices:[
            {isAnswer:true, text:`:hover`}, 
            {isAnswer:false, text:`:visited`}, 
            {isAnswer:false, text:`:activate`},
            {isAnswer:false, text:`:checked`}
        ]
    },
    {
        id:10, 
        points:"200",
        prompt:`Which of the following is a true statement about pseudo-elements and pseudo-classes?`, 
        choices:[
            {isAnswer:true, text:`pseudo-elements start with a double colon (::) and pseudo-classes start with a single colon (:)`}, 
            {isAnswer:false, text:`pseudo-elements and psuedo-classes are actually the same thing`}, 
            {isAnswer:false, text:`psuedo-elements and pseudo-classes cannot be combined`},
            {isAnswer:false, text:`::before is both a pseudo-element and a pseudo-class`}
        ]
    },
    {
        id:11, 
        points:"200",
        prompt:`"Which attribute selector would you use if you wanted to target all <a> elements that have an href value that ends with '.png' to change the color? What would this look like in style.css?"`, 
        choices:[
            {isAnswer:true, text:`a[href$='.png']{ color: green }`}, 
            {isAnswer:false, text:`a.href { color: green }`}, 
            {isAnswer:false, text:`.href$'.png' { color: green }`},
            {isAnswer:false, text:`a[href.png] { color: green }`}
        ]
    },
    {
        id:12, 
        points:"200",
        prompt:`How do you declare a custom property or 'CSS variable'?`, 
        choices:[
            {isAnswer:true, text:`:root { --my-color: green; }`}, 
            {isAnswer:false, text:`var root-my-color = green;`}, 
            {isAnswer:false, text:`:root { var my-color = green; }`},
            {isAnswer:false, text:`var my-color = green;`}
        ]
    },
    {
        id:13, 
        points:"200",
        prompt:`When developing a user interface, all are important except...`, 
        choices:[
            {isAnswer:true, text:`Focusing on building a strong backend`}, 
            {isAnswer:false, text:`Writing code that follows accessibility standards`}, 
            {isAnswer:false, text:`Making sure that you using a mobile-responsive layout`},
            {isAnswer:false, text:`Using readable font sizes`}
        ]
    },
    {
        id:14, 
        points:"200",
        prompt:`How would I check which files are staged, unstaged, and untracked using git commands?`, 
        choices:[
            {isAnswer:true, text:`git status`}, 
            {isAnswer:false, text:`git commit -m`}, 
            {isAnswer:false, text:`git fetch`},
            {isAnswer:false, text:`git add .`}
        ]
    },
    {
        id:15, 
        points:"200",
        prompt:`What is the command we use to create a new file?`, 
        choices:[
            {isAnswer:true, text:`touch`}, 
            {isAnswer:false, text:`mkdir`}, 
            {isAnswer:false, text:`cd`},
            {isAnswer:false, text:`pwd`}
        ]
    },
    {
        id:16, 
        points:"200",
        prompt:`What are the steps to create a new remote repository and then connect it to our local machine?`, 
        choices:[
            {isAnswer:true, text:`First, we create a new repository with a new README file on GitHub. Then, we select the HTTPS or SSH option to copy the URL to clone the repository. Last, we use the git command 'git clone' followed by the URL we copied on our local machine.`}, 
            {isAnswer:false, text:`First, we create a new repository on GitHub. Next, we copy the URL of the repository. Last, we use the git command 'git clone' followed by the URL we copied.`}, 
            {isAnswer:false, text:`First, we create a new repository with a new README file on GitHub. Then, we select the SSH option to clone the repository. Last, we use the git command 'git pull' followed by the SSH key we copied.`},
            {isAnswer:false, text:`First, we create a new repository on GitHub. Next, we copy the URL of the repository from the address bar. Last, we use the git command 'git pull' to pull down the remote repository on to our local machine.`}
        ]
    },
    {
        id:17, 
        points:"200",
        prompt:`What are HTML semantic elements?`, 
        choices:[
            {isAnswer:true, text:`A semantic element clearly describes its meaning to both the browser and the developer.`}, 
            {isAnswer:false, text:`Semantic elements, like '<div>', hold the important content together so it's easy to understand.`}, 
            {isAnswer:false, text:`Semantic elements are outdated and are no longer used in HTML.`},
            {isAnswer:false, text:`A semantic element reveals nothing about its content to the browser or the developer.`}
        ]
    },
    {
        id:18, 
        points:"200",
        prompt:`What is the purpose of the 'alt' attribute for images?`, 
        choices:[
            {isAnswer:true, text:`To provide context for the images in the cases where they are not observable, either due to an accessibility challenge or a broken link.`}, 
            {isAnswer:false, text:`To prevent search engines from indexing the image`}, 
            {isAnswer:false, text:`To make it easier to style the image with CSS`},
            {isAnswer:false, text:`To make the image load faster`}
        ]
    },
    {
        id:19, 
        points:"200",
        prompt:`
        When adding color to your HTML elements, which is more encouraged: using hex codes or predetermined color names?`, 
        choices:[
            {isAnswer:true, text:`Using a hex code is better because it allows you to get a more specific color and have more control over your design.`}, 
            {isAnswer:false, text:`Using a hex code is better because allows you to use numbers instead of letters to describe a color.`}, 
            {isAnswer:false, text:`Using a predetermined color is better because it allows the browser to understand exactly what color you want to use.`},
            {isAnswer:false, text:`Using a predetermined color is better because you are unlimited in the types of colors you can use.`}
        ]
    },
    {
        id:20, 
        points:"200",
        prompt:`Which of the following is a good example of a font stack?`, 
        choices:[
            {isAnswer:true, text:`font-family: "Trebuchet MS", Verdana, sans-serif;`}, 
            {isAnswer:false, text:`font-family: arial;`}, 
            {isAnswer:false, text:`font-family: serif, Georgia, "Times New Roman";`},
            {isAnswer:false, text:`font-family: sans-serif, serif, cursive;`}
        ]
    },
    {
        id:21, 
        points:"200",
        prompt:`Given the following CSS selector, which HTML element would be the outermost/parent element?
        header nav ul li { color: white; }`, 
        choices:[
            {isAnswer:true, text:`<header>`}, 
            {isAnswer:false, text:`<nav>`}, 
            {isAnswer:false, text:`<li>`},
            {isAnswer:false, text:`<ul>`}
        ]
    },
    {
        id:22, 
        points:"200",
        prompt:`Which of the following statements are NOT true?`, 
        choices:[
            {isAnswer:true, text:`Inline elements automatically start a new line.`}, 
            {isAnswer:false, text:`Block elements take all the possible width, regardless of its actual size.`}, 
            {isAnswer:false, text:`Block elements are elements that always start on a new line.`},
            {isAnswer:false, text:`Inline elements are elements that only take up as much width as needed.`}
        ]
    },
    {
        id:23, 
        points:"200",
        prompt:`Which of the following is not a component of the box model?`, 
        choices:[
            {isAnswer:true, text:`The display property`}, 
            {isAnswer:false, text:`The padding property`}, 
            {isAnswer:false, text:`The content`},
            {isAnswer:false, text:`The border property`}
        ]
    },
    {
        id:24, 
        points:"200",
        prompt:`What CSS declaration could you add to '<div style="width: 50%;">' to center it?`, 
        choices:[
            {isAnswer:true, text:`margin: 0 auto`}, 
            {isAnswer:false, text:`text-align: center`}, 
            {isAnswer:false, text:`float: center`},
            {isAnswer:false, text:`align: center`}
        ]
    },
    {
        id:25, 
        points:"200",
        prompt:`Which of the following must be done in order to use 'git init'?`, 
        choices:[
            {isAnswer:true, text:`You must be in your project folder when you run 'git init'`}, 
            {isAnswer:false, text:`You must have a repository created on GitHub before using 'git init'.`}, 
            {isAnswer:false, text:`You must run 'git status' to check the status of your repository before running 'git init'.`},
            {isAnswer:false, text:`You must add and commit files before running 'git init'.`}
        ]
    },
    {
        id:26, 
        points:"200",
        prompt:`When creating a form with HTML, which of the following is not typically used?`, 
        choices:[
            {isAnswer:true, text:`<header> for the title of the form`}, 
            {isAnswer:false, text:`<input> for the type of input the user is expected to provide, like text or email`}, 
            {isAnswer:false, text:`<button> for allowing the user to submit their data after they have filled out the form`},
            {isAnswer:false, text:`<label> for the name of the input field`}
        ]
    },

];