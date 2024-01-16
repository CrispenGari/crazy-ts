import React from "react";

type AutoComplete<T extends string> = T | Omit<string, T>;
type Color = AutoComplete<"red" | "green">;
interface AProps {
  color: Color;
}
const Avatar = (props: AProps) => {
  return <></>;
};
const App = () => {
  return (
    <>
      <Avatar color="red" />
    </>
  );
};

export default App;
