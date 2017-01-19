const fs = require("fs");

var fileName, writeStream;

var Log = function() {
    this.startLog = function() {
        filename = Date.now() + ".json";
        fs.open(filename, "w", (err, fd) => {
            if (err !== null) {
                throw err;
            } else {
                writeStream = fs.createWriteStream(fd);
            }
        });
    }

    this.endLog = function() {
        writeStream.end("End of the log.");
        fs.close(fd);
    }

    this.logAction = function(logAction) {
        var logMessage = "On " + Date.now() + " :\n" + logAction;
        if (!writeStream.write(logMessage, "utf-8")) {
            writer.once("drain", writeStream.write(logMessage, "utf-8"))
        }
    }

    this.logError = function(logError, rawError = null) {
        var logMessage = "!ERROR OCCURED! On " + Date.now() + " :\n" + logError;
        if (rawError !== null)
            logMessage += "\nRaw error data:\n";
        if (!writeStream.write(logMessage, "utf-8")) {
            writer.once("drain", writeStream.write(logMessage, "utf-8"))
        }
    }
}
module.exports = Log;