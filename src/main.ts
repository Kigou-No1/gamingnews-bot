import { Client, Colors, EmbedBuilder, Events, IntentsBitField } from "discord.js"
import dotenv from "dotenv"
import { fetchNews } from "./utils/fetchNews"
import { sortTypes } from "./@types/sortType"
import { validateEnv } from "./utils/validateEnv"

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
    ]
})

client.once(Events.ClientReady, async () => {
    console.log(`I am ${client.user?.username} and ready!`)
    setInterval(async () => {
        const news = await fetchNews(["automaton-media.com"], sortTypes.PUBLISHED_AT)

        let description = ""
        let counter = 0
        for (const article of news.articles) {
            description += `[${article.title}](${article.url})\n`
            counter++
            if (counter >= 30) {
                break
            }
        }

        const embed = new EmbedBuilder()
            .setTitle("本日のゲームニュース")
            .setDescription(description)
            .setTimestamp(new Date())
            .setColor(Colors.Purple)
            .setFooter({
                text: "From Automaton Media",
            })
        const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID!)
        if (channel) {
            if (channel.isTextBased()) {
                await channel.send({ embeds: [embed] })
            }
        }
    }, 60 * 60 * 1000)
})

client.login(process.env.DISCORD_TOKEN)
