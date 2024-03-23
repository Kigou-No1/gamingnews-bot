export const validateEnv = (env: NodeJS.ProcessEnv) => {
    if (!env.DISCORD_TOKEN) {
        throw new Error("DISCORD_TOKEN is not defined")
    }
    if (!env.DISCORD_CHANNEL_ID) {
        throw new Error("DISCORD_CHANNEL_ID is not defined")
    }
    if (!env.APIKEY) {
        throw new Error("NEWS_API_KEY is not defined")
    }
}
