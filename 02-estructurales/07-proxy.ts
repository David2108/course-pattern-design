/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 *
 */

import { COLORS } from "../helpers/colors.ts";

class Player {

    name: string;
    level: number;
    
    constructor(name: string, level: number) {
        this.name = name;
        this.level = level;
    }   
}

interface Room {
    enter(player: Player): void;
}

class SecretRoom implements Room {
    enter(player: Player): void {
        console.log(`%cWelcome to the secret room, ${player.name}`, COLORS.blue);
    }
}

//Clase Proxy
class MagicPortal implements Room {

    private secretRoom: SecretRoom;

    constructor(secretRoom: SecretRoom) {
        this.secretRoom = secretRoom;
    }

    enter(player: Player): void {
        if (player.level >= 10) {
            this.secretRoom.enter(player);
            return;
        }else {
            console.log(`%cAccess denied. ${player.name} is not high enough level to enter the secret room.`, COLORS.red);
        }
    }
}

function main() {

    const secretRoom = new SecretRoom();
    const portal = new MagicPortal(secretRoom);

    const player1 = new Player("Hero", 5);
    const player2 = new Player("Veteran", 15);

    console.log("%c-- Player 1 trying to enter the secret room --", COLORS.yellow);
    portal.enter(player1);

    console.log("%c-- Player 2 trying to enter the secret room --", COLORS.yellow);
    portal.enter(player2);

}

main();