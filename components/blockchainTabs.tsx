"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Network,
  Shield,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
const BlockchainTabs = () => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  const checkForArrows = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    checkForArrows();
    window.addEventListener("resize", checkForArrows);
    return () => window.removeEventListener("resize", checkForArrows);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (tabsRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      tabsRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      {showLeftArrow && (
        <Button
          variant="outline"
          size="icon"
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 rounded-full"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
      {showRightArrow && (
        <Button
          variant="outline"
          size="icon"
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-10  rounded-full"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}

      <Tabs defaultValue="blockchain" className="mb-8">
        <div
          ref={tabsRef}
          className="overflow-x-auto scrollbar-hide"
          onScroll={checkForArrows}
        >
          <TabsList className="inline-flex w-max border-b border-b-transparent p-1">
            <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
            <TabsTrigger value="p2p">P2P Network</TabsTrigger>
            <TabsTrigger value="mining">Mining</TabsTrigger>
            <TabsTrigger value="pow">Proof of Work</TabsTrigger>
            <TabsTrigger value="51attack">51% Attack</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="blockchain">
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
        </TabsContent>
        <TabsContent value="p2p">
          <div className="bg-primary-foreground p-6 rounded-lg">
            <div className="flex mb-4 space-x-2 items-center justify-center">
              <h2 className="text-xl font-semibold">
                P2P Network in Blockchain
              </h2>
              <Network className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground mb-4">
                A P2P (Peer-to-Peer) network is a crucial component of
                blockchain technology. In a blockchain P2P network:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  Each node (computer) in the network acts as both a client and
                  a server
                </li>
                <li>
                  All nodes are equal and share the responsibility of storing
                  and validating the blockchain
                </li>
                <li>
                  New transactions and blocks are broadcast to all nodes in the
                  network
                </li>
                <li>
                  This decentralized structure enhances security and eliminates
                  single points of failure
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="mining">
          <div className="bg-primary-foreground p-6 rounded-lg">
            <div className="flex mb-4 space-x-2 items-center justify-center">
              <h2 className="text-xl font-semibold">Mining in Blockchain</h2>
              <Cpu className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground mb-4">
                Mining is the process of adding new blocks to the blockchain.
                Miners:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Collect and verify pending transactions</li>
                <li>Solve complex mathematical problems (Proof of Work)</li>
                <li>Create new blocks and add them to the blockchain</li>
                <li>Are rewarded with cryptocurrency for their efforts</li>
              </ul>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="pow">
          <div className="bg-primary-foreground p-6 rounded-lg">
            <div className="flex mb-4 space-x-2 items-center justify-center">
              <h2 className="text-xl font-semibold">Proof of Work (PoW)</h2>
              <Shield className="h-6 w-6 text-primary" />
            </div>

            <div>
              <p className="text-muted-foreground mb-4">
                Proof of Work is a consensus mechanism used in many blockchain
                networks, including Bitcoin. In PoW:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Miners compete to solve complex mathematical puzzles</li>
                <li>
                  The first miner to solve the puzzle gets to add the next block
                </li>
                <li>
                  The puzzle involves finding a hash that starts with a certain
                  number of zeros
                </li>
                <li>
                  The difficulty of the puzzle is adjusted to maintain a
                  consistent block time
                </li>
              </ul>
              <p className="text-muted-foreground mt-4">
                PoW ensures that adding new blocks is computationally expensive,
                making it difficult and costly to attack or manipulate the
                blockchain.
              </p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="51attack">
          <div className="bg-primary-foreground p-6 rounded-lg">
            <div className="flex mb-4 space-x-2 items-center justify-center">
              <h2 className="text-xl font-semibold">51% Attack</h2>
              <AlertTriangle className="h-6 w-6 text-primary" />
            </div>

            <div>
              <p className="text-muted-foreground mb-4">
                A 51% attack is a potential threat to blockchain networks where
                an entity gains control of more than 50% of the network&apos;s
                mining power. This scenario:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Allows the attacker to potentially reverse transactions</li>
                <li>Enables double-spending of coins</li>
                <li>Can prevent new transactions from gaining confirmations</li>
                <li>
                  Might allow the attacker to exclude or modify the ordering of
                  transactions
                </li>
              </ul>
              <p className="text-muted-foreground mt-4">
                While theoretically possible, a 51% attack is extremely
                difficult and costly to execute on large, established blockchain
                networks. The attacker would need to invest in enormous
                computational power, and the attack&apos;s success could
                potentially devalue the very cryptocurrency they&apos;re
                attacking.
              </p>
              <p className="text-muted-foreground mt-4">
                Blockchain networks implement various measures to prevent and
                mitigate the risk of 51% attacks, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  Increasing the number of confirmations required for large
                  transactions
                </li>
                <li>
                  Implementing checkpoints to prevent deep reorganizations of
                  the blockchain
                </li>
                <li>Encouraging decentralization of mining power</li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlockchainTabs;
