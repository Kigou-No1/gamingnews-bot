export type newsArticle = {
    source: {
        id: string | null,
        name: string,
    },
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string,
}

export type newsApiResponse = {
    status: string,
    totalResults: number,
    articles: newsArticle[]
}
