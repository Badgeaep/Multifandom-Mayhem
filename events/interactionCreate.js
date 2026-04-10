const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
				} else {
					await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
				}
			}
		} else if (interaction.isStringSelectMenu()) {
			if (interaction.customId === 'fandom-roles') {
				const charMap = {
					'char_flash': { role: 'The Flash', header: '─── DC UNIVERSE ───' },
					'char_superman': { role: 'Superman', header: '─── DC UNIVERSE ───' },
					'char_spiderman': { role: 'Spider-Man', header: '─── MARVEL ───' },
					'char_ironman': { role: 'Iron Man', header: '─── MARVEL ───' },
					'char_naruto': { role: 'Naruto', header: '─── ANIME ───' },
					'char_goku': { role: 'Goku', header: '─── ANIME ───' },
					'char_kratos': { role: 'Kratos', header: '─── GAMING ───' },
					'char_masterchief': { role: 'Master Chief', header: '─── GAMING ───' },
				};

				const selectedChars = interaction.values;
				const member = interaction.member;

				await interaction.deferReply({ ephemeral: true });

				try {
					// 1. Determine all roles to add/remove
					const targetRoles = new Set();
					const targetHeaders = new Set();

					for (const charKey of selectedChars) {
						if (charMap[charKey]) {
							targetRoles.add(charMap[charKey].role);
							targetHeaders.add(charMap[charKey].header);
						}
					}

					// 2. Cycle through all possible roles to add or remove
					const allPossibleRoles = new Set(Object.values(charMap).map(m => m.role));
					const allPossibleHeaders = new Set(Object.values(charMap).map(m => m.header));

					// Handle Characters
					for (const roleName of allPossibleRoles) {
						const role = interaction.guild.roles.cache.find(r => r.name === roleName);
						if (!role) continue;
						if (targetRoles.has(roleName)) {
							await member.roles.add(role);
						} else {
							await member.roles.remove(role);
						}
					}

					// Handle Headers
					for (const headerName of allPossibleHeaders) {
						const header = interaction.guild.roles.cache.find(r => r.name === headerName);
						if (!header) continue;
						if (targetHeaders.has(headerName)) {
							await member.roles.add(header);
						} else {
							await member.roles.remove(header);
						}
					}

					await interaction.editReply({ content: '✅ Your character roles and fandom headers have been updated!' });
				} catch (error) {
					console.error(error);
					await interaction.editReply({ content: '❌ Fail to update roles. Make sure I have "Manage Roles" permission.' });
				}
			}
		}
	},
};
