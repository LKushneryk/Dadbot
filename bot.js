var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var request = require('request');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with 'im' or variants
    if (user != 'Dadbot') {
		var regex = /([Ii][’']?\s*[Mm]\s+)([(<@!\d{18}\>)\w\s]+)/;
		var match = regex.exec(message);
		// logger.info(message); // for debug only
		if (match) {
			var name = match[2];
			name = name.trim();
			if (name != undefined) {
				bot.sendMessage({
					to: channelID,
					message: 'Hi ' + name + ', I\'m Dad!'
				});
			}
					
		}
	}
	if (message == '!dadjoke') {  
		let options = {
			headers: {
				'User-Agent': 'DadBot'
			},
			json: true
		};
		request('https://icanhazdadjoke.com/', options, (err, res, body) => {
			if (err) {
			  bot.sendMessage({
				to: channelID,
				message: 'error'
			});
			}
			else bot.sendMessage({
				to: channelID,
				message: body.joke
			});
		});
	}
	
});