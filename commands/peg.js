const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const dataUpdater = require('../dataUpdater');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('peg')
		.setDescription('Show current peg of $Peak'),
	async execute(interaction) {
        let pegEmbed = new MessageEmbed().setFooter({ text: 'Peak Finance', iconURL: 'https://peakfinance.io/wp-content/uploads/2022/03/Logo-medium-.png' }).setColor('#04E09F')
          .addField('Current Peak Peg', '```' + dataUpdater.peak['pair']['priceNative'] + '```', true)
          .setFooter('Data may be slightly delayed');
        return interaction.reply({embeds: [pegEmbed]})
        },
};