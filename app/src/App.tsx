import React, { useReducer } from "react";
import "./main.ts";

interface User {
  username: string;
  password: string;
}
interface Profile {
  username: string;
  photoUrl: string;
}

type UserProfile = User & Profile;
const ourUser: UserProfile = {
  username: "",
  photoUrl: "",
  password: "",
};

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Unions</h1>
    </div>
  );
};

export default App;
