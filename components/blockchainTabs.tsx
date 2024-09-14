"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Coins,
  Cpu,
  Database,
  Globe,
  Key,
  Network,
  Shield,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const BlockchainTabs = () => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  const checkForArrows = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth, tabIndex } =
        tabsRef.current;

      console.log("🚀 ~ checkForArrows ~ tabIndex:", tabIndex);
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
      // active tab index
      const tabIndex = tabsRef.current.tabIndex;
      console.log("🚀 ~ scroll ~ tabIndex:", tabIndex);
      const scrollAmount = direction === "left" ? -200 : 200;
      tabsRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleTabChange = (value: "left" | "right") => {
    console.log(`Switched to tab: ${value}`);
    scroll(value);
  };

  return (
    <div className="relative w-full">
      {showLeftArrow && (
        <Button
          variant="outline"
          size="icon"
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 rounded-full"
          onClick={() => handleTabChange("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
      {showRightArrow && (
        <Button
          variant="outline"
          size="icon"
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 rounded-full"
          onClick={() => handleTabChange("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}

      <Tabs defaultValue="blockchain" className="mb-8 w-full">
        <div
          ref={tabsRef}
          className="overflow-x-auto"
          onScroll={checkForArrows}
        >
          <TabsList className="inline-flex w-max border-b border-b-transparent p-1">
            <TabsTrigger value="blockchain" tabIndex={0}>
              Blockchain
            </TabsTrigger>
            <TabsTrigger value="web3" tabIndex={1}>
              Web3
            </TabsTrigger>
            <TabsTrigger value="p2p" tabIndex={2}>
              P2P Network
            </TabsTrigger>
            <TabsTrigger value="mining" tabIndex={3}>
              Mining
            </TabsTrigger>

            <TabsTrigger value="pow" tabIndex={4}>
              Proof of Work
            </TabsTrigger>
            <TabsTrigger value="51attack" tabIndex={5}>
              51% Attack
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="blockchain">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center space-x-2">
                <span className="text-2xl font-bold">Blockchain</span>
                <Database className="h-6 w-6 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Blockchain is a decentralized, distributed ledger technology
                that records transactions across many computers so that the
                record cannot be altered retroactively without the alteration of
                all subsequent blocks.
              </p>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="key-features">
                  <AccordionTrigger>Key Features</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Decentralization: No single point of control</li>
                      <li>Transparency: All transactions are visible</li>
                      <li>
                        Immutability: Once recorded, data cannot be altered
                      </li>
                      <li>
                        Security: Cryptographic techniques ensure data integrity
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="how-it-works">
                  <AccordionTrigger>How It Works</AccordionTrigger>
                  <AccordionContent>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="p2p">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center space-x-2">
                <span className="text-2xl font-bold">
                  P2P Network in Blockchain
                </span>
                <Network className="h-6 w-6 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mining">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center space-x-2">
                <span className="text-2xl font-bold">Mining in Blockchain</span>
                <Cpu className="h-6 w-6 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="web3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center space-x-2">
                <span className="text-2xl font-bold">Web3</span>
                <Network className="h-6 w-6 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Web3 represents the next evolution of the internet, built on
                decentralized technologies like blockchain. It aims to create a
                more open, trustless, and permissionless web ecosystem.
              </p>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="web-evolution">
                  <AccordionTrigger>Evolution of the Web</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Globe className="h-5 w-5 text-primary" />
                        <span className="font-semibold">Web1 (1989-2004):</span>
                        <span className="text-muted-foreground">
                          Read-only, static websites
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-primary" />
                        <span className="font-semibold">
                          Web2 (2004-present):
                        </span>
                        <span className="text-muted-foreground">
                          Read-write, interactive, social web
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Database className="h-5 w-5 text-primary" />
                        <span className="font-semibold">Web3 (emerging):</span>
                        <span className="text-muted-foreground">
                          Read-write-own, decentralized web
                        </span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="web3-features">
                  <AccordionTrigger>Key Features of Web3</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>
                        Decentralization: No single point of control or failure
                      </li>
                      <li>Trustless: Interactions without intermediaries</li>
                      <li>
                        Permissionless: Open participation without gatekeepers
                      </li>
                      <li>
                        Native payments: Built-in monetary system using
                        cryptocurrencies
                      </li>
                      <li>
                        Self-sovereign identity: Users control their digital
                        identities
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="web3-technologies">
                  <AccordionTrigger>Core Technologies</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <span className="font-semibold flex items-center">
                          <Key className="h-4 w-4 mr-2" /> Blockchain:{" "}
                        </span>
                        <span className="text-muted-foreground">
                          Decentralized, immutable ledger for recording
                          transactions
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold flex items-center">
                          <Coins className="h-4 w-4 mr-2" /> Cryptocurrencies:{" "}
                        </span>
                        <span className="text-muted-foreground">
                          Digital assets for value transfer and incentivization
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold flex items-center">
                          <Database className="h-4 w-4 mr-2" /> Smart Contracts:{" "}
                        </span>
                        <span className="text-muted-foreground">
                          Self-executing code for automating agreements
                        </span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="web3-applications">
                  <AccordionTrigger>Web3 Applications</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>
                        Decentralized Finance (DeFi): Peer-to-peer financial
                        services
                      </li>
                      <li>Non-Fungible Tokens (NFTs): Unique digital assets</li>
                      <li>
                        Decentralized Autonomous Organizations (DAOs):
                        Community-governed entities
                      </li>
                      <li>
                        Decentralized Identity: Self-sovereign identity
                        management
                      </li>
                      <li>
                        Decentralized Storage: Distributed file storage systems
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pow">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center space-x-2">
                <span className="text-2xl font-bold">Proof of Work (PoW)</span>
                <Shield className="h-6 w-6 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="51attack">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center space-x-2">
                <span className="text-2xl font-bold">51% Attack</span>
                <AlertTriangle className="h-6 w-6 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
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
              <p
                className="text-muted-fore
ground mt-4"
              >
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlockchainTabs;
