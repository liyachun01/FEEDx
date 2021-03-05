import { getEnv, IStateTreeNode } from "mobx-state-tree";
import { MobxEnvironment } from "../setup";

export const withEnvironment = (self: IStateTreeNode) => ({
  views: {
    get environment() {
      return getEnv<MobxEnvironment>(self);
    },
  },
});
