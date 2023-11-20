require('dotenv').config({
  path: '.env.development.local',
});

const Doodabot = require('./dooda/core/doodabot.js');
const client = new Doodabot({});
client.build();
