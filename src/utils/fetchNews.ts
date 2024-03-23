import * as axios from "axios"
import { sortTypes } from "../@types/sortType"
import { newsApiResponse } from "../@types/newsApiResponse"
import dotenv from "dotenv"

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
