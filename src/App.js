import "./App.css";

import { useState, useEffect, useRef } from "react";

import Block from "./components/block/Block";
import BlockChain from "./components/blockchain/BlockChain";
import AddDataButton from "./components/add-data-button/AddDataButton";

function App() {
  const [blocks, setBlocks] = useState([]);
  const blockViews = useRef([]);

  const addNewBlock = (data) => {
    fetch("http://localhost:3001/generateValidBlock", {
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
      .then((block) => {
        blockViews.current.push(<Block block={block} key={block.hash} />);
        setBlocks((currState) => [...currState, block]);
      })
      .catch(console.log);
  };

  useEffect(() => {
    fetch("http://localhost:3001/generateValidBlock", {
      method: "post",
      body: JSON.stringify({
        data: "Welcome to SimpleChain!",
        prevHash: "0",
        prevIdx: -1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((block) => {
        blockViews.current.push(<Block block={block} key={block.hash} />);
        setBlocks([block]);
      })
      .catch(console.log);
  }, []);

  if (blocks.length === 0) {
    return <div>Loading</div>;
  }

  // let blockViews = [];

  // blocks.forEach((block) => {
  //   blockViews.push(<Block block={block} key={block.hash} />);
  // });

  return (
    <div>
      <h1 className="ta-center">SIMPLE CHAIN</h1>
      <div className="flex flex-column flex-align-center">
        <BlockChain>{blockViews.current}</BlockChain>
        <AddDataButton addNewBlock={addNewBlock} />
      </div>
    </div>
  );
}

export default App;
