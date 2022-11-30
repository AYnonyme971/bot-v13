const fs = require('fs');

const { Client, Collection } = require('discord.js');
const { prefix, token } = require('./config');
const bot = new Client({ intents: [3276799]});
const keepAlive = require('./server');
bot.commands = new Collection();
const commandsFile = fs.readdirSync('./commandes/');

for (const file of commandsFile) {
  const command = require(`./commandes/${file}`);
  bot.commands.set(command.name, command);
  console.log(`Commande prête : ${command.name}`)
}
bot.on('ready', () => {
  console.log(`Connecté en tant que ${bot.user.tag}`);
  bot.user.setPresence({ activities: [{ name: `${prefix}help | ${bot.user.username}` }], status: 'online' });
});

bot.on('messageCreate', message => {
  const args = message.content.slice(prefix.length).split("/ +/");
  const commande = args.shift().toLowerCase();

  if(!bot.commands.has(commande)) return;
  bot.commands.get(commande).run(bot, message, args);
  let {guild} = message;
});
keepAlive();
bot.login(token);
