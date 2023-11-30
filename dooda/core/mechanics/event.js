class DoodabotEvent {
  constructor(bot, event) {
    this.bot = bot;
    this.enabled = true;
    this.event = event;
  }

  main(event) {
    this.bot.on(this.event, event.execute.bind(event));
  }
}

module.exports = DoodabotEvent;
