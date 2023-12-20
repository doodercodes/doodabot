class MessageCreateEvent {
  constructor(evt) {
    this.evt = evt;
    this.bot = evt.bot;
  }

  async execute(msg) {
    main(msg, this.bot);
  }
}

async function main(msg, bot) {
  const pfx = getCommandPrefix(bot, msg);
  if (msg.author.bot || msg.channel.type === 'dm') return;
  if (!pfx) return;
  const { cmd, args } = findCommand(bot, msg, pfx);
  if (cmd) {
    checkPerms(bot, cmd, msg);
    cmd.run(msg, args);
  }
}

function getCommandPrefix(bot, msg) {
  const pfx = bot.cfg.prefs.pfx,
    pfxMention = new RegExp(`^<@!?${bot.user.id}> `);
  return msg.content.startsWith(pfx)
    ? pfx
    : msg.content.match(pfxMention)
    ? msg.content.match(pfxMention)[0]
    : null;
}

function findCommand(bot, msg, pfx) {
  const args = msg.content.slice(pfx.length).trim().split(/ +/g),
    cmdName = args.shift().toLowerCase(),
    cmd =
      bot.commands.get(cmdName) ||
      bot.commands.find(
        (x) => x.cmd.aliases && x.cmd.aliases.includes(cmdName)
      );
  return { cmd, args };
}

function checkPerms(bot, cmd, msg) {
  const perms = cmd.permissions;
  if (
    (perms &&
      perms.channel &&
      !msg.channel.permissionsFor(bot.user).has(perms.channel)) ||
    (perms &&
      perms.member &&
      !msg.channel.permissionsFor(msg.member).has(perms.member))
  )
    // return bot.sendError(msg.channel, 'Missing permissions');
    return;
}

module.exports = MessageCreateEvent;
