const { Client, Intents, Collection } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const { discordToken, guildId } = require("./config.json");
require("./commandRegister.js");
const fs = require("node:fs");
const dataUpdater = require("./dataUpdater");
const ethers = require('ethers');
const data = require('./lpcontract.json');
let provider = new ethers.providers.WebSocketProvider('wss://andromeda-ws.metis.io', 1088);
let abi = ["event Swap(address indexed sender,uint amount0In, uint amount1In, uint amount0Out, uint amount1Out, address indexed to)"]
let contract = new ethers.Contract(data.address, abi, provider)
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

let filter = {
  topics: [
    null,
    "0x0000000000000000000000001e876cce41b7b844fde09e38fa1cf00f213bff56"
  ]
};

contract.on(filter, async (event) => {
  let transaction = await event.getTransaction()
  let value = parseFloat(ethers.utils.formatEther(transaction.value)).toFixed(2);
  if (value > 10) {
    client.channels.fetch('948353607017832509').then(channel =>
      channel.send(
        '🚀 Peak Buy 🚀\n' + value + ' Metis'
      ))
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
var log_file = fs.createWriteStream(__dirname + '/debug.log', { flags: 'w' });
var log_stdout = process.stdout;

console.log = function (d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

client.login(discordToken);
