import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { ApiServiceActionToken } from "store/api-service/actions";
import { withApiDispatcher } from "./extensions/with-api-dispatcher";
import { withRootState } from "./extensions/with-root-state";
import {
  PublicProfile,
  PublicProfileModel,
} from "./feedx-store/public-profile.model";

/**
 * Mobx Model: AuthState State Domain
 */
export const AuthStateModel = types
  .model("AuthState")
  .props({
    isAuthenticated: false,
    profile: types.maybeNull(types.reference(PublicProfileModel)),
  })
  .extend(withApiDispatcher)
  .extend(withRootState)
  .views((self) => ({
    // getRepetitionCount(delightId) {
    //   let count = 0;
    //   for (const v of self.daylights.values()) v.inherits.get(delightId) && count++;
    //   return count;
    // }
  }))
  .actions((self) => {
    const privateMutations = {
      setProfile(profile: PublicProfile) {
        self.profile = profile;
      },
      setIsAuthticated(state: boolean) {
        self.isAuthenticated = state;
      },
    };

    const privateActions = {
      initCheckAuth() {
        self.dispatchApiAction(
          ApiServiceActionToken.FETCH_PROFILE,
          { votes: false, posts: false },
          (profile) => {
            // profile
            console.log({ profile });
            // self.rootState.
            // self.profile = PublicProfileModel.create(profile);
          }
        );
        // self.fetchErrorResponse({ votes: false, posts: false });
      },
    };
    return {
      // Lifecycle hooks
      // ==================================================
      afterAttach() {
        privateActions.initCheckAuth();
      },

      // api actions
      // ==================================================
      // createSession(payload: CreateSessionPayload) {
      //   // self.rootState
      //   self.setStatus("pending");
      //   self
      //     .dispatchApiAction(ApiServiceActionToken.CREATE_SESSION, payload)
      //     .then((res) => {
      //       if (res.kind === "OK" && res.data) {
      //         this.setProfile(res.data);
      //       } else {
      //         self.resolveFetchErrorResponse(res);
      //       }
      //       self.setStatus("idle");
      //     });
      // },
      // fetchProfile(payload: FetchProfilePayload) {
      //   self.setStatus("pending");
      //   self
      //     .dispatchApiAction(ApiServiceActionToken.FETCH_PROFILE, payload)
      //     .then((res) => {
      //       if (res.kind === "OK" && res.data) {
      //         this.setProfile(res.data);
      //       } else {
      //         self.resolveFetchErrorResponse(res);
      //       }
      //       self.setStatus("idle");
      //     });
      // },
    };
  });

/**
 * Mobx Model: AuthState State
 */
export interface AuthState extends Instance<typeof AuthStateModel> {}

/**
 * Mobx Snapshot: AuthState State
 */
export interface AuthStateSnapshotOut
  extends SnapshotOut<typeof AuthStateModel> {}
export interface AuthStateSnapshotIn
  extends SnapshotIn<typeof AuthStateModel> {}
