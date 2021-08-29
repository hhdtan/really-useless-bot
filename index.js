const Discord = require('discord.js');
const cron = require('cron');

const bot = new Discord.Client({ intents: ["GUILDS","GUILD_MEMBERS" ,"GUILD_MESSAGES"] });

// LOCAL
const { TOKEN } = require('./config.json'); 
bot.login(TOKEN);

// // HEROKU 
// bot.login(process.env.TOKEN);

const PREFIX = '!'; // bot command prefix

var cat = 50; 
var misc = ['extra food: '];

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

                case 'del':
                    msg.channel.send(`deleting ${misc[Number(args[1])]}`);
                    misc.splice(Number(args[1]),1);
                    console.log(misc);
                    catculate(0,msg);
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

function catculate(food, msg){
    if(!isNaN(food)){
        cat -= Number(food);
    }else{
        // txt = misc.length + '. ' + food; 
        misc.push(food);
    }
    output = `cat has ${cat} grams left`;

    // misc index 0 is the initial string, subsequent entries start from 1,2,3...
    // length of misc is minimum 1, if length is 2+ then there's an entry
    // length = final index + 1 

    if(misc.length != 1){   // check if we have entries or not
        output += `, ${misc[0]}`;
        for(i = 1; i < misc.length; i++){
            console.log(`looping ${i}`);
            output += ' ' + `${i}. ` + misc[i];

        }


        
    }

    console.log(output);
    msg.channel.send(output);
}

function daily_reset(msg){
    cat = 50;
    misc = '';
    msg.channel.send(`reset: cat has ${cat}g left`);
}