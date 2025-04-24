import axios, { AxiosInstance } from "axios";
import { TapiBasicResponse, TapiPaginationResponse } from "./types/index.types";
import { Tweet } from "./types/tweet.types";

export class TapiTweets {
  private readonly apiKey: string;
  private readonly BASE_URL = "https://api.twitterapi.io/twitter/tweets";
  private readonly client: AxiosInstance;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: this.BASE_URL,
      headers: {
        "X-API-Key": this.apiKey,
      },
    });
  }

  getTweetsByIds(tweet_ids: string[] | number[]) {
    return this.client.get<TapiBasicResponse & { tweets: Tweet[] }>("/", {
      params: {
        tweet_ids,
      },
    });
  }

  getTweetQuotations({
    tweetId,
    sinceTime,
    untilTine,
    cursor,
    includeReplies,
  }: {
    tweetId: string | number;
    sinceTime: number | string;
    untilTine: string | number;
    cursor: string;
    includeReplies: boolean;
  }) {
    return this.client.get<
      TapiPaginationResponse & TapiBasicResponse & { tweets: Tweet[] }
    >("/tweet/quotes", {
      params: {
        cursor,
        untilTine,
        tweetId,
        sinceTime,
        includeReplies,
      },
    });
  }

  advancedSearch({
    query,
    queryType,
    cursor,
  }: {
    cursor: string;
    query: string;
    queryType: "Latest" | "Top";
  }) {
    const localClient = axios.create({
      ...this.client.defaults,
      baseURL: "https://api.twitterapi.io/twitter/tweet",
    });

    return localClient.get<
      TapiPaginationResponse & TapiBasicResponse & { tweets: Tweet[] }
    >("/advanced_search", {
      params: {
        cursor,
        query,
        queryType,
      },
    });
  }

  getTweetReplies({
    tweetId,
    sinceTime,
    untilTine,
    cursor,
  }: {
    tweetId: string | number;
    sinceTime: number | string;
    untilTine: string | number;
    cursor: string;
  }) {
    return this.client.get<
      TapiPaginationResponse & TapiBasicResponse & { replies: Tweet[] }
    >("/tweet/replies", {
      params: {
        cursor,
        untilTine,
        tweetId,
        sinceTime,
      },
    });
  }
}
