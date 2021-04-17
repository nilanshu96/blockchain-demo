import "./App.css";

import Block from "./components/block/Block";
import BlockChain from "./components/blockchain/BlockChain";
import AddDataButton from "./components/add-data-button/AddDataButton";

function App() {
  const blocks = [
    <Block isValid={true} />,
    <Block isValid={true} />,
    <Block isValid={false} />,
  ];
  return (
    <div className="flex flex-column flex-align-center">
      <BlockChain>{blocks}</BlockChain>
      <AddDataButton />
    </div>
  );
}

export default App;
