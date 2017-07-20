function BasicCard(front, back){
	if(this instanceof BasicCard) {
		this.front = front;
		this.back = back;
	} else {
		return new BasicCard(front, back);
	}
}

var myCard = BasicCard("What's my name?", "Stephen");
console.log(myCard.front);
console.log(myCard.back);

module.exports = BasicCard;