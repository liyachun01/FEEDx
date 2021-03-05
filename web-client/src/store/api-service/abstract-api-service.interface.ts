import {
  AbstractApiActionResult,
  ApiActionsObjectLiteral,
  ApiServiceActionToken,
  IApiActionsObjectLiteral,
} from "./actions";
import {
  GeneralApiResponse,
  getGeneralApiResonse,
} from "./api-response.interface";

/**
 * @export
 * @abstract
 * @class AbstractApiService
 * @template I the api instance
 * @template C the api instance creator
 */
export abstract class AbstractApiService<I = any, C = any> {
  protected _apiInstance: I;
  private _baseConfig: C;
  private _actions: IApiActionsObjectLiteral<I, C>;
  constructor(baseConfig: C) {
    this._baseConfig = baseConfig;
  }

  private get _isInstantiated() {
    return this._apiInstance !== undefined;
  }

  private _getApiResponseResult<D extends AbstractApiActionResult>(data: D) {
    return getGeneralApiResonse(data);
  }
  protected abstract _getApiResponseProblem(
    r: never
  ): GeneralApiResponse<never>;

  /**
   * get ready the instance
   *
   */
  public setup(creator: (c: C) => I, actions: IApiActionsObjectLiteral<I, C>) {
    if (this._isInstantiated) return;
    this._apiInstance = creator(this._baseConfig);
    this._actions = actions;
  }

  /**
   * dispatch an api action
   *
   * @template A ApiServiceActionToken
   * @template P The payload of the action
   * @template D return type of the action
   * @param {A} actionToken
   * @param {P} payload
   * @param {(data: D) => any} resolve
   * @returns {Promise<GeneralApiResponse<D | never>>} // not exact match but IT"S NOT WRONG!
   * @memberof AbstractApiService
   */
  public async dispatch<
    A extends ApiServiceActionToken,
    P = Parameters<ApiActionsObjectLiteral[A]>[1],
    D = UnpackedType<ReturnType<ApiActionsObjectLiteral[A]>>
  >(actionToken: A, payload: P) {
    return this._actions[actionToken](this, payload)
      .then((data: D) => this._getApiResponseResult<D>(data))
      .catch(this._getApiResponseProblem);
  }

  public abstract request<D>(opts: Partial<C>): Promise<D | undefined>;
}
