import Block from "./block";

class Blockchain {
  chain: Block[];
  constructor(genesisBlock: Block) {
    this.chain = [genesisBlock];
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock: Block) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.index = this.getLatestBlock().index + 1;
    this.chain.push(newBlock);
  }

  changePreviousHash(index: number, newPreviousHash: string) {
    this.chain[index].previousHash = newPreviousHash;
  }
}

export default Blockchain;
