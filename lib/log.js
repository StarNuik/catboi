const fs = require("fs");

var fileName, writeStream;

var Log = function() {
    this.startLog = () => {
        filename = "./logs/" + Date.now().toString() + "_log.txt";
        writeStream = fs.createWriteStream(filename);
    }
    this.endLog = (callback) => {
        writeStream.end("\n    End of the log.", "utf-8");
        writeStream.on("finish", () => {callback()});
    }
    this.logAction = (logAction) => {
        var logMessage = "\n    On " + Date.now().toString() + " :\n" + logAction;
        if (!writeStream.write(logMessage, "utf-8"))
            writeStream.once("drain", writeStream.write(logMessage, "utf-8"));
    }
    this.logError = (logError, rawError = null) => {
        var logMessage = "\n    !ERROR OCCURED! On " + Date.now().toString() + " :\n" + logError;
        if (rawError !== null)
            logMessage += "\n    Raw error data:\n";
        if (!writeStream.write(logMessage, "utf-8"))
            writeStream.once("drain", writeStream.write(logMessage, "utf-8"));
    }
}
module.exports = new Log();