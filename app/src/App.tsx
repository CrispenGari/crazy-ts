import React from "react";
interface TProps<TItem> {
  items: Array<TItem>;
  renderItem: (item: TItem) => React.ReactNode;
}
function Table<TItem>(props: TProps<TItem>) {
  return null;
}
const App = () => {
  return (
    <>
      <Table
        items={[{ id: "2", name: "hey" }]}
        renderItem={(item) => <p>{item.id}</p>}
      />
    </>
  );
};

export default App;
