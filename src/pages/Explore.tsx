import React, { useState, useEffect } from 'react';
import { Filter, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import PlaceCard, { Place } from '@/components/PlaceCard';
import FilterPanel from '@/components/FilterPanel';
import { getAllPlaces, toggleFavorite } from '@/services/placesService';
import { toast } from "@/hooks/use-toast";

const Explore = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllPlaces();
      setPlaces(data || []);
    } catch (error) {
      console.error('Error fetching places:', error);
      setError('No se pudieron cargar los lugares');
      toast({
        title: "Error",
        description: "No se pudieron cargar los lugares. Intenta de nuevo más tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const handleToggleFavorite = async (id: number) => {
    try {
      await toggleFavorite(id);
      setPlaces(places.map(place => 
        place.id === id ? { ...place, isFavorite: !place.isFavorite } : place
      ));
      
      const place = places.find(p => p.id === id);
      if (place) {
        toast({
          title: place.isFavorite ? "Eliminado de favoritos" : "Añadido a favoritos",
          description: `${place.name} ha sido ${place.isFavorite ? 'eliminado de' : 'añadido a'} tu lista de favoritos.`,
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar favoritos. Intenta de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Explorar lugares</h1>
            <Button 
              variant="outline" 
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2"
            >
              <Filter size={18} />
              <span className="hidden sm:inline">Filtros</span>
            </Button>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Cargando lugares...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <p className="text-destructive mb-4">{error}</p>
                <Button onClick={fetchPlaces}>Intentar de nuevo</Button>
              </div>
            </div>
          ) : places.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-muted-foreground">No hay lugares disponibles</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {places.map((place) => (
                <PlaceCard 
                  key={place.id} 
                  place={place} 
                  onToggleFavorite={handleToggleFavorite} 
                />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <FilterPanel isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
      
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Ricto - Encuentra el lugar perfecto para cada momento</p>
      </footer>
    </div>
  );
};

export default Explore;
