/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 *
 */

import { COLORS } from "../helpers/colors.ts";

interface Command {
  execute(): void;
}

class Light {
  turnOn() {
    console.log("%cLa luz está encendida", COLORS.yellow);
  }

  turnOff() {
    console.log("%cLa luz está apagada", COLORS.gray);
  }
}

class Fan {
  on() {
    console.log("%cEl ventilador está encendido", COLORS.cyan);
  }

  off() {
    console.log("%cEl ventilador está apagado", COLORS.blue);
  }
}

class LightOnCommand implements Command {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOn();
  }
}

class LightOffCommand implements Command {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOff();
  }
}

class FanOnCommand implements Command {
  constructor(private fan: Fan) {}

  execute(): void {
    this.fan.on();
  }
}

class FanOffCommand implements Command {
  constructor(private fan: Fan) {}

  execute(): void {
    this.fan.off();
  }
}

class RemoteControl {
  private commands: Record<string, Command> = {};

  setCommand(button: string, command: Command): void {
    this.commands[button] = command;
  }

  pressButton(button: string): void {
    if (this.commands[button]) {
      this.commands[button].execute();
      return;
    }

    console.log("%cComando no encontrado", COLORS.red);
  }
}

function main() {
  const light = new Light();
  const fan = new Fan();

  const remoteControl = new RemoteControl();

  // Configurar comandos
  remoteControl.setCommand("1", new LightOnCommand(light));
  remoteControl.setCommand("2", new LightOffCommand(light));
  remoteControl.setCommand("3", new FanOnCommand(fan));
  remoteControl.setCommand("4", new FanOffCommand(fan));

  // Usar el control remoto

  let continueProgram = true;

  do {

console.clear();
const button = prompt(
    `Presiona un boton del control:
        1. Encender luz
        2. Apagar luz
        3. Encender ventilador
        4. Apagar ventilador

        Boton:
    `) ?? '';
    remoteControl.pressButton(button);
    const continueProgramResponse = prompt("¿Deseas continuar? (s/n): ")?.toLowerCase();
    continueProgram = continueProgramResponse === 's';

  } while (continueProgram);
}

main();
