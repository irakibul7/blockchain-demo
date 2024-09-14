"use client";
import BlockCard from "@/components/blockCard";
import BlockchainTabs from "@/components/blockchainTabs";
import BlockDetails from "@/components/blockDetails";
import Footer from "@/components/footer";
import Terminology from "@/components/terminology";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Block from "@/lib/block";
import Blockchain from "@/lib/blockchain";
import { Check, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
export default function Home() {
  const [blockchain, setBlockchain] = useState<Blockchain | null>(null);
  const [difficulty, setDifficulty] = useState(3);
  const [newBlockData, setNewBlockData] = useState("");
  const [loadingBlocks, setLoadingBlocks] = useState<{
    [key: number]: boolean;
  }>({});

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const maxCharacters = 500;

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
    if (!previousBlock) return block.hash.startsWith("0".repeat(difficulty));
    return (
      block.previousHash === previousBlock.hash &&
      block.hash === block.calculateHash() &&
      block.hash.startsWith("0".repeat(difficulty))
    );
  };

  const miningTheBlock = (block: Block) => {
    if (!blockchain) return;
    setLoadingBlocks((prev) => ({ ...prev, [block.index]: true }));

    setTimeout(() => {
      const updatedBlockchain = new Blockchain(blockchain.chain[0]);
      updatedBlockchain.chain = [...blockchain.chain];

      // Mine the block and update its hash
      updatedBlockchain?.chain[block.index].mine(difficulty);
      // Update subsequent blocks
      updateSubsequentBlocks(updatedBlockchain, block.index);
      setBlockchain(updatedBlockchain);
      setLoadingBlocks((prev) => ({ ...prev, [block.index]: false }));
    }, 2000);
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
    setIsDrawerOpen(false);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center m-8">
        Blockchain Demo
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {blockchain &&
            blockchain.chain.map((block, index) => {
              const isValid = isBlockValid(block, blockchain?.chain[index - 1]);

              return (
                <BlockCard
                  key={index}
                  block={block}
                  isValid={isValid}
                  isLoading={loadingBlocks[block.index] || false}
                  onDataChange={updateBlockData}
                  mineBlock={() => miningTheBlock(block)}
                />
              );
            })}

          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <div className="flex justify-center">
              <DrawerTrigger asChild>
                <Button className="flex items-center">
                  Add Block <Plus className="ml-2 h-4 w-4" />
                </Button>
              </DrawerTrigger>
            </div>
            <DrawerContent>
              <div className="mx-auto w-full max-w-lg">
                <DrawerHeader>
                  <DrawerTitle className="text-2xl font-bold">
                    Add New Block
                  </DrawerTitle>
                  <DrawerDescription>
                    Enter the data for your new block. This could be transaction
                    details, contract information, or any other relevant data.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-base font-semibold"
                    >
                      Block Data
                    </Label>
                    <Textarea
                      placeholder="Enter your block data here..."
                      id="message"
                      value={newBlockData}
                      onChange={(e) => setNewBlockData(e.target.value)}
                      className="min-h-[150px]"
                      maxLength={maxCharacters}
                    />
                    <p className="text-sm text-muted-foreground text-right">
                      {newBlockData.length}/{maxCharacters} characters
                    </p>
                  </div>
                </div>

                <DrawerFooter className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                  <DrawerClose asChild>
                    <Button variant="outline" className="sm:w-auto">
                      <X className="mr-2 h-4 w-4" /> Cancel
                    </Button>
                  </DrawerClose>
                  <Button
                    onClick={addNewBlock}
                    disabled={newBlockData.trim().length === 0}
                    className="sm:w-auto"
                  >
                    <Check className="mr-2 h-4 w-4" /> Add Block
                  </Button>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="space-y-4">
          <BlockchainTabs />
          <div className="space-y-4">
            <BlockDetails />
          </div>
          <div className="space-y-4">
            <Terminology />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
