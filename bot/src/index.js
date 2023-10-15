require('dotenv').config({
  path: '.env.development.local',
});
require('colors');
require('../../backend/index');
const { Intents, Partials } = require('../botconfig');
const { Doodabot } = require('./Structures/Doodabot');

const client = new Doodabot({
  intents: Intents,
  partials: Partials,
});

client.build();
