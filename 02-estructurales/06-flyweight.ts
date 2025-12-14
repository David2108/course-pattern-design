/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 *
 * https://refactoring.guru/es/design-patterns/flyweight
 */

interface Location {
  display(coordinatess: { x: number; y: number }): void;
}

//Flyweight
class LocationIcon implements Location {
  private type: string;
  private iconImage: string;

  constructor(type: string, iconImage: string) {
    this.type = type;
    this.iconImage = iconImage;
  }

  display(coordinates: { x: number; y: number }): void {
    console.log(
      `Displaying ${this.type} icon at (${coordinates.x}, ${coordinates.y}) with image ${this.iconImage}`
    );
  }
}

// Fabrica de Flyweights
class LocationFactory {

    private icons: Record<string, LocationIcon> = {};

    getLocationIcon(type: string): LocationIcon {
        if(!this.icons[type]) {
            const iconImage = `imagen_de_${type}.png`; // Simulamos la carga de una imagen
            this.icons[type] = new LocationIcon(type, iconImage);
        }
        return this.icons[type];
    }
}

class MapLocation {

    private coordinates: { x: number; y: number };
    private icon: LocationIcon;

    constructor(coordinates: { x: number; y: number }, icon: LocationIcon) {
        this.coordinates = coordinates;
        this.icon = icon;
    }

    display(): void {
        this.icon.display(this.coordinates);
    }

}

function main(){

    const factory = new LocationFactory();
    const locations = [
        new MapLocation({ x: 10, y: 20 }, factory.getLocationIcon('restaurant')),
        new MapLocation({ x: 15, y: 25 }, factory.getLocationIcon('restaurant')),
        new MapLocation({ x: 30, y: 40 }, factory.getLocationIcon('park')),
        new MapLocation({ x: 50, y: 60 }, factory.getLocationIcon('museum')),
        new MapLocation({ x: 70, y: 80 }, factory.getLocationIcon('park')),
    ]

    locations.forEach(location => location.display());
}

main();