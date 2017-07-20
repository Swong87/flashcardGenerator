function ClozeCard (text, cloze){
	this.fullText = text;
	this.cloze = cloze;
	this.partial = function(){
		if(this.fullText.includes(this.cloze)){
			return this.fullText.replace(this.cloze, "________");
		} else {
			var logText = "'" + this.cloze + 
				"' doesn't appear in '" + this.fullText + "'";
			return logText;
		}
	}
}

// var myCloze = new ClozeCard("George Washington was the first president of the United States.", "George Washington");
// myCloze.partial();
// console.log(myCloze.partial());
// console.log(myCloze.fullText);
// console.log(myCloze.cloze);

module.exports = ClozeCard;