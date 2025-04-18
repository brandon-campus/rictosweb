import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MessageCircle, Map } from 'lucide-react';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartChat = () => {
    if (user) {
      navigate('/chat');
    } else {
      navigate('/auth', { state: { from: '/chat' } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="max-w-4xl w-full text-center space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Encuentra el 
              <span className="text-primary"> lugar perfecto</span>
              <br />para cada momento
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ricto te ayuda a descubrir sitios adaptados a tu situación, estado de ánimo y preferencias personales.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 max-w-3xl mx-auto">
              <div className="group">
                <Link to="/chat">
                  <div className="bg-accent/50 hover:bg-accent transition-colors rounded-xl p-8 h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MessageCircle size={40} className="text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">Habla con Jamito</h2>
                    <p className="text-muted-foreground">
                      Nuestro asistente virtual te ayudará a encontrar el lugar perfecto según tus necesidades.
                    </p>
                    <Button variant="ghost" className="mt-2 group-hover:bg-primary/20 transition-colors" onClick={handleStartChat}>
                      Empezar chat
                    </Button>
                  </div>
                </Link>
              </div>
              
              <div className="group">
                <Link to="/explore">
                  <div className="bg-accent/50 hover:bg-accent transition-colors rounded-xl p-8 h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Map size={40} className="text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">Explorar lugares</h2>
                    <p className="text-muted-foreground">
                      Descubre una selección de lugares recomendados y filtra según tus preferencias.
                    </p>
                    <Button variant="ghost" className="mt-2 group-hover:bg-primary/20 transition-colors">
                      Ver lugares
                    </Button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <footer className="border-t py-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Ricto - Encuentra el lugar perfecto para cada momento</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
