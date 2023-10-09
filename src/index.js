require('dotenv').config();
require('colors');
const { Intents, Partials } = require('./botconfig');
const { Doodabot } = require('./Structures/Doodabot');

const client = new Doodabot({
  intents: Intents,
  partials: Partials,
});

client.build();
