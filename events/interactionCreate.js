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
				const roleMap = {
					'role_marvel': 'Marvel',
					'role_dc': 'DC Comics',
					'role_anime': 'Anime',
					'role_gaming': 'Gaming',
					'role_hp': 'Harry Potter',
				};

				const rolesToAdd = interaction.values;
				const member = interaction.member;

				await interaction.deferReply({ ephemeral: true });

				try {
					for (const [val, roleName] of Object.entries(roleMap)) {
						const role = interaction.guild.roles.cache.find(r => r.name === roleName);
						if (!role) continue;

						if (rolesToAdd.includes(val)) {
							await member.roles.add(role);
						} else {
							await member.roles.remove(role);
						}
					}
					await interaction.editReply({ content: '✅ Your fandom roles have been updated!' });
				} catch (error) {
					console.error(error);
					await interaction.editReply({ content: '❌ Fail to update roles. Make sure I have "Manage Roles" permission and my role is high enough.' });
				}
			}
		}
	},
};
