import { Children } from "react";

import DownwardArrow from "../downward-arrow/DownwardArrow";

const BlockChain = ({ children }) => {
  const childrenCount = Children.count(children);

  let blocks = "";

  if (childrenCount > 0) {
    blocks = [];
    Children.forEach(children, (child, i) => {
      blocks.push(child);
      if (i < childrenCount - 1) {
        blocks.push(<DownwardArrow key={i} />);
      }
    });
  }

  return (
    <div className="flex flex-column fit-content flex-align-center">
      {blocks}
    </div>
  );
};

export default BlockChain;
