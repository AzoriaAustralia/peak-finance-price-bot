const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const dataUpdater = require('../dataUpdater');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('price')
		.setDescription('Show $Peak and $Pro Price.'),
	async execute(interaction) {
		let priceEmbed = new MessageEmbed().setFooter({ text: 'Peak Finance', iconURL: 'https://peakfinance.io/wp-content/uploads/2022/03/Logo-medium-.png' }).setColor('#04E09F')
      .addFields(
        {name: 'Peak USD', value: '```$' + dataUpdater.peak['pair']['priceUsd'] + '```', inline: true},
        {name: 'Peak Metis', value: '```' + dataUpdater.peak['pair']['priceNative'] + '```', inline: true},
        { name: '\u200B', value: '\u200B' },
        {name: 'Pro USD', value: '```$' + dataUpdater.pro['pair']['priceUsd'] + '```', inline: true},
        {name: 'Pro Metis', value: '```' + dataUpdater.pro['pair']['priceNative'] + '```', inline: true},
      );
    interaction.reply({embeds: [priceEmbed]})
	}
};