import "./Avatar.css";

const Avatar = ({ peer, changeCurrentPeer }) => {
  return (
    <div
      id="avatar"
      className="mh-5"
      onClick={() => changeCurrentPeer(peer)}
    ></div>
  );
};

export default Avatar;
