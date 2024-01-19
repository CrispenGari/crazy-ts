import { GlobalReducer } from "./types";

declare global {
  interface GlobalReducerEvent {
    ADD_TODO: {
      text: string;
    };
  }
}
export const todoReducer: GlobalReducer<{ todo: { id: string }[] }> = (
  state,
  event
) => {
  return state;
};
