import React from "react";
import "./main.ts";
interface HomeProps {
  name: string;
  index: number;
}
const Home: React.FC<HomeProps> = ({ name, index, children }) => {
  return (
    <>
      <p>
        {name}: <strong>{index}</strong>
      </p>
    </>
  );
};
interface FormProps<T> {
  values: T;
  children: (values: T) => JSX.Element;
}

const Form = <T extends {}>({ values, children }: FormProps<T>) => {
  return children(values);
};
const App = () => {
  return (
    <div className="app">
      <Form<{ lastName: string | null }> values={{ lastName: "" }}>
        {(values) => <div>{values.lastName}</div>}
      </Form>
    </div>
  );
};

export default App;
