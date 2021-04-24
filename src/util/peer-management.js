import { verifyBlockChain } from "./blockchain-util";

const RECEIVE = "receive";
const UPDATE = "update";
const UPDATE_FAILED = "failed";
const UPDATE_SUCCESSFUL = "success";
const UPDATE_NOT_CALLED = "no update";

let masterPeer = {};

const init = (blocks, setBlocks) => {
  masterPeer.peers = [];
  const peerObject1 = {};
  peerObject1.blocks = blocks;
  const peer1 = new RTCPeerConnection();
  const channel1 = peer1.createDataChannel("blockchain", {
    negotiated: true,
    id: 0,
  });

  peerObject1.peer = peer1;
  peerObject1.channel = channel1;
  masterPeer.peers.push(peerObject1);

  channel1.onmessage = (event) => {
    const eventData = JSON.parse(event.data);

    if (eventData.message === RECEIVE) {
      channel1.send(
        JSON.stringify({ message: RECEIVE, blocks: peerObject1.blocks })
      );
    } else if (eventData.message === UPDATE) {
      const updatedBlocks = eventData.blocks;
      if (verifyBlockChain(updatedBlocks)) {
        masterPeer.blocks = updatedBlocks;
        channel1.send(JSON.stringify({ message: UPDATE_SUCCESSFUL }));
      } else {
        channel1.send(JSON.stringify({ message: UPDATE_FAILED }));
      }
    }
  };

  const peerObject2 = {};
  peerObject2.updateStatus = UPDATE_NOT_CALLED; //used later when blocks need to be updated
  const peer2 = new RTCPeerConnection();
  const channel2 = peer2.createDataChannel("blockchain", {
    negotiated: true,
    id: 0,
  });
  channel2.onmessage = (event) => {
    const eventData = JSON.parse(event.data);

    if (eventData.message === RECEIVE) {
      peerObject2.loading = false;
      peerObject2.blocks = eventData.blocks;
      setBlocks(peerObject2.blocks);
    }
  };

  channel2.onopen = () => {
    peerObject2.getBlocks();
  };

  peerObject2.peer = peer2;
  peerObject2.channel = channel2;
  peerObject2.loading = false;

  peerObject2.getBlocks = () => {
    peerObject2.loading = true;
    console.log("in getblocks");

    channel2.send(JSON.stringify({ message: RECEIVE }));
  };

  peerObject2.updatedBlocks = () => {
    channel2.send(
      JSON.stringify({ message: UPDATE, blocks: peerObject2.blocks })
    );
  };

  peerObject2.blocks = [];

  peer1.onicecandidate = (event) => {
    if (event.candidate) {
      console.log("ice 1");
      peer2.addIceCandidate(event.candidate);
    }
  };

  peer2.onicecandidate = (event) => {
    if (event.candidate) {
      console.log("ice 2");
      peer1.addIceCandidate(event.candidate);
      console.log(channel2.readyState);
    }
  };

  return peer1
    .createOffer()
    .then((offer) => peer1.setLocalDescription(offer))
    .then(() => peer2.setRemoteDescription(peer1.localDescription))
    .then(() => peer2.createAnswer())
    .then((answer) => peer2.setLocalDescription(answer))
    .then(() => peer1.setRemoteDescription(peer2.localDescription))
    .then(() => {
      return peerObject2;
    })
    .catch(console.log);
};

const addPeer = (setPeers) => {
  const peerObject1 = {};
  const peer1 = new RTCPeerConnection();
  const channel1 = peer1.createDataChannel("blockchain", {
    negotiated: true,
    id: 0,
  });

  peerObject1.peer = peer1;
  peerObject1.channel = channel1;
  peerObject1.updateRequest = masterPeer.peers.push(peerObject1);

  channel1.onmessage = (event) => {
    const eventData = JSON.parse(event.data);

    if (eventData.message === RECEIVE) {
      channel1.send(
        JSON.stringify({ message: RECEIVE, blocks: peerObject1.blocks })
      );
    } else if (eventData.message === UPDATE) {
      const updatedBlocks = eventData.blocks;
      if (verifyBlockChain(updatedBlocks)) {
        masterPeer.blocks = updatedBlocks;
        channel1.send(JSON.stringify({ message: UPDATE_SUCCESSFUL }));
      } else {
        channel1.send(JSON.stringify({ message: UPDATE_FAILED }));
      }
    }
  };

  const peerObject2 = {};
  peerObject2.updateStatus = UPDATE_NOT_CALLED; //used later when blocks need to be updated
  const peer2 = new RTCPeerConnection();
  const channel2 = peer2.createDataChannel("blockchain", {
    negotiated: true,
    id: 0,
  });
  channel2.onmessage = (event) => {
    const eventData = JSON.parse(event.data);

    if (eventData.message === RECEIVE) {
      peerObject2.loading = false;
      peerObject2.blocks = eventData.blocks;
      console.log("peer added and working");
      setPeers((currPeers) => [...currPeers, peerObject2]);
    }
  };

  channel2.onopen = () => {
    peerObject2.getBlocks();
  };

  peerObject2.peer = peer2;
  peerObject2.channel = channel2;
  peerObject2.loading = false;

  peerObject2.getBlocks = () => {
    peerObject2.loading = true;
    console.log("in getblocks");

    channel2.send(JSON.stringify({ message: RECEIVE }));
  };

  peerObject2.updatedBlocks = () => {
    channel2.send(
      JSON.stringify({ message: UPDATE, blocks: peerObject2.blocks })
    );
  };

  peerObject2.blocks = [];

  peer1.onicecandidate = (event) => {
    if (event.candidate) {
      console.log("ice 1");
      peer2.addIceCandidate(event.candidate);
    }
  };

  peer2.onicecandidate = (event) => {
    if (event.candidate) {
      console.log("ice 2");
      peer1.addIceCandidate(event.candidate);
      console.log(channel2.readyState);
    }
  };

  return peer1
    .createOffer()
    .then((offer) => peer1.setLocalDescription(offer))
    .then(() => peer2.setRemoteDescription(peer1.localDescription))
    .then(() => peer2.createAnswer())
    .then((answer) => peer2.setLocalDescription(answer))
    .then(() => peer1.setRemoteDescription(peer2.localDescription))
    .then(() => {
      return peerObject2;
    })
    .catch(console.log);
};

export { init as peersInit, addPeer };
