const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const characters = [
    {
        name: "Spider-Man",
        hints: [
            "I live in Queens, New York.",
            "I was bitten by a radioactive insect.",
            "With great power comes great responsibility."
        ]
    },
    {
        name: "Naruto Uzumaki",
        hints: [
            "I want to become the Hokage.",
            "I have a nine-tailed fox sealed inside me.",
            "My favorite food is Ichiraku Ramen."
        ]
    },
    {
        name: "Link",
        hints: [
            "I am the Hero of Time.",
            "I often wear a green tunic and a pointy hat.",
            "I wield the Master Sword."
        ]
    },
    {
        name: "Iron Man",
        hints: [
            "I am a billionaire, genius, playboy, philanthropist.",
            "I built my first suit in a cave with a box of scraps.",
            "I am the leader of Stark Industries."
        ]
    },
    {
        name: "Elsa",
        hints: [
            "I have magical ice powers.",
            "My sister's name is Anna.",
            "I sang 'Let It Go'."
        ]
    }
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('character')
		.setDescription('Guess the character based on hints!'),
	async execute(interaction) {
		const character = characters[Math.floor(Math.random() * characters.length)];
        let hintIndex = 0;

        const embed = new EmbedBuilder()
            .setColor(0x3498DB)
            .setTitle('🕵️ Guess the Character!')
            .setDescription(`**Hint 1:** ${character.hints[hintIndex]}`)
            .setFooter({ text: 'Type your guess in the chat! You have 30 seconds.' });

        await interaction.reply({ embeds: [embed] });

        const filter = m => m.channel.id === interaction.channel.id;
        const collector = interaction.channel.createMessageCollector({ filter, time: 30000 });

        collector.on('collect', async m => {
            if (m.content.toLowerCase() === character.name.toLowerCase()) {
                await m.reply(`🎉 Correct! It was **${character.name}**!`);
                collector.stop('guessed');
            } else if (m.content.toLowerCase() === 'hint' && hintIndex < character.hints.length - 1) {
                hintIndex++;
                await interaction.followUp({ content: `🔍 **Hint ${hintIndex + 1}:** ${character.hints[hintIndex]}` });
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason !== 'guessed') {
                interaction.followUp({ content: `⏰ Time's up! The character was **${character.name}**.` });
            }
        });
	},
};
