const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Create fun channels for the community')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		const guild = interaction.guild;
		
		await interaction.deferReply({ ephemeral: true });

		try {
			const category = await guild.channels.create({
				name: '✨ MULTIFANDOM MAYHEM',
				type: ChannelType.GuildCategory,
			});

			const channels = [
				{ name: '🎨-fan-art', topic: 'Show off your creative work here!' },
				{ name: '🔮-theories', topic: 'Discuss your theories and spoilers.' },
				{ name: '🎮-gaming-lounge', topic: 'Talk about games and find teammates.' },
				{ name: '📚-general-fandom', topic: 'Discuss any fandom here!' },
			];

			for (const channelData of channels) {
				await guild.channels.create({
					name: channelData.name,
					type: ChannelType.GuildText,
					parent: category.id,
					topic: channelData.topic,
				});
			}

			const rolesToCreate = [
				{ name: 'Marvel', color: 0xED1D24 },
				{ name: 'DC Comics', color: 0x0047AB },
				{ name: 'Anime', color: 0xFF69B4 },
				{ name: 'Gaming', color: 0x2ECC71 },
				{ name: 'Harry Potter', color: 0xE67E22 },
			];

			for (const roleData of rolesToCreate) {
				const existingRole = guild.roles.cache.find(r => r.name === roleData.name);
				if (!existingRole) {
					await guild.roles.create({
						name: roleData.name,
						color: roleData.color,
						reason: 'Initial setup for fandom roles',
					});
				}
			}

			await interaction.editReply({ content: '✅ Fun channels and fandom roles have been successfully created!' });
		} catch (error) {
			console.error(error);
			await interaction.editReply({ content: '❌ Fail to create channels. Make sure I have "Manage Channels" permission.' });
		}
	},
};
