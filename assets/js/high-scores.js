// Selectors
var highScoresEl = window.document.querySelector(".high-scores-list");


// Get list of High Scores from local Storage
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];    // Null OR empty array []

// Sort the High Scores in Descending order (Learned this from my Tutor Faran Navazi)
highScores.sort((a,b) => b.score - a.score );


// Render the High Scores
highScoresEl.innerHTML = "";  // Reset the list -- make sure nothing is between opening and closing tag

for(var i=0; i < highScores.length; i++){
    var entry = highScores[i];
    var entryStr = `${entry.score}  ----  ${entry.name}`;
    console.log(`Entry ${i}: ${entryStr}`);
    
    var li = document.createElement("li");
    li.textContent = entryStr;

    highScoresEl.appendChild(li); 
}
