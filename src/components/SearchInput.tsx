import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ChatGPTAnimation from './ChatGPTAnimation';

const SearchInput = () => {
  const [question, setQuestion] = useState('');
  const [urls, setUrls] = useState<{ direct: string; withAnimation: string } | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const { toast } = useToast();

  const generateUrls = () => {
    if (!question.trim()) {
      toast({
        title: "Please enter a question",
        variant: "destructive",
      });
      return;
    }
    
    const directUrl = `https://chat.openai.com/?q=${encodeURIComponent(question)}`;
    const animationUrl = `https://animate.lmcgtfy.com/${encodeURIComponent(question)}`; // Now includes the question in the URL
    
    const urls = {
      direct: directUrl,
      withAnimation: animationUrl
    };
    
    setUrls(urls);
    console.log("Generated URLs:", urls);
  };

  const copyToClipboard = async (url: string, type: 'direct' | 'fun') => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: `${type === 'direct' ? 'Direct' : 'Fun'} URL copied to clipboard!`,
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

  const handleRedirect = (url: string) => {
    if (url.includes('animate.lmcgtfy.com')) {
      setShowAnimation(true);
    } else {
      window.open(url, '_blank');
    }
  };

  const handleAnimationComplete = () => {
    if (urls?.direct) {
      window.open(urls.direct, '_blank');
      setShowAnimation(false);
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
          onClick={generateUrls}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-chatgpt-primary hover:bg-chatgpt-secondary"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Generate
        </Button>
      </div>
      
      {urls && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Passive Aggressive URL (with animation)</label>
            <div className="relative">
              <Input
                type="text"
                value={urls.withAnimation}
                readOnly
                className="pr-24"
              />
              <Button
                onClick={() => copyToClipboard(urls.withAnimation, 'fun')}
                variant="ghost"
                className="absolute right-12 top-1/2 -translate-y-1/2"
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => handleRedirect(urls.withAnimation)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-chatgpt-primary hover:bg-chatgpt-secondary px-2"
              >
                Go
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Normal URL (direct to ChatGPT)</label>
            <div className="relative">
              <Input
                type="text"
                value={urls.direct}
                readOnly
                className="pr-24"
              />
              <Button
                onClick={() => copyToClipboard(urls.direct, 'direct')}
                variant="ghost"
                className="absolute right-12 top-1/2 -translate-y-1/2"
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => handleRedirect(urls.direct)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-chatgpt-primary hover:bg-chatgpt-secondary px-2"
              >
                Go
              </Button>
            </div>
          </div>
        </div>
      )}

      {showAnimation && (
        <ChatGPTAnimation
          question={question}
          onComplete={handleAnimationComplete}
        />
      )}
    </div>
  );
};

export default SearchInput;