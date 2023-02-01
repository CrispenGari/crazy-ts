import React, { useReducer } from "react";

const getUser = () => {
  return {
    username: "username",
    id: 1,
    email: "username@gmail.com",
    age: 19,
  };
};

type GetUserType = ReturnType<typeof getUser>;

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Unions</h1>
    </div>
  );
};

export default App;
