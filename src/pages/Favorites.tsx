
import React, { useState, useEffect } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import PlaceCard, { Place } from '@/components/PlaceCard';
import { getFavorites, toggleFavorite } from '@/services/placesService';
import { toast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Favorites = () => {
  const [favorites, setFavorites] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getFavorites();
        setFavorites(data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        toast({
          title: "Error",
          description: "No se pudieron cargar tus favoritos. Intenta de nuevo más tarde.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleToggleFavorite = async (id: number) => {
    try {
      await toggleFavorite(id);
      setFavorites(favorites.filter(place => place.id !== id));
      
      const place = favorites.find(p => p.id === id);
      if (place) {
        toast({
          title: "Eliminado de favoritos",
          description: `${place.name} ha sido eliminado de tu lista de favoritos.`,
        });
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar de favoritos. Intenta de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
            <Heart size={24} className="mr-2 text-primary" />
            Mis Favoritos
          </h1>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Cargando favoritos...</p>
              </div>
            </div>
          ) : favorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((place) => (
                <PlaceCard 
                  key={place.id} 
                  place={place} 
                  onToggleFavorite={handleToggleFavorite} 
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="bg-accent/50 p-8 rounded-lg max-w-md">
                <Heart size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-xl font-semibold mb-2">No tienes favoritos guardados</h2>
                <p className="text-muted-foreground mb-6">
                  Explora lugares y guarda tus favoritos para acceder rápidamente a ellos.
                </p>
                <Button asChild>
                  <Link to="/explore">Explorar lugares</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Ricto - Encuentra el lugar perfecto para cada momento</p>
      </footer>
    </div>
  );
};

export default Favorites;
