"use client";
import BlockCard from "@/components/blockCard";
import Block from "@/lib/block";
import Blockchain from "@/lib/blockchain";
import { useEffect, useState } from "react";
export default function Home() {
  const [blockchain, setBlockchain] = useState<Blockchain | null>(null);
  const [difficulty, setDifficulty] = useState(1);
  useEffect(() => {
    const blockchain = new Blockchain(difficulty);
    for (let i = 1; i < 4; i++) {
      const newBlock = new Block(i, "", blockchain.chain[i - 1].hash);
      newBlock.mine(difficulty);
      blockchain.addBlock(newBlock);
    }
    // console.log(blockchain.isValid());
    setBlockchain(blockchain);
  }, []);

  const updateBlockData = (index: number, newData: string) => {
    const updatedBlockchain = { ...blockchain };

    if (updatedBlockchain && updatedBlockchain.chain) {
      // update the data of the block at the given index
      updatedBlockchain.chain[index].data = newData;
      const newHash = updatedBlockchain.chain[index].calculateHash();
      updatedBlockchain.chain[index].hash = newHash;

      // update the previousHash and hash of the next block
      for (let i = index + 1; i < updatedBlockchain.chain?.length; i++) {
        updatedBlockchain.chain[i].previousHash =
          updatedBlockchain.chain[i - 1].hash;
        updatedBlockchain.chain[i].hash =
          updatedBlockchain.chain[i].calculateHash();
      }

      setBlockchain(updatedBlockchain);
    }
  };

  const isBlockValid = (block: Block, previousBlock: Block) => {
    if (block.previousHash !== previousBlock.hash) return false;
    if (block.hash !== block.calculateHash()) return false;
    if (!block.hash.startsWith("0".repeat(difficulty))) return false;
    return true;
  };

  return (
    <div className="p-5">
      <h1>Blockchain</h1>
      {blockchain &&
        blockchain.chain.map((block, index) => {
          const isValid =
            index === 0 || isBlockValid(block, blockchain?.chain[index - 1]);
          console.log("isvalid", isValid);
          return (
            <BlockCard
              key={index}
              block={block}
              isValid={isValid}
              onDataChange={updateBlockData}
            />
          );
        })}
    </div>
  );
}
