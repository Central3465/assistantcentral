require('dotenv').config();
const {REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const commands = [
    {
        name: 'ping',
        description: 'Pong!',
        type: 1,
    },
    {
        name: 'help',
        description: 'Shows all available commands and their functions.',
    },
    {
        name: 'level',
        description: 'Shows your current level.',
    },
    {
        name: 'leaderboard',
        description: "Displays all users's ranks in a leaderboard.",
    },
    {
        name: 'ship',
        description: 'Ships two users.',
        options: [
            {
                name: 'username1',
                description: 'Person 1',
                type: ApplicationCommandOptionType.User,
                required: true,
            },
            {
                name: 'username2',
                description: 'Person 2',
                type: ApplicationCommandOptionType.User,
                required: true,
            },
        ],
    },
    {
        name: 'roast',
        description: 'Roasts a user.',
        options: [
            {
                name: 'victim',
                description: 'The User Being Roasted.',
                type: ApplicationCommandOptionType.User,
                required: true,
            },
        ],
    },
]

const rest = new REST ({ version: '10' }).setToken(process.env.TOKEN);

(async() => {
    try {
        console.log('Registering Slash Commands...');
        
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.
            GUILD_ID),
            { body: commands}
        )

        console.log('Slash Commands Registered Successfully.');
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})();

(async () => {
    try {
        console.log('Registering Slash Commands globally...');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );

        console.log('Slash Commands Registered Successfully.');
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})();