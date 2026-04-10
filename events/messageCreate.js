const { Events } = require('discord.js');

const bannedWords = ['scam', 'free-nitro', 'hack', 'exploit']; // Add more words as needed

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		if (message.author.bot) return;

		const content = message.content.toLowerCase();

		// Check for banned words
		const hasBannedWord = bannedWords.some(word => content.includes(word));
        
        // Check for suspicious links (e.g., fake nitro)
        const hasSuspiciousLink = /discord\.(gg|link|io)\/([a-zA-Z0-9]+)/.test(content) && content.includes('nitro');

		if (hasBannedWord || hasSuspiciousLink) {
			try {
				await message.delete();
				const warning = await message.channel.send(`⚠️ **AutoMod:** ${message.author}, your message was removed for containing prohibited content.`);
                
                // Delete warning after 5 seconds to keep chat clean
                setTimeout(() => warning.delete().catch(() => {}), 5000);
			} catch (error) {
				console.error('Failed to delete message:', error);
			}
		}
	},
};
