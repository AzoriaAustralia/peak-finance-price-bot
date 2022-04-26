const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { ethers, BigNumber } = require("ethers");
const Treasury = require('./abi/Treasury.json');

const provider = new ethers.providers.WebSocketProvider('wss://andromeda-ws.metis.io/', 1088);
const treasury = new ethers.Contract(Treasury.address, Treasury.abi, provider)

module.exports = {
	data: new SlashCommandBuilder()
		.setName('twap')
		.setDescription('Shows Last Hour TWAP'),
	async execute(interaction) {
        let twapp = await treasury.getPeakUpdatedPrice()
        let Twap = Number(ethers.utils.formatEther(twapp)).toFixed(4);
        let contractEmbed = new MessageEmbed().setFooter({ text: 'Peak Finance', iconURL: 'https://peakfinance.io/wp-content/uploads/2022/03/Logo-medium-.png' }).setColor('#04E09F')
          .addField('Last Hour TWAP', '```' + Twap + '```', true)
          .addField('Current Epoch', '```' + await treasury.epoch() + '```', true)
        return interaction.reply({embeds: [contractEmbed]})
    }
};