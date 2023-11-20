const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, colorize, simple } = format;

class Logger {
  constructor() {
    this.timestamp = true;
    this.logger = createLogger({
      level: '',
      format: combine(
        simple()
        // format.timestamp(),
      ),
      transports: [
        new transports.Console({
          format: format.combine(timestamp(), colorize(), simple()),
        }),
        new transports.File({
          filename: './log/example.log',
          format: this.getFileFormat(),
        }),
      ],
    });
  }
  getFileFormat() {
    if (this.timestamp) {
      return combine(timestamp(), simple());
    } else {
      return simple();
    }
  }

  info(msg, timestamp) {
    this.timestamp = timestamp;
    this.logger.info(msg);
  }

  debug(msg) {
    return this.logger.debug(msg);
  }

  error(msg) {
    this.timestamp = true;
    return this.logger.error(msg);
  }

  warn(msg) {
    return this.logger.warn(msg);
  }
}

module.exports = Logger;
