const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Shows commands and details'),
	async execute(interaction) {
        let helpEmbed = new MessageEmbed().setFooter({ text: 'Peak Finance', iconURL: 'https://peakfinance.io/wp-content/uploads/2022/03/Logo-medium-.png' }).setColor('#04E09F')
            .addFields(
                {name: 'Contract', value: '```Display contract addresses```', inline: true},
                {name: 'Liquidity', value: '```Display Liqudity Status```', inline: true},
                {name: 'Peak', value: '```Display Peak Details```', inline: true},
                {name: 'Pro', value: '```Display Pro Details```', inline: true},
                {name: 'Peg', value: '```Display Peg```', inline: true},
                {name: 'Tax', value: '```Get Current Tax Details```', inline: true},
                {name: 'Price', value: '```Display Price for $Peak and $Pro```', inline: true},
                {name: 'Twap', value: '```Display Last hour TWAP & Current Epoch```', inline: true},
                {name: 'Help', value: '```Display This Help Message```', inline: true}
            )
        return interaction.reply({embeds: [helpEmbed]})}
};