const
    eris = require("eris"),
    log = require("./lib/log"),
    rManager = require("./lib/reactionManager"),
    command = require("./lib/command"),
    funCommands = require("./commands/fun"),
    modCommands = require("./commands/mod"),
    nsfwCommands = require("./commands/nsfw"),
    fs = require("fs"),
    prefix = ">";

bot = new eris("MjQzMzU4NDMzNzQ1Njk4ODE4.Cvt1UA.agTtmziRhEO0NBX4A10TQFtgcmA");

bot.on("ready", () => {
    console.log("I am ready to play!");
    log.logAction("Catboi is ready now.");
});

//Command soft errors
//0 === no manage permissions permission; 1 === no mention; 2 === no argument; 3 === command's user specific; 4 === wrong argument use; 5 === API request failed
bot.on("messageCreate", (message) => {
    if (message.content.startsWith(prefix)) {
        //Command route
        args = message.content.substring(1).split(" ");
        label = args.shift().toLowerCase();
        command.actCommand(label, message, args, (result) => {
            if (typeof result === "number") {
                rManager.getSoftError(result, (output) => {
                    bot.createMessage(message.channel.id, output);
                });
            } else
                bot.createMessage(message.channel.id, result);
            log.logAction("Command " + label + " activated by " + message.author.username + "." + message.author.id);
        });
    } else if (!message.author.bot) {
        //Interaction route
        messageHasName(message.content, (hasName) => {
            getInteractionNum(message.content.toLowerCase(), (interactionNum) => {
                rManager.getResponse(interactionNum, message.author.id, (text) => {
                    bot.createMessage(message.channel.id, parseInteraction(text, message));
                    log.logAction("Reaction " + interactionNum + " activated by " + message.author.username + "." + message.author.id);
                });
            });
        })
    }
})

messageHasName = (messageText, callback) => {
    rManager.getName((catboiName) => {
        for (i = 0; i < catboiName.length; i++) {
            if (messageText.toLowerCase().includes(catboiName[i]))
                callback(true);
        }
    });
}

getInteractionNum = (messageText, callback) => {
    rManager.getLength((length) => {
        for (i = 0; i < length; i++) {
            rManager.getTrigger(i, (triggerArray) => {
                if (triggerArray !== null) {
                    for (j = 0; j < triggerArray.length; j++) {
                        if (messageText.includes(triggerArray[j]))
                            callback(i);
                    }
                }
            });
        }
    });
}

//{author:username} {author:nick} {author:mention} {mention:username} {mention:mention} 
parseInteraction = (text, message) => {
    temp = text;
    temp = temp.replace("{author:username}", message.member.username);
    temp = temp.replace("{author:nick}", message.member.nick);
    temp = temp.replace("{author:mention}", message.member.mention);
    if (message.mentions[0] !== undefined) {
        temp = temp.replace("{mention:username}", message.mentions[0].username);
        temp = temp.replace("{mention:mention}", message.mentions[0].mention);
    } else {
        temp = temp.replace("{mention:username}", message.member.username);
        temp = temp.replace("{mention:mention}", message.member.mention);
    }
    return temp;    
}

command.add("die", (msg, args, callback) => {
    log.logAction("Catboi shut down");
    bot.disconnect();
    log.endLog(() => {
        process.exit();
        callback("This message should never show up.");
    });
}, {
    users : ["127837871259254784"]
})

log.startLog();
rManager.cacheReactions();
bot.connect();