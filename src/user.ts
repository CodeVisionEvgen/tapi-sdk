import axios, { AxiosInstance } from "axios";
import { TapiPaginationResponse, TapiResponseType } from "./types/index.types";
import {
  TapiFollower,
  TapiUserLastTweetsResponse,
  TapiUserResponse,
} from "./types/user.types";

export class TapiUser {
  private readonly apiKey: string;
  private readonly BASE_URL = "https://api.twitterapi.io/twitter";
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

  /**
   * Get user followers in reverse chronological order (newest first). Returns exactly 200 followers per page, sorted by follow date. Most recent followers appear on the first page. Use cursor for pagination through the complete followers list.
   */
  getUserFollowers({
    userName,
    cursor,
  }: {
    userName: string;
    cursor?: string;
  }) {
    return this.client.get<
      TapiPaginationResponse & { followers: TapiFollower[] }
    >("/user/followers", {
      params: {
        userName,
        cursor,
      },
    });
  }

  /**
   * @typedef {Object} ParamsById
   * @property {string} userId - User ID to fetch tweets for
   * @property {undefined} [userName] - Not allowed when userId is provided
   * @property {string} cursor - Cursor for pagination
   */

  /**
   * @typedef {Object} ParamsByName
   * @property {string} userName - User name to fetch tweets for
   * @property {undefined} [userId] - Not allowed when userName is provided
   * @property {string} cursor - Cursor for pagination
   */

  /**
   * Get the latest tweets by user ID or user name.
   * Either `userId` or `userName` must be provided, not both.
   *
   * @param {ParamsById | ParamsByName} params - Parameters for tweet retrieval
   */
  getUserLastTweets({
    userId,
    userName,
    cursor,
  }:
    | { userId: string; userName?: undefined; cursor?: string }
    | { userId?: undefined; userName: string; cursor?: string }) {
    return this.client.get<
      TapiPaginationResponse & TapiResponseType<TapiUserLastTweetsResponse>
    >("/user/last_tweets", {
      params: {
        userId,
        userName,
        cursor,
      },
    });
  }

  /**
   * Get user info
   * @param username The screen name of the user
   */
  getUserInfo(userName: string) {
    return this.client.get<TapiResponseType<TapiUserResponse | null>>(
      "/user/info",
      {
        params: {
          userName,
        },
      }
    );
  }

  /**
   * Batch get user info by user ids. Pricing:
   * Single user request: 18 credits per user
   * Bulk request (100+ users): 10 credits per user
   * Note: For cost optimization, we recommend batching requests when fetching multiple user profiles.
   */
  batchGetUserInfoByUserIds(userIds: number[] | string[]) {
    return this.client.get("/user/batch_info_by_ids", {
      params: { userIds: userIds.join(",") },
    });
  }
}
