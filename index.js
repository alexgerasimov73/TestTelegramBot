var TelegramBot = require('node-telegram-bot-api');
var exec = require('child_process').exec;
var fs = require('fs');

var token = '1389077909:AAEJwra7Y_Iyza2mL3VXax1v6beUPQYZV6c';
var bot = new TelegramBot(token, { polling: true });

bot.onText(/del (.+)/, function (message, match) {
  var fromId = message.from.id;
  exec('del ' + match[1]);
  bot.sendMessage(fromId, `File ${match[1]} removed`);
});

bot.onText(/copy (.+) (.+)/, function (message, match) {
  var fromId = message.from.id;
  exec('copy ' + match[1] + ' ' + match[2]);
  bot.sendMessage(fromId, `File ${match[1]} copied into ${match[2]}`);
});

bot.onText(/list (.+)/, function (message, match) {
  var fromId = message.from.id;
  fs.readdir(match[1], function (err, files) {
    if (err) bot.sendMessage(fromId, 'This folder hadn`t been found');

    var list = '';
    files.forEach(function (file) {
      list += file + '\n';
    });

    bot.sendMessage(fromId, list);
  });
});
