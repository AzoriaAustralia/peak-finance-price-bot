const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const dataUpdater = require('../dataUpdater');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('peak')
		.setDescription('Show details for $Peak'),
	async execute(interaction) {
        let liq = Math.trunc(dataUpdater.peak['pair']['liquidity']['usd']);
        let peakEmbed = new MessageEmbed().setFooter({ text: 'Peak Finance', iconURL: 'https://peakfinance.io/wp-content/uploads/2022/03/Logo-medium-.png' }).setColor('#04E09F')
          .addFields(
            {name: 'Contract Address', value: '```' + dataUpdater.peak['pair']['baseToken']['address'] + '```', inline: false},
            {name: 'Peak USD', value: '```$' + dataUpdater.peak['pair']['priceUsd'] + '```', inline: true},
            {name: 'Peak Metis', value: '```' + dataUpdater.peak['pair']['priceNative'] + '```', inline: true},
            { name: '\u200B', value: '\u200B' },
            {name: 'Volume 24 Hrs', value: '```' + dataUpdater.peak['pair']['volume']['h24'].toLocaleString() + ' Metis```', inline: true},
            {name: 'Change 24 Hrs', value: '```' + dataUpdater.peak['pair']['priceChange']['h24'] + '%```', inline: true},
            {name: 'Liquidity USD', value: "```$" + liq.toLocaleString().toString() + '```', inline: true}
          );
          interaction.reply({embeds: [peakEmbed]})
          }
};