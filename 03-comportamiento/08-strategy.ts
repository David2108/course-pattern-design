/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde varios
 * ! patitos compiten en una carrera y cada uno tiene su propia
 * ! estrategia de movimiento (por ejemplo, nadar, volar o caminar).
 */

import { COLORS } from "../helpers/colors.ts";
interface MovementStrategy {
    move(): void;
}

class SwinFast implements MovementStrategy {
    move(): void {
        console.log("%cEl pato nada rápidamente sobre el agua.", COLORS.blue);
    }
}

class FlyOverWater implements MovementStrategy {
    move(): void{
        console.log("%cEl pato vuela elegantemente sobre el agua.", COLORS.pink);
    }
}

class WalkClumsily implements MovementStrategy {
    move(): void{
        console.log("%cEl pato camina torpemente por la orilla.", COLORS.green);
    }
}

class Duck {
    private name: string;
    private movementStrategy: MovementStrategy;

    constructor(name: string, movementStrategy: MovementStrategy) {
        this.name = name;
        this.movementStrategy = movementStrategy;

        console.log(`%c${this.name} %cListo para competir`, COLORS.green, COLORS.white);
    }

    performMove(): void{
        console.log(`%c${this.name} se prepra para moverse:`, COLORS.yellow);
        this.movementStrategy.move();
    }

    setMovementStrategy(movementStrategy: MovementStrategy): void{
        this.movementStrategy = movementStrategy;
        console.log(`%c${this.name} ha cambiado su estrategia de movimiento.`, COLORS.orange);
    }
}

function main(){

const duck1 = new Duck("Pato Nadador", new SwinFast());
const duck2 = new Duck("Pato Volador", new FlyOverWater());
const duck3 = new Duck("Pato Caminante", new WalkClumsily());

console.log("%cComienzan las carreras de patos!", COLORS.red);

duck1.performMove();
duck2.performMove();
duck3.performMove();

duck3.setMovementStrategy(new FlyOverWater());
duck3.performMove();

duck3.setMovementStrategy(new SwinFast());
duck3.performMove();

}

main();