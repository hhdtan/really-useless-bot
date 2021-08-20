const Discord = require('discord.js');


const bot = new Discord.Client({ intents: ["GUILDS","GUILD_MEMBERS" ,"GUILD_MESSAGES"] });

const token = 'ODc4Mjc3MDMwMzU2MDgyNjk4.YR-1OQ.2SNIimxyNMD--kFd51HyY9tnk0I';

bot.on('ready', ()=> {
    console.log('online');
});

bot.on('messageCreate',msg=>{
    if(msg.content === "hi"){
        msg.reply("the useless bot says hi");
    }
});

bot.login(token);