const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roles')
		.setDescription('Choose your fandom roles!')
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setColor(0x9B59B6)
			.setTitle('🎭 Fandom Roles')
			.setDescription('Select the fandoms you are interested in from the menu below to get your roles!');

		const select = new StringSelectMenuBuilder()
			.setCustomId('fandom-roles')
			.setPlaceholder('Pick your fandoms...')
			.setMinValues(1)
			.setMaxValues(5)
			.addOptions(
				new StringSelectMenuOptionBuilder().setLabel('Marvel').setValue('role_marvel').setDescription('Marvel Fans Assemble!'),
				new StringSelectMenuOptionBuilder().setLabel('DC Comics').setValue('role_dc').setDescription('DC Universe Enthusiasts'),
				new StringSelectMenuOptionBuilder().setLabel('Anime').setValue('role_anime').setDescription('Otakus Welcome'),
				new StringSelectMenuOptionBuilder().setLabel('Gaming').setValue('role_gaming').setDescription('For the Gamers'),
				new StringSelectMenuOptionBuilder().setLabel('Harry Potter').setValue('role_hp').setDescription('Wizards and Witches'),
			);

		const row = new ActionRowBuilder().addComponents(select);

		await interaction.reply({
			embeds: [embed],
			components: [row],
		});
	},
};
