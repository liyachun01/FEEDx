import { Feed } from "store/mst/feedx-store/feed.model";
import { PublicProfile } from "store/mst/feedx-store/public-profile.model";
import { AbstractApiService } from "../abstract-api-service.interface";

// MISC
// ====================================================================
export type AbstractApiActionPayload = Record<string, any>;
export type AbstractApiActionResult = Record<string, any> | null | undefined;

export type Nullable<T> = T | null | undefined;

/**
 * All possible api actions here
 *
 * @export
 * @enum {string}
 */
export enum ApiServiceActionToken {
  CREATE_SESSION = "createSession",
  RENEW_SESSION = "renewSession",
  DESTROY_SESSION = "destroySession",

  FETCH_PROFILE = "fetchProfile",
  UPDATE_PROFILE = "updateProfile",

  FETCH_FEEDS = "fetchFeeds",
  FETCH_FEED_DETAIL = "fetchFeedDetail",
}

/**
 * The action type generator
 *
 */
export declare type AbstractApiActionType<
  P extends AbstractApiActionPayload,
  R extends AbstractApiActionResult
> = (ctx: AbstractApiService<any, any>, payload: P) => Promise<R>;

// Realife implementations of:
// - AbstractApiActionPayload
// - Nullable
// ====================================================================

// Create session
// type AuthType = "login" | "register" | "github";
export type AuthType = "login" | "register"; // end user friendly type name, shown on the page
export type RealAuthType = "local" | "registration"; // reall type name for background
export function getRealAuthenticationType(type: AuthType) {
  const dict: Record<AuthType, RealAuthType> = {
    login: "local",
    register: "registration",
  };
  return dict[type];
}
export type CreateSessionPayload<T = AuthType> = T extends "login"
  ? {
      type: T;
      identifier: string;
      password: string;
    }
  : T extends "register"
  ? {
      type: T;
      name: string;
      email: string;
      password: string;
    }
  : never;
export type CreateSessionResult = Nullable<PublicProfile>;

// Renew session
export interface RenewSessionPayload extends AbstractApiActionPayload {
  identifier: string;
  password: string;
}
export type RenewSessionResult = Nullable<PublicProfile>;

// Delete session
// export interface DeleteSessionPayload extends AbstractApiActionPayload {}
export type DeleteSessionPayload = undefined;
export type DeleteSessionResult = Nullable<{ destroyed: true }>;

// Fetch profile (user private scope)
export interface FetchProfilePayload extends AbstractApiActionPayload {
  votes?: boolean;
  posts?: boolean;
}
export type FetchProfileResult = Nullable<
  PublicProfile & {
    votes?: string[];
    posts?: string[];
  }
>;

// Fetch feeds (with pagination)
export interface FetchFeedsPayload extends AbstractApiActionPayload {
  pageSize: number;
  page: number;
}
export type FetchFeedsResult = Nullable<{
  feeds: Feed[];
  total: number;
}>;

// Fetch feed detail
export interface FetchFeedDetailPayload extends AbstractApiActionPayload {
  pageSize: number;
  page: number;
}
export type FetchFeedDetailResult = Nullable<Feed>;
