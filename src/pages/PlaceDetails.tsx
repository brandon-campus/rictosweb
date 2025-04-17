
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Heart, MapPin, Star, DollarSign, 
  Wifi, Volume1, Users, Clock, Calendar 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from '@/components/Header';
import { getPlaceById, toggleFavorite } from '@/services/placesService';
import { Place } from '@/components/PlaceCard';
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const PlaceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      if (!id) return;
      
      try {
        const data = await getPlaceById(parseInt(id));
        if (data) {
          setPlace(data);
        } else {
          toast({
            title: "Lugar no encontrado",
            description: "El lugar que estás buscando no existe.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error fetching place details:', error);
        toast({
          title: "Error",
          description: "No se pudo cargar la información del lugar. Intenta de nuevo más tarde.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceDetails();
  }, [id]);

  const handleToggleFavorite = async () => {
    if (!place) return;
    
    try {
      await toggleFavorite(place.id);
      setPlace({ ...place, isFavorite: !place.isFavorite });
      
      toast({
        title: place.isFavorite ? "Eliminado de favoritos" : "Añadido a favoritos",
        description: `${place.name} ha sido ${place.isFavorite ? 'eliminado de' : 'añadido a'} tu lista de favoritos.`,
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar favoritos. Intenta de nuevo.",
        variant: "destructive",
      });
    }
  };

  const renderPriceRange = (range: string) => {
    const symbols = [];
    const total = 3;
    
    for (let i = 0; i < total; i++) {
      symbols.push(
        <DollarSign 
          key={i} 
          size={16} 
          className={i < range.length ? "text-primary" : "text-muted-foreground opacity-30"} 
        />
      );
    }
    
    return <div className="flex">{symbols}</div>;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
          <div className="mb-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/explore" className="flex items-center gap-1">
                <ArrowLeft size={16} />
                Volver a explorar
              </Link>
            </Button>
          </div>
          
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-[400px] w-full rounded-lg" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Skeleton className="h-40" />
                <Skeleton className="h-40" />
                <Skeleton className="h-40" />
              </div>
            </div>
          ) : place ? (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">{place.name}</h1>
                  <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                    <MapPin size={18} />
                    <span>Madrid, España</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-500" size={20} fill="currentColor" />
                    <span className="font-semibold text-lg">{place.rating}</span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleToggleFavorite}
                    className={place.isFavorite ? "text-red-500" : ""}
                  >
                    <Heart size={20} className={place.isFavorite ? "fill-current" : ""} />
                  </Button>
                </div>
              </div>
              
              <div className="aspect-video overflow-hidden rounded-lg">
                <img 
                  src={place.image} 
                  alt={place.name}
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Acerca de este lugar</h2>
                    <p className="text-lg">{place.description}</p>
                    <p className="mt-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
                      Sed eget justo vitae enim sagittis tincidunt. Vestibulum ante ipsum primis 
                      in faucibus orci luctus et ultrices posuere cubilia curae; Donec auctor 
                      commodo eros, in fermentum tellus.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Etiquetas</h3>
                    <div className="flex flex-wrap gap-2">
                      {place.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-accent/30 rounded-lg p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Información general</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <DollarSign size={18} />
                          Rango de precio
                        </span>
                        {renderPriceRange(place.priceRange)}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Volume1 size={18} />
                          Nivel de ruido
                        </span>
                        <span>Medio</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Users size={18} />
                          Capacidad
                        </span>
                        <span>60 personas</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Horario</h3>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Lunes - Viernes</span>
                        <span>9:00 - 22:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sábado</span>
                        <span>10:00 - 23:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Domingo</span>
                        <span>11:00 - 20:00</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Características</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        <Wifi size={18} className="text-primary" />
                        <span>Wi-Fi</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={18} className="text-primary" />
                        <span>Grupos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={18} className="text-primary" />
                        <span>Reservas</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-primary" />
                        <span>Eventos</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full">Guardar en favoritos</Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Lugar no encontrado</h2>
                <p className="text-muted-foreground mb-4">
                  No pudimos encontrar la información de este lugar.
                </p>
                <Button asChild>
                  <Link to="/explore">Volver a explorar</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <footer className="border-t py-6 text-center text-sm text-muted-foreground mt-12">
        <p>&copy; {new Date().getFullYear()} Ricto - Encuentra el lugar perfecto para cada momento</p>
      </footer>
    </div>
  );
};

export default PlaceDetails;
