module.exports = async (client) => {
  // https://discord.com/api/oauth2/authorize?client_id=1131976914458906765&permissions=8&scope=bot%20applications.commands
  const inviteURL = `https://discord.com/oauth2/authorize?client_id=${
    client.user.id
  }&permissions=${
    client.botconfig.Permissions
  }&scope=bot%20${client.botconfig.Scopes.join('%20')}`;

  client.user.inviteURL = inviteURL;

  client.user.setPresence({
    activities: [{ name: `${client.botconfig.Presence.name}` }],
    status: `${client.botconfig.Presence.status}`,
  });

  console.log(
    '\r\nSuccessfully logged in as: '.green +
      `${client.user.tag}\r\n`.cyan.underline
  );
  // client.RegisterSlashCommands();
};
