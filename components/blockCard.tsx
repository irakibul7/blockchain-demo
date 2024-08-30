import Block from "@/lib/block";
type BlockCardProps = {
  block: Block;
  isValid: boolean;
  onDataChange: (index: number, newData: string) => void;
};

const BlockCard = ({ block, isValid, onDataChange }: BlockCardProps) => {
  return (
    <div
      className={`border p-5 ${
        isValid ? "border-green-500" : "border-red-500"
      } transition-colors duration-300`}
    >
      <h2 className="text-lg font-bold">Block #{block.index + 1}</h2>
      {/* display block.data in the input field with the label DATA */}
      <label className="block mt-4">DATA</label>
      <input
        type="text"
        value={block.data}
        onChange={(e) => onDataChange(block.index, e.target.value)}
        placeholder="Enter block data"
      />
      <div>
        <label className="text-sm font-medium">Hash:</label>
        <input
          className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
          value={block.hash}
          readOnly
        />
      </div>
      <div>
        <label className="text-sm font-medium">Previous Hash:</label>
        <input
          className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
          value={block.previousHash}
          readOnly
        />
      </div>
      <div>
        <label className="text-sm font-medium">Nonce:</label>
        <input
          className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
          value={block.nonce}
          readOnly
        />
      </div>
      <div>
        <label className="text-sm font-medium">Timestamp:</label>
        <input
          className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
          value={new Date(block.timestamp).toLocaleString()}
          readOnly
        />
      </div>
    </div>
  );
};

export default BlockCard;
