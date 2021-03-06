/**
 * @description holds server main
 */
import { DebugLogUtil } from '@open-template-hub/common';
import dotenv from 'dotenv';
import * as Discord from 'discord.js';
import axios from 'axios';

const debugLogUtil = new DebugLogUtil();

// use .env file
const env = dotenv.config();
debugLogUtil.log(env.parsed);

const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
  ],
  partials: ['MESSAGE', 'CHANNEL'],
});

client.once('ready', () => {
  console.log('Ready!');
});

client.on('messageCreate', (message) => {
  if (message.author.id === client.user?.id) return;

  if (
    message.content &&
    message.content.length > 0 &&
    message.content.startsWith('!Gitlift')
  ) {
    const msg = message.content.split(' ')[1];

    if (msg) {
      const url = process.env.GITLIFT_BL_SERVER_URL + '?username=' + msg;

      axios
        .get<any>(url)
        .then((res: any) => {
          if (res.data.coreInformation.name) {
            const reply =
              'Name: ' +
              res.data.coreInformation.name +
              '\n' +
              'Total Contributions: ' +
              res.data.contribution.totalContributionsCount +
              '\n' +
              'For more information about this user, you can check the Gitlift Profile: ' +
              'https://gitlift.com/user/' +
              msg;

            message.reply(reply);
          } else {
            message.reply('I can not tell much about it..');
          }
        })
        .catch((e) => {
          console.log(e);
          message.reply('I can not tell much about it..');
        });
    }
  }
});

client.login(process.env.CLIENT_TOKEN);
