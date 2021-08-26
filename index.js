const Discord = require('discord.js');
const cron = require('cron');

const bot = new Discord.Client({ intents: ["GUILDS","GUILD_MEMBERS" ,"GUILD_MESSAGES"] });

const { TOKEN } = require('./config.json');

const PREFIX = '!'; // bot command prefix

var cat = 50; 
var misc = '';

bot.on('ready', ()=> {
    console.log('bot is online');
    console.log(`cat has ${cat} grams left`);
    
    let scheduledMessage = new cron.CronJob('00 00 * * *', () => {
        // Specifing your guild (server) and your channel
        daily_reset();
        bot.channels.fetch('878278144497418272').then(channel => {
            channel.send(`cat is reset to 50, cat: ${cat}`);
        })
    });
    scheduledMessage.start();
});

bot.on('messageCreate', msg=>{
    in_prefix = msg.content.substr(0,PREFIX.length);
    let args = msg.content.substr(PREFIX.length).split(" ");

    // first switch statement checks for input prefix '!'
    switch(in_prefix){
        case '!':
            switch(args[0]){
                case 'ping':
                    msg.channel.send('pong'); // sends message to channel
                    //msg.reply('pong'); uses discord reply function
                    break;

                case 'feed':
                    catculate(args[1],msg);
                    break
                
                case 'reset':
                    daily_reset();
                    break;
        }
        
        // case '@':
        //     switch(args[0]){
        //         case 'on':
        //             daily_reset.start();
        //         case 'off':
        //             daily_reset.stop();
        //     }

            
    }

});

bot.login(TOKEN);
bot.login(process.env.TOKEN);

function catculate(food, msg){
    if(!isNaN(food)){
        cat -= Number(food);
    }else{
        misc += ' ' + food;
    }
    output = `cat has ${cat} grams left`

    if(misc !== ''){
        output += 'and ate some' + misc; 
    }

    console.log(output);
    msg.channel.send(output);
}

function daily_reset(msg){
    cat = 50;
    misc = '';
    msg.channel.send(`reset: cat has ${cat}g left`);
}