/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 *
 * https://refactoring.guru/es/design-patterns/builder
 */

class Computer {
    private _cpu: string = 'cpu - not defined';
    private _ram: string = 'ram - not defined';
    private _storage: string = 'storage - not defined';
    private _gpu?: string;

    displayConfiguration(): void {
        console.log(`Computer Configuration:
        CPU: ${this._cpu}
        RAM: ${this._ram}
        Storage: ${this._storage}
        GPU: ${this._gpu ?? 'gpu - not defined'}`);
    }

    set cpu(cpu: string) {
        this._cpu = cpu;
    }

    set ram(ram: string) {
        this._ram = ram;
    }

    set storage(storage: string) {
        this._storage = storage;
    }

    set gpu(gpu: string) {
        this._gpu = gpu;
    }

    get cpu(): string {
        return this._cpu;
    }

    get ram(): string {
        return this._ram;
    }

    get storage(): string {
        return this._storage;
    }
    
    get gpu(): string | undefined {
        return this._gpu ?? 'gpu - not defined';
    }

}

class ComputerBuilder {
    private _computer: Computer;

    public constructor(){
        this._computer = new Computer();
    }

    setCpu(cpu: string): ComputerBuilder {
        this._computer.cpu = cpu;
        return this;
    }

    setRam(ram: string): ComputerBuilder {
        this._computer.ram = ram;
        return this;
    }

    setStorage(storage: string): ComputerBuilder {
        this._computer.storage = storage;
        return this;
    }

    setGpu(gpu: string): ComputerBuilder {
        this._computer.gpu = gpu;
        return this;
    }

    build(): Computer {
        return this._computer;
    }
   
}

function main() {
    
    const basicComputer = new ComputerBuilder()
        .setCpu('Intel Core e dúo')
        .setRam('4GB')
        .setStorage('256GB')
        .build();

        console.log('Basic Computer:');
        basicComputer.displayConfiguration();

    const gamingComputer = new ComputerBuilder()
        .setCpu('Intel Core i9')
        .setRam('32GB')
        .setRam('64GB')
        .setStorage('1TB SSD')
        .setGpu('NVIDIA RTX 4090')
        .build();

        console.log('\nGaming Computer:');
        gamingComputer.displayConfiguration();

}

main();