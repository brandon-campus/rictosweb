
import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, User, RefreshCw } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hola, soy Jamito 👋 Tu asistente para encontrar el lugar perfecto. ¿Qué estás buscando hoy?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateBotResponse = (userMessage: string): Promise<string> => {
    // Simulamos respuestas para la demo
    const responses = [
      "Tengo varias recomendaciones para ti. ¿Prefieres un lugar tranquilo o con ambiente?",
      "¿Buscas un lugar para trabajar? Te recomendaría La Cafeta, tienen excelente WiFi y espacios cómodos.",
      "Para una cita romántica, el restaurante Luna Azul es perfecto. Tiene iluminación tenue y buena música.",
      "Si quieres un lugar familiar, prueba Plaza Jardín. Tienen área de juegos para niños y menú variado.",
      "¿Qué tipo de comida prefieres? ¿Italiana, mexicana, asiática?",
      "¿Prefieres un lugar económico o algo más exclusivo?"
    ];
    
    return new Promise(resolve => {
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * responses.length);
        resolve(responses[randomIndex]);
      }, 1500);
    });
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;
    
    // Añadir mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    try {
      // Simular respuesta del bot
      const botResponse = await generateBotResponse(input);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex items-start gap-2.5 max-w-[80%] ${
                  message.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                {message.sender === 'bot' && (
                  <Avatar className="animate-bounce-slow">
                    <AvatarImage src="/placeholder.svg" alt="Jamito" />
                    <AvatarFallback className="bg-primary text-primary-foreground">JA</AvatarFallback>
                  </Avatar>
                )}
                {message.sender === 'user' && (
                  <Avatar>
                    <AvatarImage src="" alt="Usuario" />
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      <User size={16} />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start gap-2.5">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="Jamito" />
                  <AvatarFallback className="bg-primary text-primary-foreground">JA</AvatarFallback>
                </Avatar>
                <div className="bg-secondary p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-100"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={endOfMessagesRef} />
        </div>
      </div>

      <div className="border-t p-4">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu mensaje..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={input.trim() === ''}>
            <SendHorizontal size={18} />
          </Button>
          <Button variant="outline" title="Reiniciar conversación">
            <RefreshCw size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
