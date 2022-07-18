const { Client, Intents, Collection } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const { discordToken, guildId } = require("./config.json");
require("./commandRegister.js");
const fs = require("node:fs");
const dataUpdater = require("./dataUpdater");

client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.on("ready", () => {
  console.log(`Server Started as ${client.user.tag}!`);
  client.user.setActivity("The Peg", { type: "WATCHING" });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

async function updatePeg() {
  let guild = await client.guilds.fetch(`${guildId}`);
  await guild.channels.fetch("998473980409298964").then((response) =>
    response.edit({
      name: "🌄 Peak: " + `${dataUpdater.peak["pair"]["priceNative"]}`,
    })
  );
  await guild.channels.fetch("998493158939832361").then((response) =>
    response.edit({
      name: "🔥Pro: " + `${dataUpdater.pro["pair"]["priceNative"]}`,
    })
  );
}

setInterval(updatePeg, 15000);

var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};


client.login(discordToken);
