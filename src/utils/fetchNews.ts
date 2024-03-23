import * as axios from "axios"
import { sortTypes } from "../@types/sortType"
import { newsApiResponse } from "../@types/newsApiResponse"
import dotenv from "dotenv"
import { Colors, EmbedBuilder } from "discord.js"

dotenv.config()

export const fetchNews = async (domains: string[], sortBy: sortTypes) => {
    const client = axios.default.create({
        baseURL: "https://newsapi.org/v2",
        headers: {
            "X-Api-Key": process.env.NEWS_API_KEY!,
        },
        params: {
            // "q": query,
            "domains": domains.join(","),
            "sortBy": sortBy,
        }
    })

    const response = await client.get("/everything")
    if (response.status !== 200) {
        throw new Error(`Failed to fetch news (${response.status})`)
    } else {
        return response.data as newsApiResponse
    }
}

export const parseNews = (news: newsApiResponse) => {
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

    return embed
}