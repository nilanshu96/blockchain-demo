const RECEIVE = "receive";
const UPDATE = "update";
const FAILED = "failed";

let masterPeer = null;

const init = (blocks) => {
  masterPeer.peer = new RTCPeerConnection();
  masterPeer.channel = masterPeer.peer.createDataChannel("blockchain", {
    negotiated: true,
    id: 0,
  });
  masterPeer.blocks = blocks;

  masterPeer.channel.onmessage = (event) => {
    if (event.data.message === RECEIVE) {
      masterPeer.channel.send({
        message: RECEIVE,
        blocks: JSON.stringify(masterPeer.blocks),
      });
    }

    if (event.data.message === UPDATE) {
      //check the blocks validity here
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
    if (event.data.message === RECEIVE) {
      peerObject.blocks = event.data.blocks;
    } else if (event.data.message === FAILED) {
      peerObject.updateFailed = true;
    }
  };

  peerObject.peer = peer;
  peerObject.channel = channel;
  peerObject.blocks = [];
  peerObject.getBlocks = () => {
    peerObject.channel.send({ message: RECEIVE });
  };
  peerObject.updateBlocks = () => {
    peerObject.channel.send({ message: UPDATE, blocks: peerObject.blocks });
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
