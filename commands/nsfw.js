const
    command = require("../lib/command")
    request = require("request"),
    argumentPrefix = "+";

nsfw = function () {
    command.add("yandere", (message, args, callback) => {
        var tags;
        if (args.length !== 0 && args[0].startsWith(argumentPrefix) && args[0] === argumentPrefix + "s") {
            args.shift();
            tags = "rating:s";
        } else
            tags = "rating:e";
        if (args.length !== 0) {
            tags = "+" + args.toString().replace(",", "+");
        }
        yandereQuerry(tags, (err, link, score) => {
            if (err)
                callback(5);
            else {
                output = constructEmbed(link, score);
                callback(output);
            }
        });
    })

    constructEmbed = (imgLink, score) => {
        output = {
            embed : {
                color : 0x90aaff,
                description : "Score: " + score,
                image : {
                    url : imgLink,
                    height : 100
                }
            }
        };
        return output;
    }

    yandereQuerry = (tags, callback) => {
        request("https://yande.re/post.json?limit=1&tags=order:random+" + tags, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                data = JSON.parse(body);
                if (data[0] !== undefined)
                    callback(null, data[0].file_url, data[0].score);
                else
                    callback(true);
            } else {
                callback(true);
            }
        });
    }
}
module.exports = new nsfw();