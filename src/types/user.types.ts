import { Tweet } from "./tweet.types";

export type User = {
  id: string;
  name: string;
  userName: string;
  location: string;
  url: string;
  description: string;
  protected: boolean;
  isVerified: boolean;
  isBlueVerified: boolean;
  followers: number;
  following: number;
  favouritesCount: number;
  statusesCount: number;
  mediaCount: number;
  createdAt: string;
  coverPicture: string;
  profilePicture: string;
  canDm: boolean;
  isAutomated: boolean;
  automatedBy: string | null;
};

export type UserLastTweetsResponse = {
  pin_tweet: Tweet | null;
  tweets: Tweet[];
};

export type Follower = {
  id: string;
  name: string;
  screen_name: string;
  location: string;
  url: string | null;
  description: string;
  email: string | null;
  protected: boolean;
  verified: boolean;
  followers_count: number;
  following_count: number;
  friends_count: number;
  favourites_count: number;
  statuses_count: number;
  media_tweets_count: number;
  created_at: string;
  profile_banner_url: string | null;
  profile_image_url_https: string;
  can_dm: boolean;
};

export type Following = {
  id: string;
  name: string;
  screen_name: string;
  location: string | null;
  url: string | null;
  description: string;
  email: string | null;
  protected: boolean;
  verified: boolean;
  followers_count: number;
  following_count: number;
  friends_count: number;
  favourites_count: number;
  statuses_count: number;
  media_tweets_count: number;
  created_at: string;
  profile_banner_url: string;
  profile_image_url_https: string;
  can_dm: boolean;
};
