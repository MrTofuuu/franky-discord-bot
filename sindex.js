require("dotenv").config();
var REST = require("@discordjs/rest").REST;
var _a = require("discord.js"), Client = _a.Client, GatewayIntentBits = _a.GatewayIntentBits, Routes = _a.Routes;
var client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.on("ready", function () {
    console.log("Logged in as ".concat(client.user.tag, "!"));
});
try {
    client.login(process.env.CLIENT_TOKEN);
}
catch (error) {
    console.error("Error in client login");
}
