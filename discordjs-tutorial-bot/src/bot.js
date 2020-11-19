require("dotenv").config();

const { Client } = require('discord.js');
const client = new Client({
    partials: ['MESSAGE', 'REACTION']
});
const prefix = "$";

//ready is pulled from discord.js docs. Happens as soon as the bot logs in.
client.on('ready', () => {
    console.log(`${client.user.username} has logged in.`);
});


client.on('message', (message) => {
    console.log(`[${message.author.tag}]: ${message.content}`);
    if(message.content.toLowerCase() === 'i miss asher'){
        message.reply(`Don't we all...`);
    }
})

client.on('message', (message) => {
//if you reply with a message, the message will trigger the message event, so you can get stuck in a loop.
//to prevent this, you can use the boolean to check if the author is a bot and have it return (which stops further action).
    if(message.author.bot === true) return;
    if(message.content.toLowerCase() === 'hello'){
        message.channel.send('hello');
    }
})


//checking to see if you want to issue a command
client.on('message', (message) => {
    if(message.content.startsWith(prefix)){
        //use spread operator to add all arguments following the command into an array to access later on
        const [commandName, ...args] = message.content
        .trim()
        .substring(prefix.length)
        .split(/\s+/);
//how to kick someone using the bot
        if(commandName === 'kick'){
            //if the user doesn't have permission it will stop
            if(!message.member.hasPermission('KICK_MEMBERS')) {
                return message.reply("You do not have permission to use that command.");
            }
            //if there are no arguments (only a "$")
            if(args.length === 0) return message.reply("Please provide an ID");
            const member = message.guild.members.cache.get(args[0]);
            if(member) {
                member.kick()
                .then((member) => {
                    message.channel(`${member} was kicked.`);
                })
                .catch((err) => {
                    message.channel.send(`I don't have permission for that.`);
                })
            }
        }
//using the same idea as kick for banning users
        else if(commandName === 'ban'){
            if(!message.member.hasPermission('BAN_MEMBERS')) {
                return message.reply("You do not have permission to use that command.");
            }
            if(args.length === 0) return message.reply("Please provide an ID");
            message.guild.members.ban(args[0])
            .then((member) => {
                message.channel(`${member} was kicked.`);
            })
            .catch((err) => {
                message.channel.send(`I don't have permission for that.`);
            })
             
        }
    }
});

//setting up roles with reactions
client.on('messageReactionAdd', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if(reaction.message.id === '778857963686461460') {
        switch(name) {
            case '❤️':
                member.roles.add('778857111467720735');
                break;
            case '💛':
                member.roles.add('778857170061230130');
                break;
            case '💚': 
                member.roles.add('778857196691521568');
                break;
            case '💙':
                member.roles.add('778857232355819520');
                break;
        }
    }
});

//removing those roles with reactions
client.on('messageReactionRemove', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if(reaction.message.id === '778857963686461460') {
        switch(name) {
            case '❤️':
                member.roles.remove('778857111467720735');
                break;
            case '💛':
                member.roles.remove('778857170061230130');
                break;
            case '💚': 
                member.roles.remove('778857196691521568');
                break;
            case '💙':
                member.roles.remove('778857232355819520');
                break;
        }
    }
});

client.login(process.env.DISCORDJS_BOT);