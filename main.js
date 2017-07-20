var fs = require("fs");
var inquirer = require("inquirer");
// var BasicCard = require("./basicCard");
var ClozeCard = require("./clozeCard");

var cards = [];
// var basicCards = [];
var count = 0;

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
			var myCloze = ClozeCard(text.full, text.cloze);

			cards.push(myCloze);

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

var viewRandom = function(){
	var randomNumber = Math.floor(Math.random() * cards.length);
	if(typeof cards[0] == "undefined"){
		console.log("\nYou need to create a flash cards first!\n")
		startApp();
	} else {
		console.log("\n" + cards[randomNumber].partial() + "\n");
		showAnswer(cards[randomNumber]);
	}
}
var viewAll = function(){
	if(typeof cards[0] == "undefined"){
		console.log("\nYou need to create a flash cards first!\n")
		startApp();
	} else {
		if(count < cards.length){
			console.log("\n" + cards[count].partial() + "\n");
			showAnswerAll(cards[count]);
			count++;
		} else {
			startApp();
		}
	}
}

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
				startApp();
			} else {
				startApp();
			}
		})
}
startApp();