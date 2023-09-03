module.exports = {
  Admins: [`${process.env.Admin1}`], // Bot admins - ['usedID']
  DefaultPrefix: '!',
  Permissions: undefined, // Bot Inviting Permissions
  Website: process.env.Website,
  Theme: {
    main: { 0: '#deb887', 1: '#e9d0af', 2: '#deb' },
  },
  Presence: {
    status: 'dnd', // You can show online, idle, and dnd
    type: 'PLAYING', // PLAYING, WATCHING, LISTENING, STREAMING
    name: 'with bot codes', // The message shown
  },
};
