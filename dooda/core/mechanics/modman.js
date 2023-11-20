const fs = require('fs');
const path = require('path');
const Logger = require('./logger');

class ModuleManager {
  constructor(bot) {
    this.bot = bot;
    this.log = new Logger();
    this.commands = {};
    this.events = {};

    this.loadAllModules();
  }

  loadAllModules() {
    const dir = path.join(__dirname, '../../modules/');
    for (const [root, _dirs, files] of walkSync(dir)) {
      for (const file of files) {
        const filePath = path.join(root, file);
        if (!filePath.endsWith('.js')) continue;
        let moduleName = file.split('.')[0];
        try {
          const ModuleClass = require(filePath);
          const module = new ModuleClass(this.bot);
          this.loadModule(filePath, module);
        } catch (err) {
          this.log.error(`Failed to load module ${file}: ${err.message}`);
        }
      }
    }
  }

  loadModule(root, module) {
    try {
      if (module.name && module.run) {
        const { name, type } = module;
        const nameToLower = name.toLowerCase();
        if (type === 'command') {
          this.bot.commands.set(nameToLower, module);
          this.commands[nameToLower] = module;
          this.log.info(`Loading the ${name} module.`);
        }
        if (type === 'event') {
          this.log.info(`Loading the ${name} event.`);
        }
      } else {
        throw new Error();
      }
    } catch (err) {
      this.log.error(`Invalid module structure in: ${root}: ${err.message}`);
    }
  }
}

function* walkSync(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const pathToFile = path.join(dir, file);
    const isDirectory = fs.statSync(pathToFile).isDirectory();

    if (isDirectory) yield* walkSync(pathToFile);
    else yield [dir, files, files];
  }
}

module.exports = ModuleManager;
