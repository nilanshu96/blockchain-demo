export const verifyBlockChain = (blocks) => {
  for (let i = 0; i < blocks.length; i++) {
    if (!blocks[i].isValid) return false;
  }
  return true;
};
