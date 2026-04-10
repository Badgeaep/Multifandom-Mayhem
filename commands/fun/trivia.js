const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const triviaQuestions = [
    {
        question: "In the Marvel Cinematic Universe, what is the name of Thor's hammer?",
        options: ["Mjolnir", "Stormbreaker", "Gungnir", "Aegis"],
        answer: "Mjolnir"
    },
    {
        question: "Which anime features a boy named Monkey D. Luffy who wants to become the Pirate King?",
        options: ["Naruto", "Dragon Ball", "One Piece", "Bleach"],
        answer: "One Piece"
    },
    {
        question: "In Harry Potter, what is the name of the house that values bravery and courage?",
        options: ["Slytherin", "Ravenclaw", "Hufflepuff", "Gryffindor"],
        answer: "Gryffindor"
    },
    {
        question: "In the game 'The Legend of Zelda', what is the name of the main protagonist?",
        options: ["Zelda", "Link", "Ganon", "Sheik"],
        answer: "Link"
    },
    {
        question: "Which Doctor Who actor played the 10th Doctor?",
        options: ["Matt Smith", "David Tennant", "Christopher Eccleston", "Peter Capaldi"],
        answer: "David Tennant"
    }
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('trivia')
		.setDescription('Starts a multifandom trivia question!'),
	async execute(interaction) {
		const randomQuestion = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
        
        const triviaEmbed = new EmbedBuilder()
            .setColor(0xFFD700)
            .setTitle('🧠 Multifandom Trivia')
            .setDescription(randomQuestion.question)
            .addFields(
                { name: 'Options', value: randomQuestion.options.map((opt, i) => `${i + 1}. **${opt}**`).join('\n') }
            )
            .setFooter({ text: 'You have 15 seconds to answer with the correct option number!' });

        await interaction.reply({ embeds: [triviaEmbed] });

        const filter = m => m.author.id === interaction.user.id && ['1', '2', '3', '4'].includes(m.content);
        const collector = interaction.channel.createMessageCollector({ filter, time: 15000, max: 1 });

        collector.on('collect', async m => {
            const selectedOption = randomQuestion.options[parseInt(m.content) - 1];
            if (selectedOption === randomQuestion.answer) {
                await interaction.followUp({ content: `🎉 Correct, **${interaction.user.username}**! The answer was **${randomQuestion.answer}**.` });
            } else {
                await interaction.followUp({ content: `❌ Wrong, **${interaction.user.username}**! The correct answer was **${randomQuestion.answer}**.` });
            }
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                interaction.followUp({ content: `⏰ Time's up! The correct answer was **${randomQuestion.answer}**.` });
            }
        });
	},
};
