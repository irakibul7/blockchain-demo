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
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
export default function Home() {
  const [blockchain, setBlockchain] = useState<Blockchain | null>(null);
  const [difficulty, setDifficulty] = useState(3);
  const [newBlockData, setNewBlockData] = useState("");
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

  const addNewBlock = () => {
    if (!blockchain) return;

    const newBlock = new Block(
      blockchain.chain.length,
      newBlockData,
      blockchain.chain[blockchain.chain.length - 1].hash,
      difficulty
    );
    const updatedBlockchain = new Blockchain(blockchain.chain[0]);
    updatedBlockchain.chain = [...blockchain.chain, newBlock];

    setBlockchain(updatedBlockchain);
    setNewBlockData("");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8">Blockchain Demo</h1>

      <div>
        {blockchain &&
          blockchain.chain.map((block, index) => {
            const isValid =
              index === 0 || isBlockValid(block, blockchain?.chain[index - 1]);

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
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Add New Block</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="new-block-data">Input Data:</Label>
            <Input
              id="new-block-data"
              placeholder="Enter data for new block"
              value={newBlockData}
              onChange={(e) => setNewBlockData(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={addNewBlock} className="w-full">
            Add Block <ChevronRight className="ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
