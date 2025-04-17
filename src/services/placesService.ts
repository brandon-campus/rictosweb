
import { Place } from '../components/PlaceCard';

// Datos simulados para la demostración
const mockPlaces: Place[] = [
  {
    id: 1,
    name: "La Cafeta",
    image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["tranquilo", "buen wifi", "café de especialidad"],
    priceRange: "$$",
    description: "Un espacio acogedor perfecto para trabajar o estudiar. Conexión WiFi de alta velocidad y los mejores granos de café de especialidad.",
    rating: 4.7,
    isFavorite: false
  },
  {
    id: 2,
    name: "Luna Azul",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["romántico", "cena", "vino"],
    priceRange: "$$$",
    description: "Restaurante elegante con iluminación tenue y ambiente romántico. Perfecto para cenas especiales y celebraciones.",
    rating: 4.9,
    isFavorite: false
  },
  {
    id: 3,
    name: "Plaza Jardín",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["familiar", "terraza", "juegos infantiles"],
    priceRange: "$$",
    description: "Un lugar ideal para toda la familia con área de juegos para niños, terraza espaciosa y menú variado para todos los gustos.",
    rating: 4.5,
    isFavorite: false
  },
  {
    id: 4,
    name: "Coworking Central",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["trabajo", "silencioso", "moderno"],
    priceRange: "$$",
    description: "Espacio de trabajo compartido con todas las comodidades para profesionales. Salas de reuniones, café ilimitado y ambiente productivo.",
    rating: 4.6,
    isFavorite: false
  },
  {
    id: 5,
    name: "Sabores de Asia",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["asiático", "picante", "vegetariano"],
    priceRange: "$$",
    description: "Auténtica comida asiática con opciones para todos los paladares. Especialidad en platos picantes y amplia selección vegetariana.",
    rating: 4.4,
    isFavorite: false
  },
  {
    id: 6,
    name: "El Rincón Verde",
    image: "https://images.unsplash.com/photo-1507149833265-60c372daea22?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["vegano", "orgánico", "saludable"],
    priceRange: "$$",
    description: "Restaurante especializado en cocina vegana y orgánica. Ingredientes frescos y de temporada en un ambiente relajado y natural.",
    rating: 4.8,
    isFavorite: false
  }
];

// Obtener todos los lugares
export const getAllPlaces = (): Promise<Place[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPlaces);
    }, 1000);
  });
};

// Obtener un lugar por ID
export const getPlaceById = (id: number): Promise<Place | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const place = mockPlaces.find(place => place.id === id);
      resolve(place);
    }, 500);
  });
};

// Guardar favoritos en localStorage
export const toggleFavorite = (id: number): Promise<Place[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedPlaces = mockPlaces.map(place => 
        place.id === id ? { ...place, isFavorite: !place.isFavorite } : place
      );
      
      // Actualizar la lista en memoria para la demostración
      mockPlaces.forEach((place, index) => {
        if (place.id === id) {
          mockPlaces[index].isFavorite = !place.isFavorite;
        }
      });
      
      resolve(updatedPlaces);
    }, 300);
  });
};

// Obtener favoritos
export const getFavorites = (): Promise<Place[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const favorites = mockPlaces.filter(place => place.isFavorite);
      resolve(favorites);
    }, 500);
  });
};
