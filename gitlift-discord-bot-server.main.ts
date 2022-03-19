/**
 * @description holds server main
 */
import { DebugLogUtil, UsageUtil } from '@open-template-hub/common';
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

  if (message.content && message.content.length > 0) {
    const url =
      process.env.GITLIFT_BL_SERVER_URL + '?username=' + message.content;

    axios
      .get<any>(url)
      .then((res: any) => {
        console.log(res);
        const reply =
          'Name: ' +
          res.data.coreInformation.name +
          '\n' +
          'Total Contributions: ' +
          res.data.contribution.totalContributionsCount;
        message.reply(reply);
      })
      .catch((e) => {
        console.log(e);
        message.reply('I can not anything tell about him..');
      });
  }
});

client.login(process.env.CLIENT_TOKEN);
