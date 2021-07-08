import React, { useReducer } from "react";
import "./main.ts";

type Action =
  | {
      type: "INCREMENT";
      value: number;
    }
  | {
      type: "DECREMENT";
      value: number;
    };
interface Counter {
  count: number;
}
type State = Counter;

const counterReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "DECREMENT":
      return (state = { count: state.count - action.value });
    case "INCREMENT":
      return (state = { count: state.count - action.value });
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(counterReducer, {
    count: 0,
  });
  return (
    <div className="app">
      <h1>State</h1>
      <code>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </code>
      <button
        onClick={() =>
          dispatch({
            type: "INCREMENT",
            value: 5,
          })
        }
      >
        increment
      </button>
      <br />
      <button
        onClick={() => {
          dispatch({
            type: "DECREMENT",
            value: 4,
          });
        }}
      >
        decrement
      </button>
    </div>
  );
};

export default App;
