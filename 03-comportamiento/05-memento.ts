/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */

class GameMemento {
    private level: number;
    private health: number;
    private position: string;

    constructor(level: number, health: number, position: string) {
        this.level = level;
        this.health = health;
        this.position = position;
    }

    getLevel(): number {
        return this.level;
    }

    getHealth(): number {
        return this.health;
    }

    getPosition(): string {
        return this.position;
    }
}

class Game {
    private level: number = 1;
    private health: number = 100;
    private position: string = 'Inicio';

    constructor() {
        console.log(`Game started at Level: ${this.level}, Health: ${this.health}, Position: ${this.position}`);
    }

    save(): GameMemento {
        return new GameMemento(this.level, this.health, this.position);
    }

    play(level: number, health: number, position: string): void {
        this.level = level;
        this.health = health;
        this.position = position;

        console.log(`Playing... Level: ${this.level}, Health: ${this.health}, Position: ${this.position}`);
    }

    restore(memento: GameMemento): void {
        this.level = memento.getLevel();
        this.health = memento.getHealth();
        this.position = memento.getPosition();

        console.log(`Game restored to Level: ${this.level}, Health: ${this.health}, Position: ${this.position}`);
    }

}

class GameHistory {
    private mementos: GameMemento[] = [];

    push(memento: GameMemento): void {
        this.mementos.push(memento);
    }

    pop(): GameMemento | undefined {
        return this.mementos.pop();
    }
}

function main(){

const game = new Game();
const history = new GameHistory();

history.push(game.save());

game.play(2, 80, 'Bosque Encantado');
history.push(game.save());

game.play(3, 50, 'Cueva Oscura');
history.push(game.save());

game.play(4, 30, 'Castillo del Dragón');
console.log('Estado actual del juego antes de restaurar:');

game.restore(history.pop()!);
console.log('Estado del juego después de restaurar al último memento:');

}

main();