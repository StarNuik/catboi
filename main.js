const
    Eris = require("eris"),
    rManager = require("./lib/reactionManager"),
    log = require("./lib/log"),
    prefix = ">";

var bot = new Eris("MjQzMzU4NDMzNzQ1Njk4ODE4.Cvt1UA.agTtmziRhEO0NBX4A10TQFtgcmA");

bot.on("ready", () => {
    console.log("I am ready to play!");
    //todo: Actually send a message to the log script that the bot is ready
});

bot.on("messageCreate", (message) => {
    if (message.content.startsWith(prefix)) {
        //Command route
        //Command Logic:
        //Get text > get command name > check requirements > process command
        if (message.content.indexOf(" ") >= 2) {
            //Has spaces. Command has to have at least *a* char. '>c'
            output = message.content.substring(1, message.content.indexOf(" "));
            log.logAction(output);
            bot.createMessage(message.channel.id, output);
        } else if (!message.content.includes(" ") && message.content[1] !== null) {
            //No spaces
            output = message.content.substring(1, message.content.length);
            log.logAction(output);
            if (output == "die")
                Die();
            bot.createMessage(message.channel.id, output);
        }
    } else if (!message.author.bot){
        //Interaction route
        messageHasName(message.content, (hasName) => {
            getInteractionNum(message.content.toLowerCase(), (interactionNum) => {
                rManager.getResponse(interactionNum, message.author.id, (text) => {
                    bot.createMessage(message.channel.id, parseInteraction(text, message));
                    log.logAction("Interaction activated by " + message.author.username + "." + message.author.id + "\n" + parseInteraction(text, message));
                });
            });
        })
    }
});

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

Die = () => {
    bot.disconnect();
    log.logAction("Catboi shut down");
    log.endLog(() => {
        process.exit();
    });
}

log.startLog();
rManager.cacheReactions();
bot.connect();