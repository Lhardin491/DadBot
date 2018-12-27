const Discord = require('discord.js');
const client = new Discord.Client()
const giveMeAJoke = require('give-me-a-joke');

client.on('ready', function() {
    console.log('Logged in as: ' + client.username + " - (" + client.id + ")");
});

// When chat messages are received
client.on("message", message => {
	if (message.author.bot) return;
	var str = message.content;
	//replies dank to any image link, needs to be confined to a channel...
	var m = str.replace(/[^a-zA-Z ]/g, "").toLowerCase();
	if(m.includes("im ") ){
		message.channel.send("Hi" + m.split("im").pop() + ", I'm Dad!");
	}
	
    if (str.substring(0, 1) == "!"){ 
	// if message starts with "!"
        var command = str.substring(1); 
		// store the command for cleaner code/reading

        if(command == "help"){
            message.channel.send("There is no help for the helpless...");
		}
		if(command == "joke"){
			giveMeAJoke.getRandomDadJoke (function(joke) {
				message.channel.send(joke);
			});
		}
    }
	
});

client.login('NDk3OTYwOTI5NjkxMTcyODY1.DwaEDA.YZdDRSJ1VdovF-z4tsdzZKAOmZo');