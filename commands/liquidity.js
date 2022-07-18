const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const dataUpdater = require('../dataUpdater');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('liqudity')
		.setDescription('Shows liquidity details'),
	async execute(interaction) {
        let liquidityEmbed = new MessageEmbed().setFooter({ text: 'Peak Finance', iconURL: 'https://peakfinance.io/wp-content/uploads/2022/03/Logo-medium-.png' }).setColor('#04E09F')
          .addField('Peak LP', '```' + dataUpdater.peak['pair']['liquidity']['base'] + ' Peak <> ' + dataUpdater.peak['pair']['liquidity']['quote'] + ' Metis```', true)
          .addField('Pro LP', '```' + dataUpdater.pro['pair']['liquidity']['base'] + ' Pro <> ' + dataUpdater.pro['pair']['liquidity']['quote'] + ' Metis```', true)
          .setFooter('Data may be slightly delayed');
        return interaction.reply({embeds: [liquidityEmbed]})}
};