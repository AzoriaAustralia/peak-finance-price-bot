const { Client, Intents, Channel } = require('discord.js');
const dataUpdater = require('./dataUpdater');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { MessageEmbed } = require('discord.js');
import("./dataUpdater.js");
import("./commandRegister.js");
require('dotenv').config();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'peg') {
    let pegEmbed = new MessageEmbed().setFooter({ text: 'Peak Finance', iconURL: 'https://peakfinance.io/wp-content/uploads/2022/03/Logo-medium-.png' }).setColor('#04E09F')
      .addField('Current Peak Peg', dataUpdater.peak['pair']['priceNative'], true);
    interaction.reply({embeds: [pegEmbed]})
	}
  else if (commandName === 'price') {
		let priceEmbed = new MessageEmbed().setFooter({ text: 'Peak Finance', iconURL: 'https://peakfinance.io/wp-content/uploads/2022/03/Logo-medium-.png' }).setColor('#04E09F')
      .addFields(
        {name: 'Peak Price USD', value: '$' + dataUpdater.peak['pair']['priceUsd'], inline: true},
        {name: 'Peak Price Metis', value: dataUpdater.peak['pair']['priceNative'] + ' Metis', inline: true},
        { name: '\u200B', value: '\u200B' },
        {name: 'Pro Price USD', value: '$' + dataUpdater.pro['pair']['priceUsd'], inline: true},
        {name: 'Pro Price Metis', value: dataUpdater.pro['pair']['priceNative'] + ' Metis', inline: true},
      );
    interaction.reply({embeds: [priceEmbed]})
	} else if (commandName === 'contract') {
    let contractEmbed = new MessageEmbed().setFooter({ text: 'Peak Finance', iconURL: 'https://peakfinance.io/wp-content/uploads/2022/03/Logo-medium-.png' }).setColor('#04E09F')
      .addField('Peak', '0x1F5550A0F5F659E07506088A7919A88DfF37218f', false)
      .addField('Pro', '0x259EF6776648500D7F1A8aBA3651E38b1121e65e', false);
    interaction.reply({embeds: [contractEmbed]})
	} else if (commandName === 'peak') {
    let liq = Math.trunc(dataUpdater.peak['pair']['liquidity']['usd']);
    let peakEmbed = new MessageEmbed().setFooter({ text: 'Peak Finance', iconURL: 'https://peakfinance.io/wp-content/uploads/2022/03/Logo-medium-.png' }).setColor('#04E09F')
      .addFields(
        {name: 'Contract Address', value: dataUpdater.peak['pair']['baseToken']['address'], inline: false},
        {name: 'Peak Price USD', value: '$' + dataUpdater.peak['pair']['priceUsd'], inline: true},
        {name: 'Peak Price Metis', value: dataUpdater.peak['pair']['priceNative'] + ' Metis', inline: true},
        { name: '\u200B', value: '\u200B' },
        // {name: 'Trades 24 Hrs', value: '$' + (dataUpdater.peak['pair']['txns']['h24']['sells'] + dataUpdater.peak['pair']['txns']['h24']['buys']), inline: true},
        {name: 'Volume 24 Hrs', value: dataUpdater.peak['pair']['volume']['h24'].toLocaleString() + ' Metis', inline: true},
        {name: 'Price Change 24 Hrs', value: dataUpdater.peak['pair']['priceChange']['h24'] + '%', inline: true},
        {name: 'Liquidity USD', value: "$" + liq.toLocaleString().toString(), inline: true}
      );
      interaction.reply({embeds: [peakEmbed]})
  	} else if (commandName === 'pro') {
      let liq = Math.trunc(dataUpdater.pro['pair']['liquidity']['usd']);
      let peakEmbed = new MessageEmbed().setFooter({ text: 'Peak Finance', iconURL: 'https://peakfinance.io/wp-content/uploads/2022/03/Logo-medium-.png' }).setColor('#04E09F')
        .addFields(
          {name: 'Contract Address', value: dataUpdater.pro['pair']['baseToken']['address'], inline: false},
          {name: 'Pro Price USD', value: '$' + dataUpdater.pro['pair']['priceUsd'], inline: true},
          {name: 'Pro Price Metis', value: dataUpdater.pro['pair']['priceNative'] + ' Metis', inline: true},
          { name: '\u200B', value: '\u200B' },          
          {name: 'Volume 24 Hrs', value: dataUpdater.pro['pair']['volume']['h24'].toLocaleString() + ' Metis', inline: true},
          {name: 'Price Change 24 Hrs', value: dataUpdater.pro['pair']['priceChange']['h24'] + '%', inline: true},
          {name: 'Liquidity USD', value: "$" + liq.toLocaleString().toString(), inline: true}
        );
        interaction.reply({embeds: [peakEmbed]})
    }
  });

client.login(process.env.bot_token).then(console.log('Server Started'));
