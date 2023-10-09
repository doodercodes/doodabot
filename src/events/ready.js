module.exports = async (client) => {
  client.user.inviteURL = `https://discord.com/oauth2/authorize?client_id=${
    client.user.id
  }&permissions=${
    client.botconfig.Permissions
  }&scope=bot%20${client.botconfig.Scopes.join('%20')}`;

  client.user.setPresence({
    activities: [{ name: `${client.botconfig.Presence.name}` }],
    status: `${client.botconfig.Presence.status}`,
  });

  client.application.commands.create({
    name: 'help',
    description: 'help',
  });

  console.log(
    '\r\nSuccessfully logged in as: '.green +
      `${client.user.tag}\r\n`.cyan.underline
  );
};
