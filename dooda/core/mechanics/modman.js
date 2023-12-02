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
    const modulesDir = '../../modules/',
      eventsDir = modulesDir + 'events';
    let fullPath, moduleName;
    for (const [root, file] of walkSync(path.join(__dirname, modulesDir))) {
      fullPath = path.join(root, file);
      moduleName = file.split('.')[0];
      if (path.extname(file) !== '.js') continue;
      if (root === path.join(__dirname, eventsDir)) {
        await this.loadEvents(file, fullPath, moduleName);
      } else {
        await this.loadCommands(file, fullPath, moduleName);
      }
    }
  }

  async loadEvents(file, fullPath, moduleName) {
    try {
      const Event = require(fullPath),
        CreateEvent = new DoodabotEvent(this.bot, moduleName),
        event = new Event(CreateEvent);
      if (typeof event.execute !== 'function') {
        this.bot.log.warn(
          `The \`${moduleName}\` event does not have a valid execute method.`
        );
        return;
      }
      if (event.evt.enabled) {
        CreateEvent.execute(event);
        this.bot.log.info(`Loaded the ${moduleName} event.`);
      }
    } catch (err) {
      this.bot.log.error(`Failed to load event in \`${file}\`: ${err}`);
    }
  }

  async loadCommands(file, fullPath, moduleName) {
    try {
      const Command = require(fullPath),
        CreateCommand = new DoodabotCommand(this.bot),
        cmd = new Command(CreateCommand);
      await this.setCommand(cmd, file);
      this.bot.log.info(`Loaded the ${moduleName} command.`);
    } catch (err) {
      this.bot.log.error(`Failed to load command in \`${file}\`: ${err}`);
    }
  }

  async setCommand(command, file) {
    try {
      const { cmd } = command,
        cmdName = cmd.name,
        cmdNameLower = cmdName.toLowerCase();
      if (cmdName && cmd.run) {
        this.bot.commands.set(cmdNameLower, command);
        this.commands[cmdNameLower] = cmd;
      }
    } catch (err) {
      this.bot.log.error(`Cannot set command in \`${file}\`: ${err}`);
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
