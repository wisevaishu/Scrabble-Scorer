// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
   for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
//let wordToScore;
function initialPrompt() {
  let wordToScore=input.question("Let's play some scrabble! Enter a word:");
  console.log(oldScrabbleScorer(wordToScore));
};

let simpleScorer=function(word){
   return word.length;
};

let vowelBonusScorer=function(word){
   let score=0;
   let wordsarr=word.split('');
   wordsarr.forEach(element => { 
       score = (element==="A" || element === 'E' || element === 'I' ||
                element === 'O' || element === 'U' || element === 'a' || element === 'e' ||
                element === 'i' || element === 'o'|| element === 'u'? 
                score=score +3 : score=score +1);
   });
   return score;
};

let scrabbleScorer = function(word){
   let score =0;
   let wordsarr=word.split('');
   wordsarr.forEach( element => {
       score+=Number(newPointStructure[element.toLowerCase()]);
   });
   return score;
}

let simpleScorerObject = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
};

let vowelBonusScorerObject = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
 };

 let scrabbleScorerObject = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
 };

const scoringAlgorithms = [simpleScorerObject, vowelBonusScorerObject, scrabbleScorerObject];


function scorerPrompt() {
   let scoreToWord = input.question("Enter a word to score: ");
   
   while( (Number(scoreToWord)) || (scoreToWord.match(/^[a-zA-Z_\s]+$/)===null) )
   {
      scoreToWord = input.question("Enter a word to score: ");
   }
   
   
   console.log("Which scoring algorithm would you like to use?");
   console.log("\n");
   console.log("If the user enters 0, have the program output a score using the simple scorer.");
   console.log("If the user enters 1, use the vowel bonus scoring function.");
   console.log("If the user enters 2, use the Scrabble scoring option.");
   
   let userSelectInput = input.question("Enter 0, 1, or 2:");
   
   while((isNaN(userSelectInput)) || (Number(userSelectInput)>2) || (userSelectInput.length>1))
   {
      userSelectInput = input.question("Enter 0, 1, or 2:");
   }   
   
   let score = 0;
   score = scoringAlgorithms[userSelectInput].scorerFunction(scoreToWord);
   console.log(`Score for ${scoreToWord} is : ${score}`); 
   
}

function transform(oldStruct) {
   
   let newStruct = {};
   
   for(key in oldStruct)
   {
      let letters = oldStruct[key];
      let propertyName = '';
      for(let j=0;j<oldStruct[key].length;j++)
      {
         propertyName = letters[j];
         newStruct[propertyName.toLowerCase()]=Number(key); 
      }
   }
   newStruct[' ']=0;
   return newStruct;

};

let newPointStructure =transform(oldPointStructure);

function runProgram() {
   //initialPrompt();
   //transform(oldPointStructure);
   scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
