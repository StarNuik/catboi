const
    Eris = require("eris"),
    prefix = ">";

var bot = new Eris("MjQzMzU4NDMzNzQ1Njk4ODE4.Cvt1UA.agTtmziRhEO0NBX4A10TQFtgcmA");

bot.on("ready", () => {
    console.log("Ready!");
    //todo: Actually send a message to the log script that the bot is ready
});

bot.on("messageCreate", (message) => {
    if (message.content.startsWith(prefix)) {
        //Command route
        if (message.content.indexOf(" ") >= 2) {
            //I can create an argument kind of thingy in here
            output = message.content.substring(1, message.content.indexOf(" "));
            bot.createMessage(message.channel.id, output);
        } else if (!message.content.includes(" ") && message.content[1] !== null) {
             output = message.content.substring(1, message.content.length);
             bot.createMessage(message.channel.id, output);
        }
    } else {
        //Interaction route
    }
});

bot.connect();
