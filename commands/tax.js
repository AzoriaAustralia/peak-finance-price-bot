const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const dataUpdater = require('../dataUpdater');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tax')
		.setDescription('Shows tax status and details'),
	async execute(interaction) {
        let result;
        let peg = Number(dataUpdater.peak['pair']['priceNative']).toFixed(2);
        let taxEmbed = new MessageEmbed()
            .setColor('#04E09F')
            .setFooter({ text: 'Peak Finance', iconURL: 'https://peakfinance.io/wp-content/uploads/2022/03/Logo-medium-.png' })
            .addField('Peg is ```' + peg + '```', 'Tax on peak is ```' + getValue(peg) + '```')
            .addField('$Pro tax is currently ', '```OFF```', false);
            return interaction.reply({embeds: [taxEmbed]})

        function getValue(peg){
                if (peg > 1.01){ return "0%"} else
                if (peg > 0.90){ return "15%";} else
                if (peg > 0.80){ return "16%";} else
                if (peg > 0.70){ return "17%";} else
                if (peg > 0.60){ return "18%";} else
                if (peg >0.50){ return "19%";} else
                if (peg < 0.50 && peg > 0){ return "20%";};
            }
        }       
}