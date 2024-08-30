import sha256 from "crypto-js/sha256";

class Block {
  data: any;
  hash: string;
  previousHash: string;
  index: number;
  nonce: number;
  timestamp: number;
  constructor(index: number, data: any, previoushHash: string) {
    this.data = data;
    this.nonce = 0;
    this.index = index;
    this.previousHash = previoushHash;
    this.hash = this.calculateHash();
    this.timestamp = new Date().getTime();
  }

  calculateHash() {
    return sha256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  }

  mine(difficulty: number) {
    while (!this.hash.startsWith("0".repeat(difficulty))) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

export default Block;
