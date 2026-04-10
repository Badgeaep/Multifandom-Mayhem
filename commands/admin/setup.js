const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('BUILD THE ENTIRE SERVER INFRASTRUCTURE!')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		const guild = interaction.guild;
		
		await interaction.deferReply({ ephemeral: true });

		try {
			// 1. Roles to Create (Sub-roles and Separators)
			const rolesToCreate = [
                // Headers (Separators)
                { name: '─── DC UNIVERSE ───', color: 0x99AAB5, hoist: true },
                { name: '─── MARVEL ───', color: 0x99AAB5, hoist: true },
                { name: '─── ANIME ───', color: 0x99AAB5, hoist: true },
                { name: '─── GAMING ───', color: 0x99AAB5, hoist: true },
                
                // Specific Character Roles
				{ name: 'The Flash', color: 0xFF0000 },
				{ name: 'Superman', color: 0x00A8FF },
				{ name: 'Spider-Man', color: 0xE62429 },
				{ name: 'Iron Man', color: 0xFFD700 },
				{ name: 'Naruto', color: 0xFF6600 },
                { name: 'Goku', color: 0xE67E22 },
                { name: 'Kratos', color: 0xC0392B },
                { name: 'Master Chief', color: 0x27AE60 },
			];

			for (const roleData of rolesToCreate) {
				const existingRole = guild.roles.cache.find(r => r.name === roleData.name);
				if (!existingRole) {
					await guild.roles.create({
						name: roleData.name,
						color: roleData.color || 0,
                        hoist: roleData.hoist || false,
						reason: 'Fandom expansion setup',
					});
				}
			}

			// 2. Categories and Channels
			const structure = [
				{
					name: '📢 IMPORTANT',
					channels: [
						{ name: '📌-rules', topic: 'Official community rules.' },
						{ name: '📣-announcements', topic: 'Main updates from staff.' },
						{ name: '🎁-giveaways', topic: 'Win cool prizes!' },
						{ name: '🎖️-get-roles', topic: 'Get your fandom roles here.' },
					]
				},
				{
					name: '💬 COMMUNITY',
					channels: [
						{ name: '🏠-general', topic: 'Main chat for everyone.' },
						{ name: '📸-media', topic: 'Share your photos and videos.' },
						{ name: '🤖-bot-commands', topic: 'Use bot commands here.' },
						{ name: '😂-memes', topic: 'Dank memes only.' },
					]
				},
				{
					name: '🤖 MULTIFANDOM GAMES',
					channels: [
						{ name: '🧠-trivia-room', topic: 'Play the /trivia game here!' },
						{ name: '🕵️-character-guess', topic: 'Play the /character game here!' },
						{ name: '🎲-roll-here', topic: 'Feeling lucky? /roll' },
					]
				},
				{
					name: '🎌 ANIME & MANGA',
					channels: [
						{ name: '🍜-anime-chat', topic: 'Discuss your favorite shows.' },
						{ name: '📖-manga-leaks', topic: 'Spoilers and new chapters.' },
						{ name: '🔊 Anime Lounge', type: ChannelType.GuildVoice },
					]
				},
				{
					name: '🦸 HEROES & COMICS',
					channels: [
						{ name: '🛡️-marvel-dc', topic: 'Superheroes and comics discussion.' },
						{ name: '🔮-theory-crafting', topic: 'Theories about the MCU/DCU.' },
						{ name: '🔊 Hero Lounge', type: ChannelType.GuildVoice },
					]
				},
				{
					name: '🎮 GAMING ZONE',
					channels: [
						{ name: '🕹️-game-news', topic: 'Latest trailers and updates.' },
						{ name: '🤝-find-group', topic: 'Find teammates for your games.' },
						{ name: '🔊 Gaming VC', type: ChannelType.GuildVoice },
					]
				},
				{
					name: '🎙️ VOICE LOUNGE',
					channels: [
						{ name: '🔊 General VC 1', type: ChannelType.GuildVoice },
						{ name: '🔊 General VC 2', type: ChannelType.GuildVoice },
						{ name: '🎵 Music Room', type: ChannelType.GuildVoice },
						{ name: '💤 AFK Channel', type: ChannelType.GuildVoice },
					]
				},
				{
					name: '🛡️ STAFF ONLY',
					private: true,
					channels: [
						{ name: '🔒-staff-chat', topic: 'Private chat for staff.' },
						{ name: '📜-admin-logs', topic: 'Bot and moderation logs.' },
						{ name: '🔊 Staff Meeting', type: ChannelType.GuildVoice },
					]
				}
			];

			for (const catData of structure) {
				const category = await guild.channels.create({
					name: catData.name,
					type: ChannelType.GuildCategory,
					permissionOverwrites: catData.private ? [
						{
							id: guild.id, // @everyone
							deny: [PermissionFlagsBits.ViewChannel],
						},
					] : [],
				});

				for (const chanData of catData.channels) {
					await guild.channels.create({
						name: chanData.name,
						type: chanData.type || ChannelType.GuildText,
						parent: category.id,
						topic: chanData.topic || '',
					});
				}
			}

			await interaction.editReply({ content: '✅ **SUPER SETUP COMPLETE!** All sub-roles and categories have been created. 🦅' });
		} catch (error) {
			console.error(error);
			await interaction.editReply({ content: '❌ Fail to complete setup. Make sure I have "Administrator" permissions.' });
		}
	},
};
