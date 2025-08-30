import { useState } from 'react';

interface CopyButtonProps {
  text: string;
  children: React.ReactNode;
}

export function CopyButton({ text, children }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="bg-green-600 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-green-700"
    >
      {copied ? 'Copiado!' : children}
    </button>
  );
}
