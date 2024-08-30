import Block from "./block";

class Blockchain {
  chain: Block[];
  difficulty: number;
  constructor(difficulty: number) {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = difficulty;
  }

  createGenesisBlock() {
    const genesisBlock = new Block(0, "Genesis Block", "0");
    genesisBlock.mine(this.difficulty); // mine method take parameter of difficulty
    return genesisBlock;
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
    this.chain[index].hash = this.chain[index].calculateHash();
  }
}

export default Blockchain;
