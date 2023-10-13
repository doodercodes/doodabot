require('dotenv').config();
require('colors');
require('../../backend/index');
const { Intents, Partials } = require('../botconfig');
const { Doodabot } = require('./Structures/Doodabot');

const client = new Doodabot({
  intents: Intents,
  partials: Partials,
});

client.build();
