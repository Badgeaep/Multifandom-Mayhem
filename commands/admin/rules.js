const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rules')
		.setDescription('Displays the community rules'),
	async execute(interaction) {
		const rulesEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('📜 Multifandom Mayhem - Community Rules')
			.setDescription('Welcome to the mayhem! To keep things fun and safe for everyone, please follow these rules:')
			.addFields(
				{ name: '1. Respect Everyone', value: 'Be kind and respectful to all members. No harassment, hate speech, or bullying.' },
				{ name: '2. No Spoilers!', value: 'Keep spoilers in designated channels (#theories-and-spoilers). Use spoiler tags `||spoiler||` if unsure.' },
				{ name: '3. Fandom Peace', value: 'We love all fandoms here. No "fandom wars" or toxic elitism. Every fandom is valid!' },
				{ name: '4. Appropriate Content', value: 'No NSFW content. Keep things PG-13 unless in specific restricted channels.' },
				{ name: '5. No Spamming', value: 'Don\'t spam messages, emojis, or mentions. Keep the chat clean.' },
				{ name: '6. Follow Discord ToS', value: 'All members must adhere to Discord\'s Terms of Service.' },
			)
			.setFooter({ text: 'Multifandom Mayhem - Join the Chaos!', iconURL: interaction.client.user.displayAvatarURL() })
			.setTimestamp();

		await interaction.reply({ embeds: [rulesEmbed] });
	},
};
