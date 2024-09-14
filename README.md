# Blockchain Demo

This interactive website provides a visual and hands-on demonstration of how blockchain technology works. It allows users to create blocks, mine them, and observe how they are linked together in a chain. The project also illustrates the immutable nature of blockchain by showing how tampering with a block affects the entire chain.

## Features

- **Block Creation**: Users can create new blocks with custom data.
- **Mining Simulation**: Experience the process of mining blocks and see how it affects the blockchain.
- **Chain Visualization**: A clear, visual representation of how blocks are linked together.
- **Tamper Demonstration**: Interact with the chain to see how altering data in one block affects subsequent blocks.
- **Educational Tool**: Perfect for learning and teaching blockchain concepts.

## Getting Started

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/irakibul7/blockchain-demo
   ```

2. Navigate to the project directory:

   ```
   cd blockchain-demo
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Start the development server:

   ```
   npm run dev
   ```

5. Open your browser and visit `http://localhost:3000` to view the application.

## Usage

1. **Tampering Demonstration**:

   - Select any block in the chain.
   - Modify the data in the block.
   - Observe how this change affects the current block's hash and invalidates all subsequent blocks.

2. **Mining Simulation**:

   - Click the "Mine Blocks" button to simulate the mining process.
   - The system will automatically adjust the nonce value to find a valid hash.
   - Once the hash meets the difficulty criteria, the block is added to the chain.`

3. **Creating a Block**:

   - Enter data into the provided input field.
   - Click the "Create Block" button to add a new block to the chain.

## Technologies Used

- Next.js
- SHA-256 Hashing Algorithm
- TypeScript

## Understanding the Technology

### Blockchain Basics

A blockchain is a distributed ledger that records transactions across many computers. Each record in the blockchain is called a block, and each block is linked to the previous one, forming a chain. This structure allows for secure, transparent, and tamper-evident record-keeping.

### Block Structure

In this demo, each block contains:

- Index: The position of the block in the chain
- Timestamp: When the block was created
- Data: The information stored in the block
- Previous Hash: The hash of the previous block
- Hash: The unique identifier of the current block
- Nonce: A number used in the mining process

### SHA-256 Hashing Algorithm

The SHA-256 (Secure Hash Algorithm 256-bit) is a cryptographic hash function that generates a unique, fixed-size 256-bit (32-byte) hash. This project uses SHA-256 to calculate the hash of each block. Here's how it works:

1. The block's contents (index, timestamp, data, previous hash, and nonce) are combined into a single string.
2. This string is passed through the SHA-256 algorithm.
3. The algorithm produces a fixed-size output (the hash), regardless of the input size.
4. Any change in the input, no matter how small, results in a completely different hash.

For example:

```javascript
import sha256 from "crypto-js/sha256";

function calculateHash(index, timestamp, data, previousHash, nonce) {
  const blockString = index + timestamp + data + previousHash + nonce;
  return sha256(blockString).toString();
}
```

### Mining Process

Mining is the process of adding new blocks to the blockchain. To mine a block, miners must find a hash that meets certain criteria. In this demo, the criteria are based on the difficulty level, which determines the number of leading zeros required in the hash.

The mining process involves:

1. Incrementing the nonce value.
2. Calculating the hash of the block.
3. Checking if the hash meets the difficulty criteria.
4. Repeating the process until a valid hash is found.

```javascript
function mineBlock(index, timestamp, data, previousHash, difficulty) {
  let nonce = 0;
  let hash = calculateHash(index, timestamp, data, previousHash, nonce);

  while (!isValidHash(hash, difficulty)) {
    nonce++;
    hash = calculateHash(index, timestamp, data, previousHash, nonce);
  }

  return { nonce, hash };
}
```

### Validating the Hash

The validity of a hash is determined by the number of leading zeros it contains. The difficulty level specifies the required number of zeros. For example, a difficulty of 3 means the hash must start with three zeros.

```javascript
function isValidHash(hash, difficulty) {
  const prefix = "0".repeat(difficulty);
  return hash.startsWith(prefix);
}
```

### Tamper Detection

Blockchain technology ensures the integrity of the data by linking blocks together using cryptographic hashes. If the data in a block is altered, the hash of that block changes, which in turn affects the hash of all subsequent blocks. This tamper-evident property makes it easy to detect any unauthorized changes to the blockchain.

```javascript
function isChainValid(chain) {
  for (let i = 1; i < chain.length; i++) {
    const currentBlock = chain[i];
    const previousBlock = chain[i - 1];

    if (currentBlock.hash !== calculateHashForBlock(currentBlock)) {
      return false;
    }

    if (currentBlock.previousHash !== previousBlock.hash) {
      return false;
    }
  }

  return true;
}
```

## Roadmap

- Enhance the UI/UX for a more engaging user experience.
- Add more interactive features to demonstrate advanced blockchain concepts.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Satoshi Nakamoto for the original blockchain concept [Bitcoin Whitepaper](https://bitcoin.org/bitcoin.pdf)
- The open-source community for continuous inspiration and support

## Contact

Rakibul Islam - [@rkshuvo007](https://x.com/rkshuvo007) - irakibul568@gmail.com

Project Link: [blockchain-demo.therakibul.me](https://blockchain-demo.therakibul.me/)
