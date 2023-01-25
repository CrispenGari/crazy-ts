import React, { useReducer } from "react";

type User = {
  username: string;
  email: string;
  password: string;
};

const user: Omit<User, "username"> = {
  email: "hello@gmail.com",
  password: "password",
};
console.log({ user });

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Unions</h1>
    </div>
  );
};

export default App;
