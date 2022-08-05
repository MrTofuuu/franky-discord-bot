require(`dotenv`).config();
const { REST } = require(`@discordjs/rest`);
const {
  SlashCommandBuilder,
  Client,
  GatewayIntentBits,
  Routes,
} = require(`discord.js`);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [
  new SlashCommandBuilder()
    .setName(`ping`)
    .setDescription(`Replies with pong!`),
  new SlashCommandBuilder()
    .setName(`server`)
    .setDescription(`Replies with server info!`),
  new SlashCommandBuilder()
    .setName(`user`)
    .setDescription(`Replies with user info!`),
  new SlashCommandBuilder()
    .setName(`deez`)
    .setDescription(`Replies with nutz!`),
].map((command) => command.toJSON());

const rest = new REST({ version: `10` }).setToken(process.env.CLIENT_TOKEN);

(async () => {
  try {
    console.log(`Started refreshing application (/) commands.`);

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log(`Successfully reloaded application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();

client.on(`ready`, () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on(`interactionCreate`, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === `ping`) {
    await interaction.reply(`Pong!`);
  }

  if (interaction.commandName === `server`) {
    await interaction.reply(
      `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
    );
  }

  if (interaction.commandName === `user`) {
    await interaction.reply(
      `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
    );
  }

  if (interaction.commandName === `deez`) {
    await interaction.reply(
      `**NUTZ**\nhttps://acegif.com/wp-content/uploads/upgifsok/got-em-5.gif`
    );
  }
});

try {
  client.login(process.env.CLIENT_TOKEN);
} catch (error) {
  console.error(`Error in client login`);
}
