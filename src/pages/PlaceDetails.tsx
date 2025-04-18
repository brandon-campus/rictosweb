import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, MapPin, Clock, Star, DollarSign, Volume2, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from '@/components/Header';
import { getPlaceById, toggleFavorite } from '@/services/placesService';
import { Place } from '@/components/PlaceCard';
import { toast } from '@/hooks/use-toast';

const PlaceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!id) {
          setError('ID no proporcionado');
          return;
        }

        const data = await getPlaceById(id);
        
        if (!data) {
          setError('Lugar no encontrado');
          return;
        }

        setPlace(data);
      } catch (error) {
        console.error('Error fetching place:', error);
        setError('No se pudo cargar la información del lugar');
        toast({
          title: "Error",
          description: "No se pudo cargar la información del lugar",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleToggleFavorite = async () => {
    if (!place) return;
    try {
      await toggleFavorite(place.id);
      setPlace(prev => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
      toast({
        title: place.isFavorite ? "Eliminado de favoritos" : "Añadido a favoritos",
        description: `${place.name} ha sido ${place.isFavorite ? 'eliminado de' : 'añadido a'} tu lista de favoritos.`,
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar favoritos",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Cargando información...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !place) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <p className="text-destructive mb-4">{error || 'Lugar no encontrado'}</p>
            <Button onClick={handleBack}>Volver</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Botón Volver */}
          <Button 
            variant="ghost" 
            className="mb-4" 
            onClick={handleBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>

          {/* Imagen principal */}
          <div className="relative h-[400px] rounded-lg overflow-hidden mb-6">
            <img 
              src={place.image} 
              alt={place.name}
              className="w-full h-full object-cover"
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4 bg-white/80 hover:bg-white"
              onClick={handleToggleFavorite}
            >
              <Star className={place.isFavorite ? "fill-yellow-500 text-yellow-500" : ""} />
            </Button>
          </div>

          {/* Información principal */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{place.name}</h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <MapPin size={18} />
                <span>Madrid, España</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="fill-yellow-500 text-yellow-500" />
              <span className="font-semibold text-lg">{place.rating}</span>
            </div>
          </div>

          {/* Características */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center gap-2 p-4 border rounded-lg">
              <Clock size={20} className="text-primary" />
              <div>
                <p className="font-medium">Horario</p>
                <p className="text-sm text-muted-foreground">9:00 - 22:00</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-4 border rounded-lg">
              <DollarSign size={20} className="text-primary" />
              <div>
                <p className="font-medium">Rango de precios</p>
                <p className="text-sm text-muted-foreground">{place.priceRange}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-4 border rounded-lg">
              <Volume2 size={20} className="text-primary" />
              <div>
                <p className="font-medium">Nivel de ruido</p>
                <p className="text-sm text-muted-foreground">
                  {place.noiseLevel === 1 ? 'Bajo' : 
                   place.noiseLevel === 2 ? 'Moderado' : 'Alto'}
                </p>
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Acerca de este lugar</h2>
            <p className="text-muted-foreground whitespace-pre-line">{place.description}</p>
          </div>

          {/* Etiquetas */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Etiquetas</h2>
            <div className="flex flex-wrap gap-2">
              {place.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlaceDetails;
