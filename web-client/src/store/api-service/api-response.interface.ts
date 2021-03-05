import { AbstractApiActionResult } from "./actions";

export enum GeneralApiResponseType {
  CLIENT_ERROR = "CLIENT_ERROR",
  SERVER_ERROR = "SERVER_ERROR",
  CONNECTION_ERROR = "CONNECTION_ERROR",
  NETWORK_ERROR = "NETWORK_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  CANCEL_ERROR = "CANCEL_ERROR",

  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  REJECTED = "REJECTED",
  BAD_REQUEST = "BAD_REQUEST",
  OK = "OK",
}
export type GeneralApiResponseResultType = Extract<
  GeneralApiResponseType,
  GeneralApiResponseType.OK
>;
export type GeneralApiResponseProblemType = Exclude<
  GeneralApiResponseType,
  GeneralApiResponseType.OK
>;

export type GeneralApiResponse<T extends AbstractApiActionResult> =
  | {
      kind: GeneralApiResponseResultType;
      data: T;
    }
  | {
      kind: GeneralApiResponseProblemType;
      temporary: boolean;
    };

export function getGeneralApiResonse<T extends AbstractApiActionResult>(
  data: T
): GeneralApiResponse<T> {
  return {
    kind: GeneralApiResponseType.OK,
    data,
  };
}

export function getGeneralApiResponseProblem(
  kind: GeneralApiResponseProblemType
): GeneralApiResponse<never> {
  const temporaryKinds = [
    GeneralApiResponseType.CANCEL_ERROR,
    GeneralApiResponseType.CONNECTION_ERROR,
    GeneralApiResponseType.UNKNOWN_ERROR,
  ];
  return {
    kind,
    temporary: temporaryKinds.includes(kind),
  };
}
