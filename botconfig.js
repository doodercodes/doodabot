module.exports = {
  Admins: [`${process.env.Admin1}`], // Bot admins - ['usedID']
  DefaultPrefix: '!',
  Permissions: 8, // Bot Inviting Permissions
  Scopes: ['applications.commands'],
  Website: process.env.Website,
  SupportServer: undefined,
  Theme: {
    main: { 0: '#deb887', 1: '#e9d0af', 2: '#deb' },
  },
  Presence: {
    status: 'dnd', // You can show online, idle, and dnd
    type: 'PLAYING', // PLAYING, WATCHING, LISTENING, STREAMING
    name: 'with bot codes', // The message shown
  },
};
