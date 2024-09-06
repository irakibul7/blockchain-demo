# Blockchain Illustrator

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

1. **Creating a Block**:

   - Enter data into the provided input field.
   - Click the "Create Block" button to add a new block to the chain.

2. **Mining a Block**:

   - Select an unmined block from the chain.
   - Click the "Mine Block" button to start the mining process.
   - Observe how the block's hash changes and meets the difficulty criteria.

3. **Viewing the Chain**:

   - Scroll through the visual representation of the blockchain.
   - Each block displays its data, hash, and link to the previous block.

4. **Tampering Demonstration**:
   - Select any block in the chain.
   - Modify the data in the block.
   - Observe how this change affects the current block's hash and invalidates all subsequent blocks.

## Technologies Used

- Next.js
- SHA-256 Hashing Algorithm

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Satoshi Nakamoto for the original blockchain concept
- The open-source community for continuous inspiration and support

## Contact

Rakibul Islam - [@rkshuvo007](https://x.com/rkshuvo007) - irakibul568@gmail.com

Project Link: [blockchain-demo.therakibul.me](https://blockchain-demo.therakibul.me/)
