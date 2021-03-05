import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { AuthStateModel } from "./auth-state.model";
import { FeedxStoreModel } from "./feedx-store/feedx-store";

/**
 * The MobxRootStateModel model.
 */
export const MobxRootStateModel = types
  .model("MobxRootStateModel", {
    feedxStore: types.maybeNull(FeedxStoreModel),
    authState: types.maybeNull(AuthStateModel),
  })
  .views((self) => ({
    // computed values
  }))
  .actions((self) => {
    // mutations
    // ==================================================
    // why mutations as functions
    // https://mobx-state-tree.js.org/concepts/actions
    // the officical document says:
    // You cannot use this inside actions. Instead, use self. This makes it safe to pass actions around without binding them or wrapping them in arrow functions.
    // However it's runnable while using an action in another action, but still strange.
    // create all direct sub models on root model creation
    const mutations = {
      initCreateModels() {
        self.feedxStore = FeedxStoreModel.create();
        self.authState = AuthStateModel.create();
      },
    };

    return {
      // Lifecycle hooks
      // ==================================================
      afterCreate() {
        mutations.initCreateModels();
      },

      // actions
      // ==================================================
      // null
    };
  });

/**
 * The MobxRootState instance.
 */
export interface MobxRootState extends Instance<typeof MobxRootStateModel> {}

/**
 * The data of a MobxRootState.
 */
export interface MobxRootStateSnapshotOut
  extends SnapshotOut<typeof MobxRootStateModel> {}
export interface MobxRootStateSnapshotIn
  extends SnapshotIn<typeof MobxRootStateModel> {}
