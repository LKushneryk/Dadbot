const Discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');
const request = require('request');
const bot = new Discord.Client();
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
bot.on('ready', () => {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', message => {
	user = message.author.username;
	if (user != 'Dadbot' && user != 'Groovy') {
		// Bot listens for messages that will start with 'im' or variants
		// Regex description
		/*
			([Ii][’']?\s*[Mm]\s+)	// Looks for different variants of 'im'
			(	
				(	
					\w				// Takes word characters
					|\s				// Or spaces
					|<:\w+:\d{18}>	// Or discord emojis
					|(<@!\d{18}>) 	// Or discord pings
					|(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])
									// Or unicode emojis
				)+					// Requires one or more of these characters
			)
		*/
		var regex = /([Ii][’']?\s*[Mm]\s+)((\w|\s|<:\w+:\d{18}>|(<@!\d{18}>)|(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]))+)/;
		var match = regex.exec(message.content);
		if (match) {
			var name = match[2];	// Take first match after the found 'im'
			name = name.trim();
			if (name != undefined) {
				message.channel.send('Hi ' + name + ', I\'m Dad!');
			}
		}
	}
	if (message.content == '!dadjoke') {  
		let options = {
			headers: {
				'User-Agent': 'DadBot'
			},
			json: true
		};
		request('https://icanhazdadjoke.com/', options, (err, res, body) => {
			if (err) {
				message.channel.send('error');
			}
			else{ 
				message.channel.send(body.joke);
			}
		});
	};
});

bot.login(auth.token);