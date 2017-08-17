var BasicCard = require("./BasicCard");

var ClozeCard = function(text,cloze){
	this.cloze = cloze;
	
	if (text.includes(cloze)){
		this.partial = text.replace(cloze,"...");
	}
	else {
		console.log("cloze is not within the text, bruh")
	};

	this.fullText = text;
};

module.exports = ClozeCard;

// var first = new ClozeCard("hello what's up","what's");
// console.log(first.cloze);

// console.log(first.fullText);

// console.log(first.partial)