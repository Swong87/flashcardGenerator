var fs = require("fs");
var inquirer = require("inquirer");
var BasicCard = require("./basicCard");
var ClozeCard = require("./clozeCard");

var cards = [];

var startApp = function(){
	inquirer
	  	.prompt([
			{
		      type: "list",
		      message: "What do you want to do?",
		      choices: ["Create Flash Card", "View Flash Card"],
		      name: "action"
		    }
	   	])
	  	.then(function(inquirerResponse) {
	  		if(inquirerResponse.action === "Create Flash Card"){
		  		createCard();
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
			var myCloze = new ClozeCard(text.full, text.cloze);

			cards.push(myCloze);

			startApp();
		})
}

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