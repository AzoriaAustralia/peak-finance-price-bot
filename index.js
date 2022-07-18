const { Client, Intents, Channel, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { discordToken } = require('./config.json');
require("./commandRegister.js");
const fs = require('node:fs');
const dataUpdater = require('./dataUpdater');


client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.on('ready', () => {
  console.log(`Server Started as ${client.user.tag}!`);
  client.user.setActivity('The Peg', { type: 'WATCHING' });
});


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

function updatePeg() {
	const channel = client.channels.fetch('998473980409298964')
	channel.edit({ name: channel.name + ' ' + dataUpdater.peak['pair']['priceNative']})
};

setInterval(updatePeg, 15000);


client.login(discordToken);
