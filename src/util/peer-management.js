import { verifyBlockChain } from "./blockchain-util";

const RECEIVE = "receive";
const UPDATE = "update";
const FAILED = "failed";

let masterPeer = {};

const init = (blocks) => {
  masterPeer.peer = new RTCPeerConnection();
  masterPeer.channel = masterPeer.peer.createDataChannel("blockchain", {
    negotiated: true,
    id: 0,
  });
  masterPeer.blocks = blocks;

  masterPeer.channel.onmessage = (event) => {
    const receivedData = JSON.parse(event.data);

    if (receivedData.message === RECEIVE) {
      masterPeer.channel.send(
        JSON.stringify({
          message: RECEIVE,
          blocks: masterPeer.blocks,
        })
      );
    }

    if (receivedData.message === UPDATE) {
      const updatedBlocks = receivedData.blocks;
      if (verifyBlockChain(updatedBlocks)) {
        masterPeer.blocks = updatedBlocks;
      } else {
        masterPeer.channel.send(JSON.stringify({ message: FAILED }));
      }
    }
  };
  console.log("init called");
};

const createPeer = () => {
  const peerObject = {};
  const peer = new RTCPeerConnection();
  const channel = peer.createDataChannel("blockchain", {
    negotiated: true,
    id: 0,
  });

  channel.onmessage = (event) => {
    const receivedData = JSON.parse(event.data);

    if (receivedData.message === RECEIVE) {
      peerObject.blocks = receivedData.blocks;
    } else if (receivedData.message === FAILED) {
      peerObject.updateFailed = true;
    }
  };

  peerObject.peer = peer;
  peerObject.channel = channel;
  peerObject.blocks = [];
  peerObject.getBlocks = () => {
    peerObject.channel.send(JSON.stringify({ message: RECEIVE }));
  };
  peerObject.updateBlocks = () => {
    peerObject.channel.send(
      JSON.stringify({ message: UPDATE, blocks: peerObject.blocks })
    );
  };
  peerObject.updateFailed = false;

  return peerObject;
};

const addPeer = () => {
  const peerObject = createPeer();
  return connectPeers(masterPeer, peerObject)
    .then(() => {
      peerObject.getBlocks();
      return peerObject;
    })
    .catch(console.log);
};

const connectPeers = (peerObject1, peerObject2) => {
  const peer1 = peerObject1.peer;
  const peer2 = peerObject2.peer;

  peer1.onicecandidate = function (event) {
    if (event.candidate) {
      peer2.addIceCandidate(event.candidate);
    }
  };

  peer2.onicecandidate = function (event) {
    if (event.candidate) {
      peer1.addIceCandidate(event.candidate);
    }
  };

  return peer1
    .createOffer()
    .then((offer) => peer1.setLocalDescription(offer))
    .then(() => peer2.setRemoteDescription(peer1.localDescription))
    .then(() => peer2.createAnswer())
    .then((answer) => peer2.setLocalDescription(answer))
    .then(() => peer1.setRemoteDescription(peer2.localDescription))
    .catch(console.log);
};

export { init as peersInit, addPeer };
