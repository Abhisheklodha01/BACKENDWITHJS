import { Client, GatewayIntentBits } from 'discord.js'
import rest from './command.js';

const client = new Client({
    intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
    ]
})

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    message.reply({
        content: "Hi from bot"
    })
})

client.on('interactionCreate', (intersection)=> {
    intersection.reply('Pong!!')
})

client.login(TOKEN)