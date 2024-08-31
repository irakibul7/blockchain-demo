import Block from "@/lib/block";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
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
  return (
    <Card
      className={`w-full mb-8 relative bg-white text-gray-800 border ${
        isValid ? "border-green-500" : "border-red-500"
      }`}
    >
      <CardHeader>
        <CardTitle>Block #{block.index + 1}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-1 gap-2">
          <Label>
            Nonce: <span>{block.nonce}</span>
          </Label>

          <Label>
            Timestamp:
            <span>{new Date(block.timestamp).toLocaleString()}</span>
          </Label>
          <div className="flex items-center gap-2">
            <Label>Previous Hash:</Label>
            <span className="bg-slate-200  text-gray-700 text-sm  block w-full p-1 truncate">
              {block.previousHash}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Label>Hash:</Label>
            <span
              className={`${
                isValid
                  ? "bg-green-100  text-green-900"
                  : "bg-red-100 text-red-900"
              } text-sm block w-full p-1   truncate`}
            >
              {block.hash}
            </span>
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor={`data-${block.index}`}>Data:</Label>
          <Input
            id={`data-${block.index}`}
            value={block.data}
            onChange={(e) => onDataChange(block.index, e.target.value)}
            placeholder="Enter block data"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="" onClick={() => mineBlock()}>
          Mine
        </Button>
      </CardFooter>
      {block.index > 0 && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <ChevronDown className="w-8 h-8 text-primary" />
        </div>
      )}
    </Card>
  );
};

export default BlockCard;
