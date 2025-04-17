
import React from 'react';
import { 
  Slider, 
  Switch, 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem,
  SelectGroup
} from "@/components/ui/";
import { Search, Filter, Coffee, Utensils, Briefcase, Heart, Users, Wifi, VolumeX, Volume1, Volume2, DollarSign } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterPanel = ({ isOpen, onClose }: FilterPanelProps) => {
  return (
    <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-background z-40 shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col h-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <Filter size={20} className="mr-2" />
            Filtros
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cerrar
          </Button>
        </div>

        <div className="space-y-8 overflow-y-auto flex-grow">
          {/* Buscador */}
          <div className="space-y-2">
            <Label htmlFor="search">Buscar lugares</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="search" placeholder="Cafeterías, restaurantes..." className="pl-8" />
            </div>
          </div>

          <Separator />

          {/* Nivel de ruido */}
          <div className="space-y-2">
            <Label className="flex items-center">
              <Volume1 className="mr-2 h-4 w-4" />
              Nivel de ruido
            </Label>
            <div className="flex items-center justify-between pt-2">
              <VolumeX size={16} />
              <Slider defaultValue={[50]} max={100} step={1} className="mx-4" />
              <Volume2 size={16} />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground pt-1">
              <span>Tranquilo</span>
              <span>Animado</span>
            </div>
          </div>

          <Separator />

          {/* Rango de precios */}
          <div className="space-y-2">
            <Label className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4" />
              Rango de precios
            </Label>
            <div className="flex space-x-2 pt-2">
              <Button variant="outline" className="flex-1">$</Button>
              <Button variant="outline" className="flex-1">$$</Button>
              <Button variant="outline" className="flex-1">$$$</Button>
            </div>
          </div>

          <Separator />

          {/* Distancia */}
          <div className="space-y-2">
            <Label className="flex justify-between">
              <span className="flex items-center">Distancia máxima</span>
              <span className="text-sm text-muted-foreground">5 km</span>
            </Label>
            <Slider defaultValue={[5]} max={20} step={1} />
            <div className="flex justify-between text-sm text-muted-foreground pt-1">
              <span>Cerca</span>
              <span>Lejos</span>
            </div>
          </div>

          <Separator />

          {/* Tipo de comida */}
          <div className="space-y-2">
            <Label htmlFor="foodType" className="flex items-center">
              <Utensils className="mr-2 h-4 w-4" />
              Tipo de comida
            </Label>
            <Select>
              <SelectTrigger id="foodType">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="italian">Italiana</SelectItem>
                  <SelectItem value="mexican">Mexicana</SelectItem>
                  <SelectItem value="asian">Asiática</SelectItem>
                  <SelectItem value="fastfood">Comida rápida</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Estado de ánimo */}
          <div className="space-y-3">
            <Label className="block">Estado de ánimo</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="justify-start">
                <Briefcase className="mr-2 h-4 w-4" />
                Trabajo
              </Button>
              <Button variant="outline" className="justify-start">
                <Heart className="mr-2 h-4 w-4" />
                Citas
              </Button>
              <Button variant="outline" className="justify-start">
                <Users className="mr-2 h-4 w-4" />
                Familiar
              </Button>
              <Button variant="outline" className="justify-start">
                <Coffee className="mr-2 h-4 w-4" />
                Café solo
              </Button>
            </div>
          </div>

          <Separator />

          {/* Características */}
          <div className="space-y-3">
            <Label className="block">Características</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="wifi" className="cursor-pointer flex items-center">
                  <Wifi className="mr-2 h-4 w-4" />
                  Buen Wi-Fi
                </Label>
                <Switch id="wifi" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="parking" className="cursor-pointer">Estacionamiento</Label>
                <Switch id="parking" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="outdoor" className="cursor-pointer">Área exterior</Label>
                <Switch id="outdoor" />
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="mt-6 pt-4 border-t flex space-x-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Limpiar
          </Button>
          <Button className="flex-1" onClick={onClose}>
            Aplicar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
