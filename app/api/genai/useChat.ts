import { useState, ChangeEvent, FormEvent } from 'react';

export function useChat(apiEndpoint: string) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (
    e: FormEvent,
    data: { data: { prompt: string } }
  ) => {
    e.preventDefault();
    setIsLoading(true);
    const newMessage = { role: 'user', content: input };
    setMessages([...messages, newMessage]);

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      const botMessage = { role: 'bot', content: responseData.content };
      setMessages([...messages, newMessage, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }

    setInput('');
  };

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop: () => setIsLoading(false),
  };
}
