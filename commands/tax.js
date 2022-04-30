const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Peak = require('./abi/Peak.json');
const Pro = require('./abi/Pro.json');
const dataUpdater = require('../dataUpdater');

function getRate(peg) {
    if(peg >= 1.1){return 0} else
    if(peg >= 0.9){return 15} else
    if(peg >= 0.8){return 16} else
    if(peg >= 0.7){return 17} else
    if(peg >= 0.6){return 18} else
    if(peg >= 0.5){return 19} else
    if(peg >= 0){return 20}
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tax')
        .setDescription('Shows tax status and details'),
    async execute(interaction) {
        let peg = Number.parseFloat(dataUpdater.peak['pair']['priceNative']);
        let peakTaxRate = getRate(peg);
        let taxEmbed = new MessageEmbed()
            .setColor('#04E09F')
            .setFooter({ text: 'Peak Finance', iconURL: 'https://peakfinance.io/wp-content/uploads/2022/03/Logo-medium-.png' })
            .addField('$Peak Tax', '```' + peakTaxRate + '%```', false)
            .addField('$Pro tax', '```' + (peg > 1.1 ? "On" : "Off") + '```', false);
        return interaction.reply({ embeds: [taxEmbed] });
    }
}
