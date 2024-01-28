require("dotenv").config();
const {
  Client,
  IntentsBitField,
  EmbedBuilder,
  ActivityType,
  MessageEmbed,
  Embed,
} = require("discord.js");
const canvacord = require("canvacord");
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const status = [
  { name: "Assistant Central", type: ActivityType.Playing },
  // Add other status options as needed
];

const userLevels = new Map()

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online!`);

  client.user.setActivity({
    name: `${status[0].name}, for help use /help.`,
    type: ActivityType.Playing,
  });
});

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }

  const lowerContent = message.content.toLowerCase();
  if (lowerContent === "hello") {
    message.reply("Hello! How are you?");
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    const pingLatency = Math.round(interaction.client.ws.ping);
    interaction.reply(`🏓 Pong! Latency is ${pingLatency}ms.`);
  }

  if (interaction.commandName === "help") {
    const helpEmbed = new EmbedBuilder()
      .setTitle("Assistant Central Commands")
      .setDescription("All the available commands and their functions.")
      .setColor("Red")
      .addFields(
        { name: "Ping", value: "Shows your current ping latency." },
        { name: "Level", value: "Shows you your current level.", inline: true },
        {
          name: "Leaderboard",
          value: "Shows all the users levels.",
          inline: true,
        },
        { name: "Ship", value: "Ships two people together.", inline: true },
        { name: "Roast", value: "Cook somebody up.", inline: true }
      );

    interaction.reply({ embeds: [helpEmbed] });
  }

  if (interaction.commandName === "level") {
    const userLevel = userLevels(interaction.user.id) || 0;
    const xp =  await (interaction.user.id);
    const userXP = xp.get(interaction.user.id) || 0;

    const nextLevel = Math.floor(0.1 * Math.pow(userLevel + 1, 2));
    const progress = userXP / nextLevel;

    const emoji = ["💤", "❤️", "🧠"];
    const levelEmoji = emoji[Math.floor(progress * emoji.length)];

    // Creating an example embed
    const levelEmbed = new MessageEmbed()
      .setColor("BLUE")
      .setTitle(`${interaction.user.username}'s Level Statistics`)
      .addField('Level:', userLevel, true)
      .addField('XP:', userXP, true)
      .addField('Next Level:', nextLevel, true)
      .addField('Progress:', `${(progress * 100).toFixed(2)}%`, true)
      .addField('Level Emoji:', levelEmoji, true);

    // Send the embed
    interaction.reply({ embeds: [levelEmbed] });
  }
  
  if (interaction.commandName === "leaderboard") {
    // Get the top 10 users by level
    const topUsers = [...userLevels.entries()]
      .sort(([, levelA], [, levelB]) => levelB - levelA)
      .slice(0, 10);

    // Create the leaderboard embed
    const leaderboardEmbed = new EmbedBuilder()
      .setTitle("Leaderboard")
      .setDescription("The top 10 users by level.")
      .setColor("Red")
      .addFields({ name: "🥇 xCentral", value: "Level -inf" });

    interaction.reply({ embeds: [leaderboardEmbed] });
  }

  if (interaction.commandName === "ship") {
    const person1 = interaction.options.getUser("username1");
    const person2 = interaction.options.getUser("username2");

    // Generate a random percentage between 0 and 100
    const relationshipPercentage = Math.floor(Math.random() * 101);

    interaction.reply(
      `${person1} and ${person2} have a ${relationshipPercentage}% relationship together! 💏`
    );
  }

  if (interaction.commandName === "roast") {
    const roastedPerson = interaction.options.getUser("victim");

    // Array of random roasts
    const roasts = [
      `${roastedPerson}, you're so ugly, when your mom dropped you off at school, she got a fine for littering.`,
      `${roastedPerson}, if you were any dumber, people would have to water you twice a week.`,
      `${roastedPerson}, I would agree with you but then we’d both be wrong.`,
      // Add more roasts as needed
    ];

    // Generate a random index for the array
    const randomIndex = Math.floor(Math.random() * roasts.length);
    const randomRoast = roasts[randomIndex];

    interaction.reply(`${randomRoast}`);
  }
},
// Example function to handle leveling up
function levelUp(userId) {
  const currentLevel = userLevels.get(userId) || 0;
  const newLevel = currentLevel + 1;
  userLevels.set(userId, newLevel);
},

client.on("messageCreate", (message) => {
  if (message.content === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("AI Support Under Development")
      .setDescription(
        "Our AI Support System is still under development. Please come back later."
      )
      .setColor("Random");
    //.addFields({ name: 'Field Title', value: 'Random Value', inline: true})
    //.addFields({ name: 'Second Field Title, value: 'Random Value', inline: true})

    message.channel.send({ embeds: [embed] });
  }
}))

setInterval(() => {
  let random = Math.floor(Math.random() * status.length);
  client.user.setActivity(status[random]);
}, 10000);

client.login(process.env.token)
