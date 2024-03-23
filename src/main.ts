import { Client, Events, IntentsBitField } from "discord.js"
import dotenv from "dotenv"
import { fetchNews, parseNews } from "./utils/fetchNews"
import { sortTypes } from "./@types/sortType"
import { validateEnv } from "./utils/validateEnv"
import { MessageCreate } from "./events/messageCreate"

dotenv.config()

try {
    validateEnv(process.env)
} catch (e) {
    console.error(e)
    process.exit(1)
}

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})

client.once(Events.ClientReady, async () => {
    console.log(`I am ${client.user?.username} and ready!`)
    setInterval(async () => {
        const news = await fetchNews(["automaton-media.com"], sortTypes.PUBLISHED_AT)
        const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID!)
        if (channel) {
            if (channel.isTextBased()) {
                await channel.send({ embeds: [parseNews(news)] })
            }
        }
    }, 60 * 60 * 1000)
})

client.addListener(Events.MessageCreate, MessageCreate)

client.login(process.env.DISCORD_TOKEN)
