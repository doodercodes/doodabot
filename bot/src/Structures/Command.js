class Command {
  constructor(name, desc, usage, perms, aliases) {
    this.name = name;
    this.desc = desc;
    this.usage = usage;
    this.perms = perms;
    this.aliases = aliases;
  }
  async run(client, message, args) {
    // Implement the command logic in the derived classes
  }
}

module.exports = Command;
