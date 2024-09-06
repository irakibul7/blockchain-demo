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
import {
  Clock,
  Hash,
  Key,
  Pickaxe,
  RefreshCcw,
  RefreshCw,
  Unlink,
  Unlink2,
} from "lucide-react";
import { useState } from "react";

type BlockCardProps = {
  block: Block;
  isValid: boolean;
  onDataChange: (index: number, newData: string) => void;
  mineBlock: () => void;
  isLoading: boolean;
};

const BlockCard = ({
  block,
  isValid,
  onDataChange,
  mineBlock,
  isLoading,
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
        <CardHeader className="pb-2 flex items-center relative">
          <CardTitle className="text-2xl font-bold text-primary">
            Block #{block.index + 1}
          </CardTitle>
          {block.index === 0 && (
            <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 absolute top-0 right-0">
              Genesis
            </span>
          )}
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="grid grid-cols-1 gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Label className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Nonce:</span>
                  <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                    {" "}
                    {block.nonce}
                  </span>
                </Label>
              </TooltipTrigger>
              <TooltipContent>
                <p>Number used once for mining</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Label className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Timestamp:</span>
                  <span className="truncate">
                    {new Date(block.timestamp).toUTCString()}
                  </span>
                </Label>
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
        <CardFooter className="flex items-center justify-center">
          <Button
            className="rounded-full bg-slate-700"
            onClick={mineBlock}
            disabled={isValid}
          >
            Mine Block{" "}
            {isLoading ? (
              <RefreshCw className="ml-1 h-5 w-5 animate-spin" />
            ) : (
              <Pickaxe className="ml-1 h-5 w-5" />
            )}
          </Button>
        </CardFooter>
        {block.index > 0 && (
          <div className="absolute -top-9 left-1/2 transform -translate-x-1/2">
            <div className="bg-background me-2 px-1 py-0.5 rounded-md">
              {/* <ChevronDown className="w-6 h-6 text-primary" />
              <Unlink className="w-6 h-6 text-primary" /> */}
              {isValid ? (
                <>
                  <Unlink2 className="w-4 h-4 text-primary rotate-90" />
                  <Unlink2 className="w-4 h-4 text-primary rotate-90" />
                </>
              ) : (
                <>
                  <Unlink className="w-4 h-4 text-primary -rotate-45" />
                  <Unlink className="w-4 h-4 text-primary -rotate-45" />
                </>
              )}
            </div>
          </div>
        )}
      </Card>
    </TooltipProvider>
  );
};

export default BlockCard;
