var inquirer = require('inquirer'), 
	fs = require('fs');

function BasicCard(front, back){
	this.front = front;
	this.back = back;
}

function ClozeCard(text, cloze){
	this.text = text;
	this.cloze = cloze;
}

ClozeCard.prototype.partial = function() {
	// return this.text.replace(this.cloze, '...');
	if(this.text.includes(this.cloze)){
		return this.text.replace(this.cloze, '...');
	}
	else{
		return 'sorry doesnt exist';
	}
};


// var firstPres = new BasicCard("Who was the first president of the United States?", "George Washington");

// var secondPres = new ClozeCard("Who was the first president of the United States?", "George Washington");
// // question
// console.log(firstPres);

// // answer
// console.log(secondPres.partial());

// var cloze = new ClozeCard("George Washington was the first president of the United States", "George Washington");

// console.log(cloze.partial());

// var questions = [
// 	{
// 		type: 'list',
// 		name: 'cards',
// 		message: 'choose your card?',
// 		choices: ['BasicCard', 'ClozeCard'],
// 		validate: function(data) {
// 			if (data === 'Cards'){
// 				console.log('Yayy!!');
// 			}

// 			else{
// 				console.log('Sorry');
// 			}
// 		}
// 	},
// 	{
// 		type: 'input',
// 		name: 'front',
// 		message: 'Enter message for the front:'
// 	},
// 	{
// 		type: 'input',
// 		name: 'back',
// 		message: 'Enter your message for the back:'
// 	}
// ];

inquirer.prompt({
	type: 'list',
	name: 'cards',
	message: 'Choose your card?',
	choices: ['BasicCard', 'Clozure']
}).then(function(data){
	if(data.cards === 'BasicCard'){
		return inquirer.prompt([
		{
			type: 'input',
			name: 'front',
			message: 'Add your front message'
		}, {
			type: 'input',
			name: 'back',
			message: 'Add your back message'
		}
		]);
	}
	else {
		return inquirer.prompt([
		{
			type: 'input',
			name: 'text',
			message: 'Add your text message'
		}, {
			type: 'input',
			name: 'back',
			message: 'Add your deletion message'
		}
		]);
	}
})
.then(function(data){
		//console.log(data);
		addCards(data);
})
.catch(function(err){
		console.log(err);
});


var addCards = function(add){
	fs.readFile('./data.json', 'utf8', function(error, data){
		if(error) throw error;

		var arr = JSON.parse(data);

		arr.cards.push(add);

		fs.writeFile('./data.json', JSON.stringify(arr), 'utf8', function(err){
			if(err) throw err;
			console.log("process completed");
		});
	});
}