import {
  ApiResponse as ApiSauceResponse,
  ApisauceConfig,
  ApisauceInstance,
} from "apisauce";
import {
  AbstractApiService,
  GeneralApiResponseProblemType,
  GeneralApiResponseType,
  getGeneralApiResponseProblem,
} from "store/api-service";

/**
 * Manages all requests to the API.
 */
export class ApiService extends AbstractApiService<
  ApisauceInstance,
  ApisauceConfig
> {
  protected _getApiResponseProblem(response: ApiSauceResponse<any>) {
    const problemCode = response.problem;
    if (problemCode === "CLIENT_ERROR") {
      switch (response.status) {
        case 401:
          return getGeneralApiResponseProblem(
            GeneralApiResponseType.UNAUTHORIZED
          );
        case 403:
          return getGeneralApiResponseProblem(GeneralApiResponseType.FORBIDDEN);
        case 404:
          return getGeneralApiResponseProblem(GeneralApiResponseType.NOT_FOUND);
        default:
          return getGeneralApiResponseProblem(GeneralApiResponseType.REJECTED);
      }
    } else {
      return getGeneralApiResponseProblem(
        problemCode as GeneralApiResponseProblemType
      );
    }
  }

  public async request<D>(config: Partial<ApisauceConfig>): Promise<D> {
    const response = await this._apiInstance.any<D>(config);
    // let the getGeneralProblem resolve the error response
    if (!response.ok) throw response;
    // @ts-ignore
    else return response.data;
  }
}
