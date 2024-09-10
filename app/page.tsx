"use client";
import BlockCard from "@/components/blockCard";
import Footer from "@/components/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Block from "@/lib/block";
import Blockchain from "@/lib/blockchain";
import { Check, ChevronDown, ChevronUp, Info, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
export default function Home() {
  const [blockchain, setBlockchain] = useState<Blockchain | null>(null);
  const [difficulty, setDifficulty] = useState(3);
  const [newBlockData, setNewBlockData] = useState("");
  const [loadingBlocks, setLoadingBlocks] = useState<{
    [key: number]: boolean;
  }>({});
  const [showDetails, setShowDetails] = useState(false);
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
      <h1 className="text-4xl font-bold text-center m-8">Blockchain Demo</h1>

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
          <div className="bg-primary-foreground p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">What is Blockchain?</h2>
            <p className="text-muted-foreground mb-4">
              Blockchain is a decentralized, distributed ledger technology that
              records transactions across many computers so that the record
              cannot be altered retroactively without the alteration of all
              subsequent blocks.
            </p>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Key Features</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Decentralization: No single point of control</li>
                    <li>Transparency: All transactions are visible</li>
                    <li>Immutability: Once recorded, data cannot be altered</li>
                    <li>
                      Security: Cryptographic techniques ensure data integrity
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How It Works</AccordionTrigger>
                <AccordionContent>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Transactions are grouped into blocks</li>
                    <li>Miners verify and add blocks to the chain</li>
                    <li>
                      Each block contains a unique hash and links to the
                      previous block
                    </li>
                    <li>The chain is distributed across multiple nodes</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="space-y-4">
            <div className="bg-secondary p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Block Details</h3>
              <Button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full justify-between"
              >
                {showDetails ? "Hide Details" : "Show Details"}
                {showDetails ? (
                  <ChevronUp className="ml-2 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-2 h-4 w-4" />
                )}
              </Button>
              {showDetails && (
                <div className="mt-4 space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="block text-left">
                        <span className="font-semibold">Nonce:</span> A random
                        number used in mining
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          The nonce is adjusted to find a hash that meets the
                          difficulty criteria.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger className="block text-left">
                        <span className="font-semibold">Timestamp:</span> When
                        the block was created
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Helps maintain the chronological order of the
                          blockchain.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger className="block text-left">
                        <span className="font-semibold">Previous Hash:</span>{" "}
                        Hash of the previous block
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Links blocks together, creating the chain.</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger className="block text-left">
                        <span className="font-semibold">Data:</span> Information
                        stored in the block
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Can include transaction details or other relevant
                          information.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger className="block text-left">
                        <span className="font-semibold">Current Hash:</span>{" "}
                        Unique identifier of the block
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Generated from all other information in the block.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                Blockchain Security
              </h3>
              <p className="text-sm text-muted-foreground">
                Blockchain&apos;s security relies on cryptographic hashing and
                the distributed nature of the network. Each block&apos;s hash
                depends on the previous block, creating a tamper-evident chain.
              </p>
              <Button className="mt-2" variant="outline">
                Learn More <Info className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">How Mining Works</h3>
            <p className="text-muted-foreground">
              Mining is the process of adding transaction records to the
              blockchain. Miners use special software to solve mathematical
              problems and are issued a certain number of bitcoins in exchange.
              This provides a smart way to issue the currency and also creates
              an incentive for more people to mine.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
