var BasicCard = require("./BasicCard");
var inquirer = require('inquirer');
var fs = require("fs");


menu();

function menu() {
	console.log("\n=============================================================================\n");
    inquirer.prompt([{

        type: "list",
        name: "userChoice",
        message: "What would you like to do?",
        choices: ["Make BasicCard", "Read BasicCard", "Make ClozeCard", "Read ClozeCard", "QUIT"]

    }]).then(function(ans) {
        selection = ans.userChoice;

        switch (selection) {

            case "Make BasicCard":

                makeBasic()
                break;

            case "Read BasicCard":

                readBasic()
                break;

            case "Make ClozeCard":

                makeCloze()
                break;

            case "Read ClozeCard":

                readCloze()
                break;

            case "QUIT":
                console.log("Bye!");
                process.exit();
                break;
        }

    })

};



function readBasic(){

  fs.readFile("basicCards.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }

    var arrays = data.split(",");
    console.log(arrays)

  });

}

function readCloze(){

  fs.readFile("clozeCards.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }

    var arrays = data.split(",");
    console.log(arrays)

  });

}

function makeBasic() {
    inquirer.prompt([{
        type: "text",
        name: "front",
        message: "What would you like to put in the front?"
    },
    {
        type: "text",
        name: "back",
        message: "What would you like to put in the back?"

    }]).then(function(basic) {

        
        var test = new BasicCard(basic.front, basic.back); 


        fs.appendFile("basicCards.txt", JSON.stringify(test)+",", function(err) {
            if (err) {
                console.log(err);
            } else {
            	console.log("\n=============================================================================\n");
                console.log("                              Content Added!");
                menu();
            }

        });

    });


};

function makeCloze() {
    inquirer.prompt([{
        type: "text",
        name: "text",
        message: "What is the full text?"
    },
    {
        type: "text",
        name: "cloze",
        message: "What's the cloze (part to be taken out)?"

    }]).then(function(cloze) {

        if (cloze.text.includes(cloze.cloze)){
        var test = new ClozeCard(cloze.text, cloze.cloze); 


        fs.appendFile("clozeCards.txt", JSON.stringify(test)+",", function(err) {
            if (err) {
                console.log(err);
            } else {
            	console.log("\n=============================================================================\n");
                console.log("                              Content Added!");
                menu();
            }

        });
    }
    else {
    	console.log("\n=============================================================================\n");
    	console.log("cloze is not within the text, bruh")}
    	menu();

    });

};



    var ClozeCard = function(text, cloze) {
        this.cloze = cloze;

        if (text.includes(cloze)) {
            this.partial = text.replace(cloze, "...");
        } else {
            console.log("cloze is not within the text, bruh")
        };

        this.fullText = text;
    };


    // module.exports = ClozeCard;

    // var first = new ClozeCard("hello what's up","what's");
    // console.log(first.cloze);

    // console.log(first.fullText);

    // console.log(first.partial)