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
        bot.createMessage(message.channel.id, () => {
            text = message.substring(1, message.indexOf(" "));
        });
    } else {
        //Interaction route
    }
});

bot.connect();
