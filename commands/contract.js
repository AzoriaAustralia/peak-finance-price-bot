const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('contract')
		.setDescription('Shows contract addresses for $Peak and $Pro'),
	async execute(interaction) {
        let contractEmbed = new MessageEmbed().setFooter({ text: 'Peak Finance', iconURL: 'https://peakfinance.io/wp-content/uploads/2022/03/Logo-medium-.png' }).setColor('#04E09F')
          .addField('Peak', '```0x1F5550A0F5F659E07506088A7919A88DfF37218f```', false)
          .addField('Pro', '```0x259EF6776648500D7F1A8aBA3651E38b1121e65e```', false);
        return interaction.reply({embeds: [contractEmbed]})}
};




