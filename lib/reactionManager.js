const
    fs = require("fs"),
    log = require("./log"),
    path = "./data/reactions.json";

ManagerCache = {};

reactionManager = function() {
    //fs should be changed to MongoDB, probably
    this.cacheReactions = () => {
        fs.readFile(path, (err, rawData) => {
            if (err !== null)
                log.logError("Failed to read the interactions file.", err);
            else {
                ManagerCache = JSON.parse(rawData);
            }
        });
    }
    this.getName = (callback) => {
        callback(ManagerCache.catboi);
    }
    this.getTrigger = (interactionNum, callback) => {
        if (interactionNum >= ManagerCache.interaction.length) {
            log.logError("interactionNum asked is bigger then the actual list size.\ninteractionNum: " + interactionNum + ", reactions size: " + ManagerCache.interaction.length);
            callback(null);
        }
        else {
            callback(ManagerCache.interaction[interactionNum].trigger);
        }
    }
    this.triggerExists = () => {}
    this.getResponse = (interactionNum, userId = "default", callback) => {
        if (interactionNum >= ManagerCache.interaction.length) {
            log.logError("response asked doesn't exist.\n Response num asked: " + interactionNum + ", reactions size: " + ManagerCache.interaction.length);
        } else {
            if (ManagerCache.interaction[interactionNum].user.length > 1) {
                userNum = 0;
                for (i = 1; i < ManagerCache.interaction[interactionNum].user.length; i++) {
                    if (ManagerCache.interaction[interactionNum].user[i].id == userId)
                        userNum = i;
                }
                responseNum = Math.floor(Math.random() * ManagerCache.interaction[interactionNum].user[userNum].response.length);
                callback(ManagerCache.interaction[interactionNum].user[userNum].response[responseNum]);
            } else {
                responseNum = Math.floor(Math.random() * ManagerCache.interaction[interactionNum].user[0].response.length);
                callback(ManagerCache.interaction[interactionNum].user[0].response[responseNum]);
            }
        }
    }
    this.getLength = (callback) => {
        callback(ManagerCache.interaction.length);
    }
    this.getSoftError = (errorNum, callback) => {
        callback(ManagerCache.error[errorNum]);
    }
}

module.exports = new reactionManager();