const DoodabotCommand = require('./command');
const DoodabotEvent = require('./event');
const fs = require('fs');
const path = require('path');

class ModuleManager {
  constructor(bot) {
    this.bot = bot;
    this.commands = {};

    this.loadAllModules();
  }

  async loadAllModules() {
    const modulesDir = '../../modules/';
    const eventsDir = modulesDir + 'events';

    for (const [root, file] of walkSync(path.join(__dirname, modulesDir))) {
      const fullPath = path.join(root, file);
      const moduleName = file.split('.')[0];
      if (path.extname(file) !== '.js') continue;
      if (root === path.join(__dirname, eventsDir))
        await this.loadEvents(file, fullPath, moduleName);
      else await this.loadCommands(file, fullPath);
    }
  }

  async loadEvents(file, fullPath, moduleName) {
    try {
      const Event = require(fullPath);
      const CreateEvent = new DoodabotEvent(this.bot, moduleName);
      const event = new Event(CreateEvent);

      if (typeof event.execute !== 'function') {
        this.bot.log.warn(
          `The '${moduleName}' event does not have a valid execute method.`
        );
        return;
      }
      if (event.evt.enabled) {
        CreateEvent.execute(event);
        this.bot.log.info(`Loaded the '${moduleName}' event.`);
      }
    } catch (err) {
      this.bot.log.error(`Failed to load event in '${file}': ${err}`);
    }
  }

  async loadCommands(file, fullPath) {
    try {
      const Command = require(fullPath);
      const CreateCommand = new DoodabotCommand(this.bot);
      const command = new Command(CreateCommand);
      let { name, type, desc } = command.cmd;
      name = name.toLowerCase();
      type = type.toLowerCase();

      if (name !== '') {
        if (typeof command.run === 'function') {
          this.bot.cmds.set(name, command);
          this.commands[name] = command;
          this.bot.log.info(`Loaded the '${name}' text command.`);
        }
      }
    } catch (err) {
      this.bot.log.error(`Failed to load command in '${file}': ${err}`);
    }
  }
}

function* walkSync(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const pathToFile = path.join(dir, file),
      isDirectory = fs.statSync(pathToFile).isDirectory();
    if (isDirectory) {
      yield* walkSync(pathToFile);
    } else {
      yield [dir, file];
    }
  }
}

module.exports = ModuleManager;
