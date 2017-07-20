//Constructor for the cloze cards
function ClozeCard (text, cloze){
	if(this instanceof ClozeCard) {
		this.fullText = text;
		this.cloze = cloze;
		this.partial = function(){
			//Checks if the cloze word appears in the input sentence
			if(this.fullText.includes(this.cloze)){
				//Replaces the cloze word with a blank in the sentence
				return this.fullText.replace(this.cloze, "________");
			} else {
				//If the cloze word does not appear in the sentence, it will alert the user
				var logText = "'" + this.cloze + 
					"' doesn't appear in '" + this.fullText + "'";
				return logText;
			}
		}
	} else {
		//Will create new ClozeCard even if "new" is not typed
		return new ClozeCard(text, cloze);
	}
}

// var myCloze = new ClozeCard("George Washington was the first president of the United States.", "George Washington");
// myCloze.partial();
// console.log(myCloze.partial());
// console.log(myCloze.fullText);
// console.log(myCloze.cloze);

module.exports = ClozeCard;