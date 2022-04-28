const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Peak = require('./abi/Peak.json');
const Pro = require('./abi/Pro.json');
const ethers = require("ethers");

const provider = new ethers.providers.WebSocketProvider('wss://andromeda-ws.metis.io/', 1088);

const peak = new ethers.Contract(Peak.address, Peak.abi, provider);
const pro = new ethers.Contract(Pro.address, Pro.abi, provider);

async function proFee(){
    let fee = await pro.maxFeeAmount()
    let proFee = Number.parseInt(ethers.utils.formatEther(fee));
    return proFee > 0 ? "ON" : "OFF"
};

async function peakFee() {
    let tax = await peak.taxRate().then(tax => ethers.utils.formatUnits(tax, 'wei'));
    tax = Number.parseFloat(tax)/100;
    return tax;
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tax')
        .setDescription('Shows tax status and details'),
    async execute(interaction) {
        let peak = await peakFee();
        let pro = await proFee()
        let taxEmbed = new MessageEmbed()
            .setColor('#04E09F')
            .setFooter({ text: 'Peak Finance', iconURL: 'https://peakfinance.io/wp-content/uploads/2022/03/Logo-medium-.png' })
            .addField('$Peak Tax',  '```' + peak + '%```', false)
            .addField('$Pro tax','```' + pro + '```', false);
        return interaction.reply({ embeds: [taxEmbed] })
    }
}