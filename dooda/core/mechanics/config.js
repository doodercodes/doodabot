const { GatewayIntentBits, Partials } = require('discord.js');

class DiscordConfig {
  /*
      Discord client configuration data
  */
  constructor() {
    this.scopes = ['applications.commands', 'bot'];
    this.permissions = 28445567545079;
    this.partials = [Partials.Message, Partials.Channel, Partials.Reaction];
    this.intents = [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.MessageContent,
    ];
    this.token = process.env.TOKEN;
    this.secret = process.env.CLIENT_SECRET;
  }
}

class PreferencesConfig {
  /*
      Bot personalization preferences and settings
  */
  constructor() {
    this.pfx = ';';
    this.site = undefined;
    this.support = 'https://discord.gg/7apt6W8pRP';
    this.presence = {
      status: 'dnd',
      type: 'PLAYING',
      name: 'with bot codes',
    };
    this.dev_mode = false;
    this.syslog_channel = undefined;
    this.errorlog_channel = undefined;
  }
}

class DatabaseConfig {
  /*
      MySQL connection configuration
  */
  constructor() {
    this.database = process.env.MYSQL_DB;
    this.user = process.env.MYSQL_USER;
    this.password = process.env.MYSQL_PW;
    this.host = process.env.MYSQL_HOST;
    this.port = process.env.MYSQL_PORT;
  }
}

class Configuration {
  constructor() {
    this.dsc = new DiscordConfig();
    this.db = new DatabaseConfig();
    this.prefs = new PreferencesConfig();
  }
}

module.exports = Configuration;
