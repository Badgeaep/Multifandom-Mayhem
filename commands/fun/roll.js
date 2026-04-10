const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Roll a dice!')
		.addIntegerOption(option =>
			option.setName('max')
				.setDescription('Maximum value of the dice (default is 100)')
				.setMinValue(1)),
	async execute(interaction) {
		const max = interaction.options.getInteger('max') ?? 100;
		const result = Math.floor(Math.random() * max) + 1;
		await interaction.reply({ content: `🎲 You rolled a **${result}** (1-${max})!` });
	},
};
