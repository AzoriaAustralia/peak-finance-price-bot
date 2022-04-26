const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const commands = [
  { name: 'peg',
    description: 'Show current peg of $Peak'},
  { name: 'price',
    description: 'Shows price of $Peak and $Pro'},
  { name: 'contract',
    description: 'Shows contract addresses for $Peak and $Pro'},
  { name: 'peak',
    description: 'Show $Peak Details'},
  { name: 'pro',
    description: "Show $Pro Details"},
  { name: 'liquidity',
    description: 'Show liquidity pool details'}
  ]; 

const rest = new REST({ version: '9' }).setToken(process.env.bot_token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(process.env.client_id, process.env.guild_id),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
