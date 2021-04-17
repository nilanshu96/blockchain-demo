import "./App.css";

import Block from "./components/block/Block";
import BlockChain from "./components/blockchain/BlockChain";
import AddDataButton from "./components/add-data-button/AddDataButton";

function App() {
  return (
    <div className="flex flex-column flex-align-center">
      <BlockChain>
        <Block />
        <Block />
      </BlockChain>
      <AddDataButton />
    </div>
  );
}

export default App;
