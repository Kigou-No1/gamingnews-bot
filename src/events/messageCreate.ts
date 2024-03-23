import { Message } from "discord.js";
import { fetchNews, parseNews } from "../utils/fetchNews";
import { sortTypes } from "../@types/sortType";

export const MessageCreate = async (message: Message) => {
    if (message.author.bot) return;
    switch (message.content) {
        case "nb!ping":
            message.reply("Pong!");
            break;
        case "nb!manual":
            message.reply({
                embeds: [
                    parseNews((
                        await fetchNews(["automaton-media.com"], sortTypes.PUBLISHED_AT)
                    ))
                ]
            }
            );
            break;
    }
};