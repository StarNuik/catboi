const
    fs = require("fs"),
    log = require("./log"),
    path = "./data/reactions.json";

cache = {};

Manager = function() {
    //fs should be changed to MongoDB, probably
    this.cacheReactions = () => {
        fs.readFile(path, (err, rawData) => {
            if (err !== null)
                log.logError("Failed to read the interactions file.", err);
            else {
                cache = JSON.parse(rawData);
            }
        });
    }
    this.getName = (callback) => {
        callback(cache.catboi);
    }
    this.getTrigger = (interactionNum, callback) => {
        if (interactionNum >= cache.interaction.length) {
            log.logError("interactionNum asked is bigger then the actual list size.\ninteractionNum: " + interactionNum + ", reactions size: " + cache.interaction.length);
            callback(null);
        }
        else {
            callback(cache.interaction[interactionNum].trigger);
        }
    }
    this.triggerExists = () => {}
    this.getResponse = (interactionNum, userId = "default", callback) => {
        if (interactionNum >= cache.interaction.length) {
            log.logError("response asked doesn't exist.\n Response num asked: " + interactionNum + ", reactions size: " + cache.interaction.length);
        } else {
            if (cache.interaction[interactionNum].user.length > 1) {
                userNum = 0;
                for (i = 1; i < cache.interaction[interactionNum].user.length; i++) {
                    if (cache.interaction[interactionNum].user.id == userId)
                        userNum = i;
                }
                responseNum =  Math.floor(Math.random() * cache.interaction[interactionNum].user[userNum].response.length);
                callback(cache.interaction[interactionNum].user[userNum].response[responseNum]);
            } else {
                responseNum = Math.floor(Math.random() * cache.interaction[interactionNum].user[0].response.length);
                callback(cache.interaction[interactionNum].user[0].response[responseNum]);
            }
        }
    }
    this.getLength = (callback) => {
        callback(cache.interaction.length);
    }

}

module.exports = new Manager();