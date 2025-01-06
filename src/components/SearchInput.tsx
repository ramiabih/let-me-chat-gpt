import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const SearchInput = () => {
  const [question, setQuestion] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const { toast } = useToast();

  const generateUrl = () => {
    if (!question.trim()) {
      toast({
        title: "Please enter a question",
        variant: "destructive",
      });
      return;
    }
    
    const url = `https://chat.openai.com/?q=${encodeURIComponent(question)}`;
    // In a real app, you'd call an API to shorten the URL
    setShortenedUrl(url);
    console.log("Generated URL:", url);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortenedUrl);
      toast({
        title: "URL copied to clipboard!",
        description: "You can now share it with others",
      });
    } catch (err) {
      console.error("Failed to copy:", err);
      toast({
        title: "Failed to copy URL",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="Enter your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="pr-24 text-lg h-12"
        />
        <Button
          onClick={generateUrl}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-chatgpt-primary hover:bg-chatgpt-secondary"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Generate
        </Button>
      </div>
      
      {shortenedUrl && (
        <div className="relative mt-4">
          <Input
            type="text"
            value={shortenedUrl}
            readOnly
            className="pr-12"
          />
          <Button
            onClick={copyToClipboard}
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchInput;