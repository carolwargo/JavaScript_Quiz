//ELEMENT USED TO DISPLAY SCORES
const highScoresList=document.getElementById("highScoresList");

//CONVERT scores back to array
const highScores= JSON.parse(localStorage.getItem("highScores")) || [];

//ITERATES and returns new ARRAY of HTML strings
highScoresList.innerHTML = highScores
  .map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })

//COMBINES strings & UPDATES HTML
  .join("");
