const Discord = require('discord.js');


const bot = new Discord.Client({ intents: ["GUILDS","GUILD_MEMBERS" ,"GUILD_MESSAGES"] });

const token = 'ODc4Mjc3MDMwMzU2MDgyNjk4.YR-1OQ.2SNIimxyNMD--kFd51HyY9tnk0I';

bot.on('ready', ()=> {
    console.log('this bot is online');
});

bot.login(token);