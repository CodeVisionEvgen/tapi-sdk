import axios, { AxiosInstance } from "axios";
import {
  TapiBasicResponse,
  TapiPaginationResponse,
  TapiResponseType,
} from "./types/index.types";
import {
  Following,
  Follower,
  UserLastTweetsResponse,
  User,
} from "./types/user.types";
import { Tweet } from "./types/tweet.types";

export class TapiUser {
  private readonly apiKey: string;
  private readonly BASE_URL = "https://api.twitterapi.io/twitter/user";
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
    return this.client.get<TapiPaginationResponse & { followers: Follower[] }>(
      "/followers",
      {
        params: {
          userName,
          cursor,
        },
      }
    );
  }

  /**
   * Get user followings. Each page returns exactly 200 followings. Use cursor for pagination.
   */
  getUserFollowings({
    userName,
    cursor,
  }: {
    userName: string;
    cursor?: string;
  }) {
    return this.client.get<
      TapiPaginationResponse & { followings: Following[] }
    >("/followings", {
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
      TapiPaginationResponse & TapiResponseType<UserLastTweetsResponse>
    >("/last_tweets", {
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
    return this.client.get<TapiResponseType<User | null>>("/info", {
      params: {
        userName,
      },
    });
  }

  /**
   * Batch get user info by user ids. Pricing:
   * Single user request: 18 credits per user
   * Bulk request (100+ users): 10 credits per user
   * Note: For cost optimization, we recommend batching requests when fetching multiple user profiles.
   */
  batchGetUserInfoByUserIds(userIds: number[] | string[]) {
    return this.client.get<TapiBasicResponse & { users: User[] }>(
      "/batch_info_by_ids",
      {
        params: { userIds: userIds.join(",") },
      }
    );
  }

  /**
   * get tweet mentions by user screen name. Each page returns exactly 20 mentions. Use cursor for pagination. Order by mention time desc
   */
  getUserMentions({
    userName,
    sinceTime,
    untilTime,
    cursor,
  }: {
    userName: string;
    sinceTime?: number | string;
    untilTime?: number | string;
    cursor?: string;
  }) {
    return this.client.get<TapiPaginationResponse & { tweets: Tweet[] }>(
      "/mentions",
      {
        params: {
          userName,
          sinceTime,
          untilTime,
          cursor,
        },
      }
    );
  }
}
