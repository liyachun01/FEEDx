import { IObservableValue, observable } from "mobx";
import { getEnv, IStateTreeNode } from "mobx-state-tree";
import { GeneralApiResponse, GeneralApiResponseType } from "store/api-service";
import {
  ApiActionsObjectLiteral,
  ApiServiceActionToken,
} from "store/api-service/actions";
import { MobxEnvironment } from "../setup";
import { StatusType } from "./with-status";

// this is the combination of with status, and the api dispatcher
export const withApiDispatcher = (self: IStateTreeNode) => {
  /**
   * The observable backing store for the status field.
   */
  const status: IObservableValue<string> = observable.box("idle");

  return {
    views: {
      // a getter
      get status() {
        return status.get() as StatusType;
      },
      // as setter
      set status(value: StatusType) {
        status.set(value);
      },
    },
    actions: {
      /**
       * dispatch an api action
       *
       * @template A ApiServiceActionToken
       * @template P payload of the action
       * @template D return data type of the action
       * @param {A} actionToken
       * @param {P} payload
       * @param {A} resultHandler
       * @param {P} [problemHandler]
       * @returns {Promise<GeneralApiResponse<D>>}
       * @memberof AbstractApiService
       */
      dispatchApiAction: <
        A extends ApiServiceActionToken,
        P = Parameters<ApiActionsObjectLiteral[A]>[1],
        D = UnpackedType<ReturnType<ApiActionsObjectLiteral[A]>>,
        R = (data: D) => any
      >(
        actionToken: A,
        payload: P,
        resultHandler: R,
        problemHandler?: (resProblem: GeneralApiResponse<never>) => any
      ) => {
        getEnv<MobxEnvironment>(self)
          .feedxApi.dispatch(actionToken, payload)
          .then((generalRes) => {
            if (generalRes.kind === GeneralApiResponseType.OK) {
              const responseResult = generalRes;
              // @ts-ignore: This expression is not callable, Type '{}' has no call signatures.
              // TODO: why?
              resultHandler(responseResult.data);
            } else {
              // now all the normalized api problem responses live here
              const responseProblem = generalRes;
              // 1. we forward it to the ui state
              // TODO: forward error to some observable ui state
              // 2. still leave a window for the invoker to handle (optional)
              problemHandler && problemHandler(responseProblem);
            }
          })
          .catch((e: never) => {
            // this never happens, cuz problem was normallized already
          });
      },
    },
  };
};
