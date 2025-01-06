import SearchInput from "@/components/SearchInput";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-chatgpt-light to-white p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Let me ChatGPT that for you
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Generate shareable ChatGPT links for your questions
        </p>
      </div>
      
      <SearchInput />
      
      <footer className="fixed bottom-4 text-center text-gray-500 text-sm">
        Made by <a href="https://x.com/ramiabih" target="_blank" rel="noopener noreferrer" className="text-chatgpt-primary hover:text-chatgpt-secondary underline">Rami</a>
      </footer>
    </div>
  );
};

export default Index;