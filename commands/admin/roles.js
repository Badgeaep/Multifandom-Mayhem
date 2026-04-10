const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roles')
		.setDescription('Choose your fandom characters!')
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setColor(0x9B59B6)
			.setTitle('🎭 Character Roles')
			.setDescription('Select your favorite characters to get their roles! Choosing a character will also add you to their Fandom category in the member list.');

		const select = new StringSelectMenuBuilder()
			.setCustomId('fandom-roles')
			.setPlaceholder('Pick your heroes/characters...')
			.setMinValues(0)
			.setMaxValues(10)
			.addOptions(
				new StringSelectMenuOptionBuilder().setLabel('The Flash (DC)').setValue('char_flash').setEmoji('⚡'),
				new StringSelectMenuOptionBuilder().setLabel('Superman (DC)').setValue('char_superman').setEmoji('🦸'),
				new StringSelectMenuOptionBuilder().setLabel('Spider-Man (Marvel)').setValue('char_spiderman').setEmoji('🕷️'),
				new StringSelectMenuOptionBuilder().setLabel('Iron Man (Marvel)').setValue('char_ironman').setEmoji('🤖'),
				new StringSelectMenuOptionBuilder().setLabel('Naruto (Anime)').setValue('char_naruto').setEmoji('🍥'),
				new StringSelectMenuOptionBuilder().setLabel('Goku (Anime)').setValue('char_goku').setEmoji('🐉'),
                new StringSelectMenuOptionBuilder().setLabel('Kratos (Gaming)').setValue('char_kratos').setEmoji('🪓'),
                new StringSelectMenuOptionBuilder().setLabel('Master Chief (Gaming)').setValue('char_masterchief').setEmoji('🔫'),
			);

		const row = new ActionRowBuilder().addComponents(select);

		await interaction.reply({
			embeds: [embed],
			components: [row],
		});
	},
};
