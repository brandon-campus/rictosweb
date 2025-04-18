import { Place } from '../components/PlaceCard';
import { supabase } from '../lib/supabase';

interface SupabasePlace {
  id: number;
  name: string;
  description: string;
  image_url: string;
  noise_level: number;
  price_range: number;
  rating: number;
  tags: string[];
}

const mapSupabasePlace = (place: SupabasePlace): Place => ({
  id: place.id,
  name: place.name || '',
  description: place.description || '',
  image: place.image_url || '',
  tags: Array.isArray(place.tags) ? place.tags : [],
  priceRange: '$'.repeat(place.price_range || 1),
  rating: place.rating || 0,
  noiseLevel: place.noise_level || 0,
  isFavorite: false
});

export const getAllPlaces = async (): Promise<Place[]> => {
  try {
    const { data, error } = await supabase
      .from('places')
      .select('*');

    if (error) {
      console.error('Error fetching places:', error);
      return [];
    }

    if (!data) return [];

    return (data as SupabasePlace[]).map(mapSupabasePlace);
  } catch (error) {
    console.error('Error in getAllPlaces:', error);
    return [];
  }
};

export const getPlaceById = async (id: string | number): Promise<Place | null> => {
  try {
    // Validar y convertir el ID
    const placeId = typeof id === 'string' ? id : id.toString();
    
    if (!placeId) {
      console.error('ID no proporcionado');
      return null;
    }

    const { data, error } = await supabase
      .from('places')
      .select('*')
      .eq('id', placeId)
      .single();

    if (error) {
      console.error('Error fetching place:', error);
      return null;
    }

    if (!data) {
      console.error('Lugar no encontrado');
      return null;
    }

    const place = data as SupabasePlace;
    return {
      id: parseInt(place.id.toString()),
      name: place.name || '',
      description: place.description || '',
      image: place.image_url || '',
      tags: Array.isArray(place.tags) ? place.tags : [],
      priceRange: '$'.repeat(place.price_range || 1),
      rating: place.rating || 0,
      noiseLevel: place.noise_level || 0,
      isFavorite: false
    };
  } catch (error) {
    console.error('Error in getPlaceById:', error);
    return null;
  }
};

export const toggleFavorite = async (placeId: number): Promise<void> => {
  try {
    const user = await supabase.auth.getUser();
    if (!user.data.user?.id) {
      throw new Error('Usuario no autenticado');
    }

    const { error } = await supabase
      .from('favorites')
      .upsert({
        place_id: placeId,
        user_id: user.data.user.id
      });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Error in toggleFavorite:', error);
    throw error;
  }
};

export const getFavorites = async (): Promise<Place[]> => {
  try {
    const user = await supabase.auth.getUser();
    if (!user.data.user?.id) {
      console.error('Usuario no autenticado');
      return [];
    }

    const { data: favorites, error } = await supabase
      .from('favorites')
      .select('place_id')
      .eq('user_id', user.data.user.id);

    if (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }

    if (!favorites || favorites.length === 0) return [];

    const placeIds = favorites.map(fav => fav.place_id).filter(id => id != null);
    
    if (placeIds.length === 0) return [];

    const { data: places, error: placesError } = await supabase
      .from('places')
      .select('*')
      .in('id', placeIds);

    if (placesError) {
      console.error('Error fetching favorite places:', placesError);
      return [];
    }

    return (places as SupabasePlace[]).map(place => ({
      ...mapSupabasePlace(place),
      isFavorite: true
    }));
  } catch (error) {
    console.error('Error in getFavorites:', error);
    return [];
  }
};
