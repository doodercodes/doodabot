class InteractionCreateEvent {
  constructor(evt) {
    this.evt = evt;
    this.bot = evt.bot;
  }

  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    const { commandName } = interaction;
    if (commandName === 'ping') interaction.reply('pong');
  }
}

module.exports = InteractionCreateEvent;
