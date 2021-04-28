import "./App.css";

import { useState, useEffect, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import { peersInit, addPeer, changePeers } from "./util/peer-management";

import Block from "./components/block/Block";
import BlockChain from "./components/blockchain/BlockChain";
import AddDataButton from "./components/add-data-button/AddDataButton";
import Avatar from "./components/avatar/Avatar";
import PopUp from "./components/popup/PopUp";

function App() {
  const [blocks, setBlocks] = useState([]);
  const [peers, setPeers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPeer, setCurrentPeer] = useState(null);
  const blockchain_box = useRef();

  const changeCurrentPeer = (newPeer) => {
    if (currentPeer !== newPeer) {
      blockchain_box.current.classList.remove("slide-in");
      changePeers(
        currentPeer,
        newPeer,
        setCurrentPeer,
        setBlocks,
        setModalIsOpen,
        blocks
      );
    }
  };

  const updateNextBlock = useCallback((id) => {
    setBlocks((currBlocks) => {
      if (id + 1 < currBlocks.length) {
        currBlocks[id + 1].prevHash = currBlocks[id].hash;
        currBlocks[id + 1].key = uuidv4();
        const newBlocks = [...currBlocks];
        return newBlocks;
      }
      return currBlocks;
    });
  }, []);

  const addNewBlock = (data) => {
    fetch(`${process.env.REACT_APP_API_URI}/generatevalidblock`, {
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
    fetch(`${process.env.REACT_APP_API_URI}/generatevalidblock`, {
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
        return peersInit([block], setBlocks);
      })
      .then((peerObj) => {
        setPeers([peerObj]);
        setCurrentPeer(peerObj);
      })
      .catch(console.log);
  }, []);

  if (!blocks || blocks.length === 0) {
    return <div>Loading</div>;
  }

  if (
    blockchain_box.current &&
    !blockchain_box.current.classList.contains("slide-in")
  ) {
    blockchain_box.current.classList.add("slide-in");
  }

  return (
    <div>
      <h1 className="ta-center">SIMPLE CHAIN</h1>
      <div className="flex flex-align-center max-width-100p">
        <div className="flex pa-h-5 overflow-auto overflow-visible">
          {peers.map((peer, id) => (
            <Avatar
              peer={peer}
              key={id}
              changeCurrentPeer={changeCurrentPeer}
              focused={peer === currentPeer ? true : false}
            />
          ))}
        </div>
        <button
          className="ml-a h-fit-content mr-4"
          onClick={() => addPeer(setPeers)}
        >
          Add Peer
        </button>
      </div>
      <PopUp modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
      <div
        ref={blockchain_box}
        className="flex flex-column flex-align-center mt-4 blockchain-box slide-in"
      >
        <BlockChain>
          {blocks.map((block) => {
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
