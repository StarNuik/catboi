const
    log = require("./log");

commandList = {};
aliasTable = {};

Command = function () {
    this.add = (label, actFunction, options = null) => {
        cache = new Object();
        cache.manageMessageRequired = options.manageMessages !== null ? options.manageMessages : false;
        cache.mentionRequired = options.mention !== null ? options.mention : false;
        cache.actFunction = actFunction;
        commandList[label] = cache;
    }
    this.addAlias = (label, alias) => {
        //Not sure that this will work \/
       // aliasTable.push({ alias : "" + label});
       aliasTable[alias] = label;
    }
    this.actCommand = (label, args, message, callback) => {
        if (commandList[label] === undefined) {
        } else if (aliasTable[label] === undefined) {
        } else {
            cache = aliasTable[label] !== undefined ? commandList[aliasTable[label]] : commandList[label];
        }
    }
}

module.exports = new Command();