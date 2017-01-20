const
    Eris = require("eris"),
    rManager = require("./lib/reactionManager"),
    Log = require("./lib/log"),
    prefix = ">";

var bot = new Eris("MjQzMzU4NDMzNzQ1Njk4ODE4.Cvt1UA.agTtmziRhEO0NBX4A10TQFtgcmA");

bot.on("ready", () => {
    console.log("I am ready! Nothing crashed, I think.");
    //todo: Actually send a message to the log script that the bot is ready
});

bot.on("messageCreate", (message) => {
    if (message.content.startsWith(prefix)) {
        //Command route
        if (message.content.indexOf(" ") >= 2) {
            //Has spaces. Command has to have at least *a* char. '>c'
            output = message.content.substring(1, message.content.indexOf(" "));
            Log.logAction(output);
            bot.createMessage(message.channel.id, output);
        } else if (!message.content.includes(" ") && message.content[1] !== null) {
            //No spaces
            output = message.content.substring(1, message.content.length);
            Log.logAction(output);
            if (output == "die")
                Die();
            bot.createMessage(message.channel.id, output);
        }
    } else {
        //Interaction route
        messageHasName(message.content, (hasName) => {
            getInteractionNum(message.content, (interactionNum) => {
                text = rManager.getResponse(interactionNum);
                bot.createMessage(message.channel.id, text);
            });
        })
        
        /*This is the pseudo code \/
        findInter((result)=>{
            bot.createMessage(channelid, interaction[result])
        });*/
    }
});

messageHasName = (messageText, callback) => {
    rManager.getName((catboiName) => {
        for (i = 0; i < catboiName.length; i++) {
            if (messageText.toLowerCase().includes(catboiName[i]))
                callback();
        }
    });
}

getInteractionNum = (messageText, callback) => {
    rManager.getLength((err, length) => {
        for (i = 0; i < length; i++) {
            Log.getTrigger(i, (triggerArray) => {
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

Die = () => {
    bot.disconnect();
    Log.logAction("Catboi shut down");
    Log.endLog(() => {
        process.exit();
    });
}

Log.startLog();
rManager.cacheReactions();
bot.connect();
