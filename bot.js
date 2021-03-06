const request = require('request');

function init(client) {
	client.on('ready', function () {
		console.log(`Logged in as: ${client.user.username} - (${client.user.id})`);
	});


	// The command list
	let commands = {
		help: (message, str) => {
			message.channel.send("There is no help for the helpless...");
		},
		joke: (message, str) => {
			getRandomDadJoke(joke => message.channel.send(joke));
		}
	}


	/**
	 * Attempts to run a command from the command list.
	 * @param {String} cmd The command to be executed
	 * @param {*} message The message object received from Discord
	 * @param {*} str The message string (with any pre-processing you've performed on it).
	 */
	function runCommand(cmd, message, str) {
		if (typeof commands[cmd] !== "undefined") {
			return commands[cmd](message, str)
		}
		else {
			// unknown command
		}
	}

	function getRandomDadJoke(joke) {
		var options = {
			url: 'https://icanhazdadjoke.com/',
			headers: {
				'Accept': 'application/json'
			}
		};
		request(options, function (err, response, body) {
			if (!err && response.statusCode === 200) {
				body = JSON.parse(body);
				return joke(body.joke);
			}
		});
	}

	// When chat messages are received
	client.on("message", message => {
		if (message.author.bot) return;
		let str = message.content;

		//replies dank to any image link, needs to be confined to a channel...
		let modified = str
			.toLowerCase()
			.replace(/i am/g, 'im')
			.replace(/[^a-z\.\?\! ]/g, '')
			.split(/\.|\?|\!/)
			.map(i => {
				i = ' ' + i
				let start = i.indexOf(' im ')
				if (start === -1) {
					return
				}
				return i.substr(start)
			})
			.filter(i => i)
			.join(' and ')

		let start
		if (modified) {
			message.channel.send(`Hi ${modified.substr(start).split(' im ').map(i => i.trim()).filter(i => i).join(' ')}, I'm Dad!`);
		}

		// if message starts with "!"
		if (str.startsWith("!")) {
			// store the command for cleaner code/reading
			let command = str.substring(1);
			runCommand(command, message, str);
		}
	});
}

module.exports = init
