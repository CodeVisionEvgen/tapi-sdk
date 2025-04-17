import { TapiTweets } from "./tweets";
import { TapiUser } from "./user";

export class TapiSDK {
  private readonly apiKey: string;
  User: TapiUser;
  Tweets: TapiTweets;
  /**
   * All API requests must include the x-api-key header for authentication.
   * https://docs.twitterapi.io/authentication
   * @param apiKey X-API-Key
   */
  constructor({ apiKey }: { apiKey: string }) {
    this.apiKey = apiKey;
    this.User = new TapiUser(this.apiKey);
    this.Tweets = new TapiTweets(this.apiKey);
  }
}
