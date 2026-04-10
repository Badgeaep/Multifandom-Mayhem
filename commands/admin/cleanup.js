const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

const categoriesToCleanup = [
    '📢 IMPORTANT',
    '💬 COMMUNITY',
    '🤖 MULTIFANDOM GAMES',
    '🎌 ANIME & MANGA',
    '🦸 HEROES & COMICS',
    '🎮 GAMING ZONE',
    '🎙️ VOICE LOUNGE',
    '🛡️ STAFF ONLY',
    '✨ MULTIFANDOM MAYHEM' // Old category name just in case
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cleanup')
		.setDescription('Deletes all categories and channels created by the bot setup.')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });

		try {
			const guild = interaction.guild;
            const channels = await guild.channels.fetch();
            
            let deletedCount = 0;

            // Find categories matching our list
            const categories = channels.filter(c => c.type === 4 && categoriesToCleanup.includes(c.name));

            for (const [id, category] of categories) {
                // Find all channels belonging to this category
                const children = channels.filter(c => c.parentId === id);
                
                // Delete children first
                for (const [childId, child] of children) {
                    await child.delete('Cleanup command executed');
                    deletedCount++;
                }

                // Delete category
                await category.delete('Cleanup command executed');
                deletedCount++;
            }

			await interaction.editReply({ content: `✅ **CLEANUP COMPLETE!** Deleted ${deletedCount} items (channels and categories). The server layout has been reset.` });
		} catch (error) {
			console.error(error);
			await interaction.editReply({ content: '❌ Fail to clean up. Make sure I have "Manage Channels" permission.' });
		}
	},
};
