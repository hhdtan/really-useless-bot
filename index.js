const Discord = require('discord.js');


const bot = new Discord.Client({ intents: ["GUILDS","GUILD_MEMBERS" ,"GUILD_MESSAGES"] });

const TOKEN = 'ODc4Mjc3MDMwMzU2MDgyNjk4.YR-1OQ.2SNIimxyNMD--kFd51HyY9tnk0I';

const PREFIX = '!'; // bot command prefix

bot.on('ready', ()=> {
    console.log('bot is online');
});

bot.on('messageCreate', msg=>{
    
    let args = msg.content.substr(PREFIX.length).split(" ");

    switch(args[0]){
        case 'ping':
            msg.channel.send('pong'); // sends message to channel
            //msg.reply('pong'); uses discord reply function
            break;
        case Number:
            
            
    }

});

bot.login(TOKEN);