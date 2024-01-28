require("dotenv").config();
const { Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, Role, ButtonBuilder, ButtonStyle } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const roles = [
    {
        id: '1193665948826214521',
        label: 'Green',
    },
    {
        id: '1193666369695252600',
        label: 'Yellow',
    },
    {
        id: '1193666405158101154',
        label: 'Purple',
    },
]

client.on("ready", async (c) => {
  try {
    const channel = await client.channels.cache.get('1193293606199509014');
    if (!channel) return;

    const row = new ActionRowBuilder();

    roles.forEach((role) => {
        row.components.push(
            new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
        )
    })

    await channel.send({
        content: 'Claim or Remove a role below.',
        components: [row]
    });
    process.exit()
  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.token);
