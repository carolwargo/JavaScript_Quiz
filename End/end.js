//VARIABLES- html elements defined by Id
const playername = document.getElementById('playername');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
//retrieve the value from LOCAL STORAGE
const mostRecentScore = localStorage.getItem('mostRecentScore');

//CONVERTS string back to array
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

//MAX amount of scores to be displayed
const MAX_HIGH_SCORES = 6;

//TEXT CONTENT
finalScore.innerText = mostRecentScore

//EVENT OBJECT ARGUMENT-when key is released, Btn is enabled
playername.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !playername.value;
});

//PREVENT page reload
function saveHighScore(e) {
    e.preventDefault();

// Check if player name is empty or contains only whitespace
if (!playername.value || /^\s*$/.test(playername.value)) {
    alert("Please enter a valid name.");
    return;
}

//playername OBJECT
    const score = {
        score: mostRecentScore,
        name: playername.value,
    };

//ARRAY to sort scores
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, MAX_HIGH_SCORES);

//JSON stringify converts highScores array into a string before stored in LOCAL STORAGE
localStorage.setItem('highScores', JSON.stringify(highScores));
window.location.assign('/');
};