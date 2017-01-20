const
    fs = require("fs"),
    log = require("./lib/log"),
    path = "./data/interactions.json";

Manager = function() {
    //fs should be changed to MongoDB, probably
    this.GetTrigger = (triggerId, callback) => {
        fs.readFile(path, (err, rawData) => {
            if (err !== null) {
                log.logError("Failed to read the interactions file.", err);
                callback(true);
            } else {
                data = JSON.parse(rawData);
                if (triggerId >= data.item.length) { //[0]data.items.length will be smth else, make sure to change it!!!!!
                    log.logError("triggerId asked is bigger then the actual list size.");
                    callback(null, null);
                } else {
                    callback(null, data.item[].trigger); //[0]
                }
            }
        });
    };
    this.TriggerExists = () => {};
    this.GetResponse = (triggerId, callback) => {
        fs.readFile(path, (err, rawData) => {
            if (err !== null) {
                log.logError("Failed to read the interactions file.", err);
                callback(true);
            } else {
                data = JSON.parse(rawData);
                if (triggerId >= data.item.length) { //[0]
                    log.logError("triggerId asked is bigger then the actual list size.");
                    callback(null, null);
                } else {
                    num = Math.floor(Math.random() * data.item[triggerId].response.length);
                    callback(null, data.item[triggerId].response[num]); //[0]
                }
            }
        });
    };
    this.GetLength = () => {
        fs.readFile(path, (err, rawData) => {
            if (err !== null) {
                log.logError("Failed to read the interactions file.", err);
                callback(true);
            } else {
                data = JSON.parse(rawData);
                callback(null, data.item.length);
            }
        });
    };

}

module.exports = manager;