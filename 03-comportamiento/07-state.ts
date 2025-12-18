/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

import { COLORS } from "../helpers/colors";
import { sleep } from "../helpers/sleep";

€/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */

interface State {
  name: string;

  insertMoney(): void;
  selectProduct(): void;
  dispenseProduct(): void;
}

class VendingMachine {
  private state: State;

  constructor() {
    this.state = new WaitingForMoney(this);
  }

  insertMoney() {
    this.state.insertMoney();
  }

  selectProduct() {
    this.state.selectProduct();
  }

  dispenseProduct() {
    this.state.dispenseProduct();
  }

  setState(state: State): void {
    this.state = state;
    console.log(
      `El estado de la máquina expendedora ha cambiado a: ${state.name}`
    );
  }

  getState(): string {
    return this.state.name;
  }
}

class WaitingForMoney implements State {
  name: string = "Waiting for Money";
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log("Dinero insertado. Puede seleccionar un producto.");
    this.vendingMachine.setState(new ProductSelected(this.vendingMachine));
  }
  selectProduct(): void {
    console.log("Por favor, inserte dinero primero.");
  }
  dispenseProduct(): void {
    console.log("Por favor, inserte dinero primero.");
  }
}

class ProductSelected implements State {
  name: string = "Product Selected";
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log("Por favor selecciona un producto - ya has insertado dinero.");
  }
  selectProduct(): void {
    console.log("Por favor, inserte dinero primero.");
    this.vendingMachine.setState(new DispensingProduct(this.vendingMachine));
  }
  dispenseProduct(): void {
    console.log(
      "Por favor seleccione un producto primero - antes de dispensar."
    );
  }
}

class DispensingProduct implements State {
  name: string = "Dispensing Product";
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log("Por favor espera a que se dispense el producto.");
  }
  selectProduct(): void {
    console.log(
      "Producto ya seleccionado. Por favor espera a que se dispense."
    );
  }
  dispenseProduct(): void {
    console.log(
      "Producto dispensado, cambiando al estado de waiting for money."
    );
    this.vendingMachine.setState(new WaitingForMoney(this.vendingMachine));
  }
}

async function main() {
  const vendingMachine = new VendingMachine();

  let selectedOption: string | null = "4";

  do {
    console.clear();
    console.log(
      `Selecciona una opción: %c${vendingMachine.getState()}`,
      COLORS.blue
    );
    selectedOption = prompt(
      `
        1. Insertar Dinero
        2. Seleccionar Producto
        3. Dispensar Producto
        4. Salir
        Ingrese el número de la opción deseada: `
    );

    switch (selectedOption) {
      case "1":
        vendingMachine.insertMoney();
        break;
      case "2":
        vendingMachine.selectProduct();
        break;
      case "3":
        vendingMachine.dispenseProduct();
        break;
      case "4":
        console.log("Saliendo...");
        break;
      default:
        console.log("Opción no válida, por favor intente de nuevo.");
    }

    await sleep(3000);
  } while (selectedOption !== "4");
}

main();
