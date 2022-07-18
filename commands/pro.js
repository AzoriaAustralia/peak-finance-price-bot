const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const dataUpdater = require('../dataUpdater');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pro')
		.setDescription('Show details for $Pro'),
	async execute(interaction) {
        let liq = Math.trunc(dataUpdater.pro['pair']['liquidity']['usd']);
        let peakEmbed = new MessageEmbed().setFooter({ text: 'Peak Finance', iconURL: 'https://peakfinance.io/wp-content/uploads/2022/03/Logo-medium-.png' }).setColor('#04E09F')
          .addFields(
            {name: 'Contract Address', value: '```' + dataUpdater.pro['pair']['baseToken']['address'] + '```', inline: false},
            {name: 'Pro USD', value: '```$' + dataUpdater.pro['pair']['priceUsd'] + '```', inline: true},
            {name: 'Pro Metis', value: '```' + dataUpdater.pro['pair']['priceNative'] + '```', inline: true},
            { name: '\u200B', value: '\u200B' },          
            {name: 'Volume 24 Hrs', value: '```' + dataUpdater.pro['pair']['volume']['h24'].toLocaleString() + '```', inline: true},
            {name: 'Price Change 24 Hrs', value: '```' + dataUpdater.pro['pair']['priceChange']['h24'] + '%```', inline: true},
            {name: 'Liquidity USD', value: "```$" + liq.toLocaleString().toString() + '```', inline: true}
          )
          .setFooter('Data may be slightly delayed');
          interaction.reply({embeds: [peakEmbed]})
      }
};