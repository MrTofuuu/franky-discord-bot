require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Client, GatewayIntentBits, Routes } = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });



const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

const rest = new REST({ version: '10' }).setToken('token');



client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

try {
  client.login(process.env.CLIENT_TOKEN);
} catch (error) {
  console.error("Error in client login");
}
