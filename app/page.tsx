"use client";
import BlockCard from "@/components/blockCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Block from "@/lib/block";
import Blockchain from "@/lib/blockchain";
import { useEffect, useState } from "react";
export default function Home() {
  const [blockchain, setBlockchain] = useState<Blockchain | null>(null);
  const [difficulty, setDifficulty] = useState(3);
  useEffect(() => {
    const genesisBlock = new Block(0, "Genesis Block", "0", difficulty);
    const blockchain = new Blockchain(genesisBlock);

    for (let i = 1; i < 4; i++) {
      const previousBlock = blockchain.chain[i - 1];
      const newBlock = new Block(i, "", previousBlock.hash, difficulty);
      blockchain.addBlock(newBlock);
    }

    setBlockchain(blockchain);
  }, [difficulty]);

  const updateBlockData = (index: number, newData: string) => {
    if (!blockchain) return;

    const updatedBlockchain = new Blockchain(blockchain.chain[0]);
    updatedBlockchain.chain = [...blockchain.chain];

    // Update the block data and hash
    updatedBlockchain.chain[index].data = newData;
    updatedBlockchain.chain[index].hash =
      updatedBlockchain.chain[index].calculateHash();

    // Update subsequent blocks
    updateSubsequentBlocks(updatedBlockchain, index);

    setBlockchain(updatedBlockchain);
  };

  const updateSubsequentBlocks = (
    blockchain: Blockchain,
    startIndex: number
  ) => {
    for (let i = startIndex + 1; i < blockchain.chain.length; i++) {
      const previousBlock = blockchain.chain[i - 1];
      const currentBlock = blockchain.chain[i];

      currentBlock.previousHash = previousBlock.hash;
      currentBlock.hash = currentBlock.calculateHash();
    }
  };

  const isBlockValid = (block: Block, previousBlock: Block): boolean => {
    return (
      block.previousHash === previousBlock.hash &&
      block.hash === block.calculateHash() &&
      block.hash.startsWith("0".repeat(difficulty))
    );
  };

  const miningTheBlock = (block: Block) => {
    if (!blockchain) return;

    const updatedBlockchain = new Blockchain(blockchain.chain[0]);
    updatedBlockchain.chain = [...blockchain.chain];

    // Mine the block and update its hash
    updatedBlockchain?.chain[block.index].mine(difficulty);

    // Update subsequent blocks
    updateSubsequentBlocks(updatedBlockchain, block.index);

    setBlockchain(updatedBlockchain);
  };

  return (
    <div className="container relative mx-auto flex min-h-screen w-full max-w-3xl flex-col py-4 space-y-8">
      <h1 className="text-2xl font-bold text-center mb-8">Blockchain Demo</h1>

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
              mineBlock={() => miningTheBlock(block)}
            />
          );
        })}
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Add New Block</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="new-block-data">Input Data:</Label>
            <Input id="new-block-data" placeholder="Enter data for new block" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Add Block</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
