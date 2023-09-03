require('dotenv').config();
require('colors');
const { Doodabot, GatewayIntentBits } = require('./src/Structures/doodabot');

const client = new Doodabot({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.MessageContent,
  ],
  // partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.build();
