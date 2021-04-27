import "./Avatar.css";

const Avatar = ({ peer, changeCurrentPeer, focused }) => {
  let focusedClass = "";
  if (focused) {
    focusedClass = " focused";
  }

  return (
    <div
      id="avatar"
      className={"mh-5 min-width-fc flex-shrink-0" + focusedClass}
      onClick={() => changeCurrentPeer(peer)}
    ></div>
  );
};

export default Avatar;
