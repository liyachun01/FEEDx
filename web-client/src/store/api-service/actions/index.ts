import { AbstractApiService } from "../abstract-api-service.interface";
import {
  AbstractApiActionPayload,
  AbstractApiActionResult,
  AbstractApiActionType,
  ApiServiceActionToken,
  CreateSessionPayload,
  CreateSessionResult,
  DeleteSessionPayload,
  DeleteSessionResult,
  FetchFeedsPayload,
  FetchFeedsResult,
  FetchProfilePayload,
  FetchProfileResult,
} from "./action-types";

// actions object literal
export type IApiActionsObjectLiteral<I = any, C = any> = Record<
  ApiServiceActionToken,
  (
    ctx: AbstractApiService<I, C>,
    payload: AbstractApiActionPayload
  ) => Promise<AbstractApiActionResult>
>;
export class ApiActionsObjectLiteral {
  [ApiServiceActionToken.CREATE_SESSION]: AbstractApiActionType<
    CreateSessionPayload,
    CreateSessionResult
  >;
  [ApiServiceActionToken.RENEW_SESSION]: AbstractApiActionType<
    CreateSessionPayload,
    CreateSessionResult
  >;
  [ApiServiceActionToken.DESTROY_SESSION]: AbstractApiActionType<
    DeleteSessionPayload,
    DeleteSessionResult
  >;

  [ApiServiceActionToken.FETCH_PROFILE]: AbstractApiActionType<
    FetchProfilePayload,
    FetchProfileResult
  >;
  [ApiServiceActionToken.UPDATE_PROFILE]: AbstractApiActionType<
    CreateSessionPayload,
    CreateSessionResult
  >;

  [ApiServiceActionToken.FETCH_FEEDS]: AbstractApiActionType<
    FetchFeedsPayload,
    FetchFeedsResult
  >;
  [ApiServiceActionToken.FETCH_FEED_DETAIL]: AbstractApiActionType<
    CreateSessionPayload,
    CreateSessionResult
  >;
}

export * from "./action-types";
