'use client';
import { Bot, Loader2, Send, User2 } from 'lucide-react';
import { useChat } from './api/genai/useChat'; // Update the path accordingly
import Markdown from './component/markdown';

const Home: React.FC = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat('/api/genai');

  const RenderForm = () => {
    return (
      <form
        onSubmit={(event) => {
          handleSubmit(event, {
            data: {
              prompt: input,
            },
          });
        }}
        className="w-full flex flex-row gap-2 items-center h-full"
      >
        <input
          type="text"
          placeholder={isLoading ? 'Generaing...' : 'ask something...'}
          className="border-b border-dashed outline-none w-full px-4 py-2 text-[#0842A0] placeholder:text-[#0842A099] text-right focus:placeholder-transparent disabled:bg-transparent"
          value={input}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="rounded-full shadow-md border flex flex-row"
        >
          {isLoading ? (
            <Loader2
              onClick={stop}
              className="p-3 h-10 w-10 stroke-stone-500 animate-spin"
            />
          ) : (
            <Send className="p-3 h-10 w-10 stroke-stone-500" />
          )}
        </button>
      </form>
    );
  };

  const RenderMessages = () => {
    return (
      <div
        id="chatbot"
        className="flex flex-col-reverse w-full text-left mt-4 gap-4 whitespace-pre-wrap"
      >
        {messages.map((m, index) => (
          <div
            key={index}
            className={`p-4 shadow-md rounded-md ml-10 relative ${
              m.role === 'user' ? 'bg-stone-300' : ''
            }`}
          >
            {/* <Markdown text={m.content} /> */}
            {m.content}
            {m.role === 'user' ? (
              <User2 className="absolute top-2 -left-10 border rounded-full p-1 shadow-lg stroke-[#010109]" />
            ) : (
              <Bot className="absolute top-2 -left-10 border rounded-full p-1 shadow-lg stroke-[#0842A0]" />
              // <Bot
              //   className={`absolute top-2 -left-10 border rounded-full p-1 shadow-lg stroke-[#0842A0] ${
              //     isLoading && index === messages.length - 1
              //       ? 'animate-bounce'
              //       : ''
              //   }`}
              // />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      {RenderForm()}
      {RenderMessages()}
      {/* {JSON.stringify(messages)} */}
    </main>
  );
};

export default Home;
