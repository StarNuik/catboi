const
    command = require("../lib/command"),
    log = require("../lib/log")
    fs = require("fs"),
    pathBall = "./data/8ball.json";

Fun = function () {
    command.add("8ball", (message, args, callback) => {
        question = message.content.substring(1).replace("8ball", "");
        sum = 0;
        for (i = 0; i < question.length; i++)
            sum += message.content.charCodeAt(i);
        index = sum % 3;
        fs.readFile(pathBall, "utf-8", (err, rawData) => {
            if (err)
                log.logError("Failed to read the 8ball file", err);
            data = JSON.parse(rawData);
            num = Math.floor(Math.random() * data.list[index].item.length);
            callback(data.list[index].item[num]);
        });
    }, {
        argument : true
    });
}
module.exports = new Fun();