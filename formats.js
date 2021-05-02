const winston = require('winston')

/**
 * Winston by default doesn't support printing javascript
 * error object. This function configures winston to print
 * javascript objects
 * Reference: https://github.com/winstonjs/winston/issues/1338#issuecomment-403289827
 * @type {any}
 */
const print = winston.format.printf((info, op) => {
  Object.keys(info).forEach(eachKey => {
    if (info[eachKey] instanceof Error) {
      info.stack = info[eachKey].stack;
      info.error = info[eachKey].message;
    }
    else if (info[eachKey] && info[eachKey].constructor.name === 'Object') {
      info[eachKey] = JSON.stringify(info[eachKey]);
    }
  });
  return JSON.stringify(info);
});

module.exports = {
  print
};