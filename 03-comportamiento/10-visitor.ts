/**
 * !Patrón Visitor
 *
 * El patrón Visitor es un patrón de diseño de comportamiento
 * que te permite separar algoritmos de los objetos sobre
 * los que operan.
 *
 * * Es útil cuando necesitas añadir nuevas operaciones a
 * * clases estables sin cambiar su código.
 *
 * https://refactoring.guru/es/design-patterns/visitor
 */

/**
 * Contexto: Imagina que estás diseñando un sistema para un parque
 * temático con diferentes tipos de atracciones:
 * montañas rusas, casas del terror y ruedas de la fortuna.
 *
 * Cada atracción tiene su propio precio de entrada y ofrece un descuento
 * dependiendo del tipo de visitante (niño, adulto o adulto mayor).
 *
 * Aquí es donde entra el patrón Visitor, que permite aplicar operaciones
 * específicas (como calcular el precio con descuento) dependiendo tanto
 * de la atracción como del tipo de visitante,
 * sin modificar las clases originales.
 */

import { COLORS } from "../helpers/colors.ts";

interface Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void;
  visitHauntedHouse(haunted: HauntedHouse): void;
  visitFerrisWheel(ferrisWheel: FerrisWheel): void;
}

interface Attraction {
  accept(visitor: Visitor): void;
}

class RollerCoaster implements Attraction {
  private cost: number = 50;

  getPrice(): number {
    return this.cost;
  }

  accept(visitor: Visitor): void {
    visitor.visitRollerCoaster(this);
  }
}

class HauntedHouse implements Attraction {
  private cost: number = 30;

  getPrice(): number {
    return this.cost;
  }

  accept(visitor: Visitor): void {
    visitor.visitHauntedHouse(this);
  }
}

class FerrisWheel implements Attraction {
  private cost: number = 20;

  getPrice(): number {
    return this.cost;
  }

  accept(visitor: Visitor): void {
    visitor.visitFerrisWheel(this);
  }
}

class ChildVisitor implements Visitor {
    visitRollerCoaster(rollerCoaster: RollerCoaster): void {
        const price = rollerCoaster.getPrice() * 0.5;
        console.log(`Child price for Roller Coaster: $${price}`);
    }

    visitHauntedHouse(haunted: HauntedHouse): void {
        const price = haunted.getPrice() * 0.6;
        console.log(`Child price for Haunted House: $${price}`);
    }

    visitFerrisWheel(ferrisWheel: FerrisWheel): void {
        const price = ferrisWheel.getPrice() * 0.7;
        console.log(`Child price for Ferris Wheel: $${price}`);
    }
}

class AdultVisitor implements Visitor {
    visitRollerCoaster(rollerCoaster: RollerCoaster): void {
        const price = rollerCoaster.getPrice();
        console.log(`Adult price for Roller Coaster: $${price}`);
    }

    visitHauntedHouse(haunted: HauntedHouse): void {
        const price = haunted.getPrice();
        console.log(`Adult price for Haunted House: $${price}`);
    }

    visitFerrisWheel(ferrisWheel: FerrisWheel): void {
        const price = ferrisWheel.getPrice();
        console.log(`Adult price for Ferris Wheel: $${price}`);
    }
}

class SeniorVisitor implements Visitor {
    visitRollerCoaster(rollerCoaster: RollerCoaster): void {
        const price = rollerCoaster.getPrice() * 0.85;
        console.log(`Senior price for Roller Coaster: $${price}`);
    }

    visitHauntedHouse(haunted: HauntedHouse): void {
        const price = haunted.getPrice() * 0.85;
        console.log(`Senior price for Haunted House: $${price}`);
    }

    visitFerrisWheel(ferrisWheel: FerrisWheel): void {
        const price = ferrisWheel.getPrice() * 0.85;
        console.log(`Senior price for Ferris Wheel: $${price}`);
    }
}

function main(){

const atracctions: Attraction[] = [
    new RollerCoaster(),
    new HauntedHouse(),
    new FerrisWheel()
];

const childVisitor = new ChildVisitor();
const adultVisitor = new AdultVisitor();
const seniorVisitor = new SeniorVisitor();

console.log(`Montaña Rusa: ${new RollerCoaster().getPrice()}`);
console.log(`Casa del Terror: ${new HauntedHouse().getPrice()}`);
console.log(`Rueda de la Fortuna: ${new FerrisWheel().getPrice()}`);

console.log("\n\n")

console.log("%cVisitante Niño", COLORS.green)
atracctions
.forEach(atraccion => atraccion.accept(childVisitor));

console.log("\n")

console.log("%cVisitante Adulto", COLORS.blue)
atracctions
.forEach(atraccion => atraccion.accept(adultVisitor));

console.log("\n")

console.log("%cVisitante Adulto Mayor", COLORS.yellow)
atracctions
.forEach(atraccion => atraccion.accept(seniorVisitor));

}

main();