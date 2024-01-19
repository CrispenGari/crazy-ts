import { GlobalReducer } from "./types";
declare global {
  interface GlobalReducerEvent {
    LOG_IN: {};
  }
}
export const userReducer: GlobalReducer<{ id: string }> = (state, event) => {
  return state;
};
