const Discord = require('discord.js');
const config = require("./config.js");
const client = new Discord.Client();
const bot = require('./bot')(client)
client.login(config.token)