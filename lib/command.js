const
    log = require("./log");

commandList = [];
aliasTable = [];

Command = function () {
    this.add = (label, actFunction, options = {}) => {
        cache = new Object();
        cache.description = typeof options.description !== "undefined" ? options.description : "No description";
        cache.argumentRequired = typeof options.argument !== "undefined" ? options.argument : false;
        cache.mentionRequired = typeof options.mention !== "undefined" ? options.mention : false;
        cache.manageMessageRequired = typeof options.manageMessages !== "undefined" ? options.manageMessages : false;
        cache.usersAllowed = typeof options.users !== "undefined" ? options.users : undefined;
        cache.actFunction = actFunction;
        commandList[label] = cache;
    }
    this.addAlias = (label, alias) => {
       aliasTable[alias] = label;
    }
    this.actCommand = (label, message, args, callback) => {
        if (typeof commandList[label] !== "undefined" || typeof aliasTable[label] !== "undefined") {
            cache = typeof aliasTable[label] !== "undefined" ? commandList[aliasTable[label]] : commandList[label];
            if (cache.manageMessageRequired && !message.member.permission.has("manageMessages"))
                callback(0);
            else if (cache.mentionRequired && typeof message.mentions[0] === "undefined")
                callback(1);
            else if (cache.argumentRequired && args.length === 0)
                callback(2);
            else if (typeof cache.usersAllowed !== "undefined" && !cache.usersAllowed.includes(message.author.id))
                callback(3);
            else {
                cache.actFunction(message, args, (result) => {
                    callback(result);
                });
            }
        }
    }
}

module.exports = new Command();