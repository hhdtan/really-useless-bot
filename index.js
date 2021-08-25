const Discord = require('discord.js');
const cron = require('cron');

const bot = new Discord.Client({ intents: ["GUILDS","GUILD_MEMBERS" ,"GUILD_MESSAGES"] });

const { TOKEN } = require('./config.json');

const PREFIX = '!'; // bot command prefix

var cat = 50; 

bot.on('ready', ()=> {
    console.log('bot is online');
    console.log(`cat has ${cat} grams left`);
    
    let scheduledMessage = new cron.CronJob('49 21 * * *', () => {
        // Specifing your guild (server) and your channel
        bot.channels.fetch('878278144497418272').then(channel => {
            channel.send("CRON IS WORKING BITCHES");
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
            // 
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

function catculate(food, msg){
    cat -= food;
    console.log(`cat has ${cat} grams left`);
    msg.channel.send(`cat has ${cat} grams left`);
}

function daily_reset(msg){

    console.log('reset cat works');
    cat = 0;
}