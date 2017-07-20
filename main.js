var fs = require("fs");
var inquirer = require("inquirer");
// var BasicCard = require("./basicCard");
var ClozeCard = require("./clozeCard");
//This will hold the user created flash cards
var cards = [];
// var basicCards = [];
//This will keep track of which flash card has been viewed when user views all
var count = 0;
//This starts the app giving the user options
var startApp = function(){
	inquirer
	  	.prompt([
			{
		      type: "list",
		      message: "What do you want to do?",
		      choices: ["View Random Flash Card", "View All Flash Cards", "Create Flash Card"],
		      name: "action"
		    }
	   	])
	  	.then(function(inquirerResponse) {
	  		if(inquirerResponse.action === "Create Flash Card"){
		  		createCard();
	  		} else if(inquirerResponse.action === "View All Flash Cards"){
	  			viewAll();
	  		// } else if(inquirerResponse.action === "Create Basic Flash Card"){
	  		// 	createBasic();
	  		} else {
	  			viewRandom();
	  		}
	  	});
}
//This will create a flash card with the answer on the back and the cloze deleted sentence on front
var createCard = function(){
	inquirer
		.prompt([
			{
	      	type: "input",
	      	message: "What is the full text to your card?",
	      	name: "full"
	    },
	    {
	      	type: "input",
	      	message: "What is the cloze text to your card?",
	      	name: "cloze"
	    }
		])
		.then(function(text) {
			//Create a card object with user's input
			var myCloze = ClozeCard(text.full, text.cloze);
			//Push the created card to the array
			cards.push(myCloze);
			//Return to the previous options
			startApp();
		})
}

// var createBasic = function(){
// 	inquirer
// 		.prompt([
// 			{
// 	      	type: "input",
// 	      	message: "What is the question for your card?",
// 	      	name: "question"
// 	    },
// 	    {
// 	      	type: "input",
// 	      	message: "What is the answer to your card?",
// 	      	name: "answer"
// 	    }
// 		])
// 		.then(function(text) {
// 			var myBasic = BasicCard(text.question, text.answer);

// 			basicCards.push(myBasic);

// 			startApp();
// 		})
// }

//This will show a random flash card from the cards array
var viewRandom = function(){
	var randomNumber = Math.floor(Math.random() * cards.length);
	//If there are no cards created it will inform the user
	if(typeof cards[0] == "undefined"){
		console.log("\nYou need to create a flash cards first!\n")
		//Return to the previous options
		startApp();
	} else {
		//shows the front of a random flash card
		console.log("\n" + cards[randomNumber].partial() + "\n");
		//This will ask the user if they want to see the answer
		showAnswer(cards[randomNumber]);
	}
}
//This function will go through the whole array of cards one by one
var viewAll = function(){
	if(typeof cards[0] == "undefined"){
		//If there are no cards created it will inform the user
		console.log("\nYou need to create a flash cards first!\n")
		//Return to the previous options
		startApp();
	} else {
		if(count < cards.length){
			//Will show each card's front one by one 
			console.log("\n" + cards[count].partial() + "\n");
			//Will ask if the user wants to see the answer
			showAnswerAll(cards[count]);
			//Will make the app move to the next card
			count++;
		} else {
			//Return to the previous options
			startApp();
		}
	}
}
//Will allow the user to view each answer or get out of viewing all the cards
var showAnswerAll = function(thisCard){
	inquirer
	  	.prompt([
			{
		      type: "list",
		      message: "What do you want to do?",
		      choices: ["Show Answer", "Stop"],
		      name: "action"
		    }
	   	])
	  	.then(function(inquirerResponse) {
	  		if(inquirerResponse.action === "Show Answer"){
				console.log("\n" + thisCard.cloze + "\n");
				viewAll();
			} else {
				startApp();
			}
		})
}
//Will show the answer for a flash card
var showAnswer = function(thisCard){
	inquirer
	  	.prompt([
			{
		      type: "list",
		      message: "What do you want to do?",
		      choices: ["Show Answer", "Stop"],
		      name: "action"
		    }
	   	])
	  	.then(function(inquirerResponse) {
	  		if(inquirerResponse.action === "Show Answer"){
				console.log("\n" + thisCard.cloze + "\n");
				//Return to the previous options
				startApp();
			} else {
				//Return to the previous options
				startApp();
			}
		})
}
//Start the app
startApp();