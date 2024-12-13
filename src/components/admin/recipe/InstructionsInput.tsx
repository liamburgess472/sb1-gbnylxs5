import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface InstructionsInputProps {
  instructions: string[];
  onChange: (instructions: string[]) => void;
}

export function InstructionsInput({ instructions, onChange }: InstructionsInputProps) {
  const handleInput = (value: string) => {
    // Store the entire text as a single instruction
    onChange([value.trim()].filter(Boolean));
  };

  const getInstructionsText = () => {
    return instructions[0] || '';
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>Cooking Instructions</Label>
        <span className="text-sm text-muted-foreground">
          Enter the complete cooking instructions
        </span>
      </div>

      <Textarea
        value={getInstructionsText()}
        onChange={(e) => handleInput(e.target.value)}
        placeholder="Enter the complete cooking instructions here..."
        className="min-h-[300px] font-mono"
      />
    </div>
  );
}