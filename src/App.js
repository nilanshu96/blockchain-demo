import "./App.css";

import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import Block from "./components/block/Block";
import BlockChain from "./components/blockchain/BlockChain";
import AddDataButton from "./components/add-data-button/AddDataButton";

function App() {
  const [blocks, setBlocks] = useState([]);

  const updateNextBlock = useCallback((id) => {
    setBlocks((currBlocks) => {
      if (id + 1 < currBlocks.length) {
        currBlocks[id + 1].prevHash = currBlocks[id].hash;
        currBlocks[id + 1].key = uuidv4();
        return [...currBlocks];
      }
      return currBlocks;
    });
  }, []);

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
        block.key = uuidv4(); //a change in key triggers the update in the component to which it belongs
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
        block.key = uuidv4();
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
        <BlockChain>
          {blocks.map((block) => {
            console.log(block.key);
            return (
              <Block
                block={block}
                key={block.key}
                updateNextBlock={updateNextBlock}
              />
            );
          })}
        </BlockChain>
        <AddDataButton addNewBlock={addNewBlock} />
      </div>
    </div>
  );
}

export default App;
