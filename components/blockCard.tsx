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
import { TooltipProvider } from "@/components/ui/tooltip";
import Block from "@/lib/block";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ChevronDown, Clock, Hash, Key, RefreshCcw } from "lucide-react";
import { useState } from "react";

type BlockCardProps = {
  block: Block;
  isValid: boolean;
  onDataChange: (index: number, newData: string) => void;
  mineBlock: () => void;
};

const BlockCard = ({
  block,
  isValid,
  onDataChange,
  mineBlock,
}: BlockCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <TooltipProvider>
      <Card
        className={`w-full mx-auto mb-8 relative transition-all duration-300 ease-in-out ${
          isValid
            ? "border-green-500 shadow-green-100"
            : "border-red-500 shadow-red-100"
        } ${isHovered ? "shadow-2xl" : "shadow-md"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold text-primary">
            Block #{block.index + 1}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-1 gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Nonce:</span> {block.nonce}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Number used once for mining</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Timestamp:</span>
                  <span className="truncate">
                    {new Date(block.timestamp).toLocaleString()}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Time when the block was created</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="space-y-1">
                  <Label className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-muted-foreground" />
                    Previous Hash:
                  </Label>
                  <div className="bg-muted p-2 rounded-md">
                    <span className="text-xs font-mono break-all">
                      {block.previousHash}
                    </span>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Hash of the previous block in the chain</p>
              </TooltipContent>
            </Tooltip>
            <div className="space-y-2">
              <Label
                htmlFor={`data-${block.index}`}
                className="flex items-center gap-2"
              >
                <RefreshCcw className="w-4 h-4 text-muted-foreground" />
                Data:
              </Label>
              <Input
                id={`data-${block.index}`}
                value={block.data}
                onChange={(e) => onDataChange(block.index, e.target.value)}
                placeholder="Enter block data"
                className="font-mono"
              />
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="space-y-1">
                  <Label className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-muted-foreground" />
                    Current Hash:
                  </Label>
                  <div
                    className={`p-2 rounded-md ${
                      isValid
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    <span className="text-xs font-mono break-all">
                      {block.hash}
                    </span>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Unique identifier for this block</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={mineBlock}
            variant={isValid ? "outline" : "default"}
          >
            {isValid ? "Re-Mine Block" : "Mine Block"}
          </Button>
        </CardFooter>
        {block.index > 0 && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-background p-1 rounded-full shadow">
              <ChevronDown className="w-6 h-6 text-primary" />
            </div>
          </div>
        )}
      </Card>
    </TooltipProvider>
  );
};

export default BlockCard;
