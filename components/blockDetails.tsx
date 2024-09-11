"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const BlockDetails = () => {
  const [showDetails, setShowDetails] = useState(false);
  return (
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
        <div className="mt-4 space-y-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="block text-left text-md">
                <span className="font-semibold">Index:</span> The position of
                the block in the chain
              </TooltipTrigger>
              <TooltipContent>
                <p>Indicates the order of blocks in the blockchain.</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="block text-left text-md">
                <span className="font-semibold">Timestamp:</span> When the block
                was created
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  A UNIX timestamp (seconds since January 1st, 1970)
                  establishing the blockchain as a chronological time-based
                  structure.
                </p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="block text-left">
                <span className="font-semibold">Hash:</span> Digital fingerprint
                of the block
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Calculated from the block&quot;s contents (index, timestamp,
                  previous hash, data, and nonce). Not stored in the block
                  itself.
                </p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="block text-left">
                <span className="font-semibold">Previous Hash:</span> Hash of
                the previous block
              </TooltipTrigger>
              <TooltipContent>
                <p>Links blocks together, creating the chain.</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="block text-left">
                <span className="font-semibold">Data:</span> Information stored
                in the block
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Can include transaction details or other relevant information.
                  In cryptocurrencies like Bitcoin, this would include money
                  transactions.
                </p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="block text-left">
                <span className="font-semibold">Nonce:</span> Number used to
                find a valid hash
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Adjusted to find a hash that meets the difficulty criteria
                  during the mining process.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">
              How is the block hash calculated?
            </h4>
            <p className="text-sm text-muted-foreground">
              A hashing function takes data as input and returns a unique hash:
            </p>
            <pre className="bg-muted p-2 rounded mt-2 text-sm overflow-x-auto">
              f ( index + previous hash + timestamp + data + nonce )
            </pre>
            <p className="text-sm text-muted-foreground mt-2">
              For example, the genesis block hash might be calculated as:
            </p>
            <pre className="bg-muted p-2 rounded mt-2 text-sm overflow-x-auto">
              f ( 0 + &quot;0&quot; + 1508270000000 + &quot;Genesis Block&quot;
              + 604 )
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockDetails;
