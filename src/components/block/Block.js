import "./Block.css";

import { useState, useCallback, useEffect, memo } from "react";

const Block = ({ block, updateNextBlock }) => {
  const [data, setData] = useState(block.data);
  const [idx, setIdx] = useState(block.idx);
  const [prevHash, setPrevHash] = useState(block.prevHash);
  const [hash, setHash] = useState(block.hash);
  const [nonce, setNonce] = useState(block.nonce);
  const [isValid, setIsValid] = useState(block.isValid);
  const [createdAt, setCreatedAt] = useState(block.createdAt);

  const updateBlock = useCallback(
    (newBlock) => {
      console.log("updateBlock called");

      setIdx(newBlock.idx);
      setPrevHash(newBlock.prevHash);
      setHash(newBlock.hash);
      setNonce(newBlock.nonce);
      setIsValid(newBlock.isValid);
      setCreatedAt(newBlock.createdAt);
      updateNextBlock(newBlock.idx);
    },
    [updateNextBlock]
  );

  const onDataChange = (event) => {
    setData(event.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:3001/generateBlock", {
      method: "post",
      body: JSON.stringify({ ...block, data: data }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((newBlock) => {
        Object.assign(block, newBlock);
        updateBlock(newBlock);
      })
      .catch(console.log);
  }, [data, block, updateBlock]);

  let hashColor = "fc-g";
  if (!isValid) hashColor = "fc-r";

  return (
    <div className="box-1 box-hover br-2 padding-5 block-width mv-5">
      <div className="box-1-gray flex">
        <div className="br-1-gray ta-center pa-v-2 pa-h-5 inline-block bg-lg">
          DATA
        </div>
        <input
          placeholder="Enter Data"
          className="fg-4 pa-h-4"
          value={data}
          onChange={onDataChange}
        ></input>
      </div>
      <div className="flex pa-t-5 pa-b-2 fs-s-8">
        <div className="pa-r-4 no-text-wrap">PREVIOUS HASH</div>
        <div className={hashColor + " hash-box"}>{prevHash}</div>
      </div>
      <div className="flex  pa-b-5 pa-t-2 fs-s-8">
        <div className="pa-r-4">HASH</div>
        <div className={hashColor + " hash-box"}>{hash}</div>
      </div>
      <div className="flex fs-l-5 pa-v-2 flex-baseline">
        <div className="mr-2">
          {idx === 0 ? "GENESIS BLOCK" : "BLOCK #" + idx}{" "}
        </div>
        <div className="fs-s-8"> {createdAt}</div>
        <div className="ml-a">{nonce}</div>
      </div>
    </div>
  );
};

export default memo(Block);
