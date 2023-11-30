class ReadyEvent {
  constructor(evt) {
    this.evt = evt;
    this.bot = evt.bot;
  }
  async execute() {
    this.bot.log.info(`Successfully logged in as ${this.bot.user.username}.`);
  }
}

module.exports = ReadyEvent;
