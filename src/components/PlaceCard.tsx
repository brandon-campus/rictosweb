import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from 'lucide-react';

export interface Place {
  id: number;
  name: string;
  image: string;
  tags: string[];
  priceRange: string;
  description: string;
  rating: number;
  isFavorite?: boolean;
  noiseLevel: number;
}

interface PlaceCardProps {
  place: Place;
  onToggleFavorite: (id: number) => void;
}

const PlaceCard = ({ place, onToggleFavorite }: PlaceCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={place.image} 
          alt={place.name} 
          className="object-cover w-full h-full transition-transform hover:scale-105 duration-300" 
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1"
          onClick={() => onToggleFavorite(place.id)}
        >
          <Heart 
            size={18} 
            className={place.isFavorite ? "fill-red-500 text-red-500" : ""} 
          />
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg truncate">{place.name}</h3>
          <div className="text-sm font-medium">{place.priceRange}</div>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {place.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs px-2 py-0">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{place.description}</p>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0 flex justify-between items-center">
        <div className="flex items-center text-sm">
          <span className="font-medium mr-1">{place.rating}</span>
          <span className="text-yellow-500">★</span>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link to={`/places/${place.id}`}>Ver más</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlaceCard;
