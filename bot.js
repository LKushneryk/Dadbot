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
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with 'im' or variants
    // logger.info(message); // for debug only
	// logger.info(userID);
	// logger.info(message.member.level);
	user = message.author.username;
	if (user != 'Dadbot' && user != 'Groovy') {
		var regex = /([Ii][’']?\s*[Mm]\s+)((\w|\s|<:\w+:\d{18}>|(<@!\d{18}>)|(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]))+)/;
		var match = regex.exec(message.content);
		if (match) {
			var name = match[2];
			name = name.trim();
			if (name != undefined) {
				message.channel.send('Hi ' + name + ', I\'m Dad!');
			}/*
			serverID = message.guild.id;
			if (serverID != '442163319424548867') {
				message.member.setNickname(name);
			}*/
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