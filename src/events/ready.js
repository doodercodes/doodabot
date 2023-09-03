module.exports = async (client) => {
  console.log(`\r\nSuccessfully logged in as: ${client.user.tag}`.green);
  client.user.setPresence({
    activities: [{ name: `${client.botconfig.Presence.name}` }],
    status: `${client.botconfig.Presence.status}`,
  });
  // client.RegisterSlashCommands();
};
