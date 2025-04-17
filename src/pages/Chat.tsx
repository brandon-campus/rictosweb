
import React from 'react';
import Header from '@/components/Header';
import ChatInterface from '@/components/ChatInterface';

const Chat = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-4">
          <div className="bg-accent/30 p-4 rounded-lg mb-4 text-center">
            <h1 className="text-2xl font-bold mb-2">Habla con Jamito</h1>
            <p className="text-muted-foreground">
              Cuéntale lo que buscas y te recomendará los mejores lugares adaptados a tu situación
            </p>
          </div>
          
          <div className="flex-1 bg-card rounded-lg shadow-sm overflow-hidden border">
            <ChatInterface />
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Ricto - Encuentra el lugar perfecto para cada momento</p>
      </footer>
    </div>
  );
};

export default Chat;
