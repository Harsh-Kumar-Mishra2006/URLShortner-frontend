import React, { useState } from "react";
import Button from "./Button";

interface CopyButtonProps {
  text: string;
  className?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text, className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className={`gap-2 ${className}`}
    >
      {copied ? (
        <>
          <span className="text-green-600">✓</span>
          Copied
        </>
      ) : (
        <>
          <span>📋</span>
          Copy
        </>
      )}
    </Button>
  );
};

export default CopyButton;
