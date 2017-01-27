const
    command = require("../lib/command");

command.add("purge", (message, args, callback) => {
    //Todo: remake all of this shit
    /*
    if (args.length > 2 || args.length < 1 || isNaN(args[0]) || args.length === 2 && !args[1].startsWith("<@"))
        callback("Please type the number of messages to purge (and then mention whose messages you are purging");
    else bot.purgeChannel(message.channel.id, args[0], (filterMessage) => {
        return filterMessage.author.id === message.mentions[0];
    });*/
        
    
    /* Please type the number of messages to purge (and then mention whose messages you are purging).
    if (message.mentions.length !== 0) {
        bot.purgeChannel(message.channel.id, )
    }
    bot.deleteMessage(message.channel.id, message.id).then(() => {
        callback("Deleted your message!");
    });*/
}, {
    manageMessages : true
})