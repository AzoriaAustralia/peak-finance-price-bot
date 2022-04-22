const { Client, Intents, Channel } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { MessageEmbed } = require('discord.js');
require('dotenv').config();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
    interaction.reply("Apoligies, Bot is undergoing maintenance!")
  });

client.login(process.env.bot_token).then(console.log('Server Started'));
