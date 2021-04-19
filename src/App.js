import "./App.css";

import { useState, useEffect } from "react";

import Block from "./components/block/Block";
import BlockChain from "./components/blockchain/BlockChain";
import AddDataButton from "./components/add-data-button/AddDataButton";

function App() {
  const [blocks, setBlocks] = useState([]);

  const addNewBlock = (data) => {
    fetch("http://localhost:3001/generateBlock", {
      method: "post",
      body: JSON.stringify({
        data: String(data),
        prevHash: blocks[blocks.length - 1].hash,
        prevIdx: blocks.length - 1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((block) => setBlocks((currState) => [...currState, block]))
      .catch(console.log);
  };

  useEffect(() => {
    fetch("http://localhost:3001/generateBlock", {
      method: "post",
      body: JSON.stringify({
        data: "Welcome to SimpleChain!",
        prevHash: 0,
        prevIdx: -1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((block) => setBlocks([block]))
      .catch(console.log);
  }, []);

  // const blockViews = [
  //   <Block isValid={true} />,
  //   <Block isValid={true} />,
  //   <Block isValid={false} />,
  // ];

  if (blocks.length === 0) {
    return <div>Loading</div>;
  }

  let blockViews = [];

  blocks.forEach((block) => {
    blockViews.push(<Block block={block} key={block.hash} />);
  });

  return (
    <div className="flex flex-column flex-align-center">
      <BlockChain>{blockViews}</BlockChain>
      <AddDataButton addNewBlock={addNewBlock} />
    </div>
  );
}

export default App;
