const { GatewayIntentBits, Partials } = require('discord.js');
module.exports = {
  DefaultPrefix: ';',
  SupportServer: 'https://discord.gg/7apt6W8pRP',
  Website: undefined,
  Theme: {
    main: { 0: '#deb887', 1: '#e9d0af', 2: '#deb' },
  },
  Presence: {
    status: 'dnd', // You can show online, idle, and dnd
    type: 'PLAYING', // PLAYING, WATCHING, LISTENING, STREAMING
    name: 'with bot codes', // The message shown
  },
  APP: {
    ADMINS: [{ name: 'doodercodes', userID: '1028024502891843667' }],
    TOKEN: process.env.TOKEN,
    SECRET: process.env.CLIENT_SECRET,
  },
  Scopes: ['applications.commands', 'bot'],
  Permissions: 28445567545079, // Bot Inviting Permissions
  Partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  Intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.MessageContent,
  ],
};
