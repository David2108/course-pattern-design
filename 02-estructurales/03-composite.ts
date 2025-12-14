/**
 * ! Patrón Composite
 * Es un patrón de diseño estructural que permite componer objetos
 * en estructuras de árbol para representar jerarquías.
 *
 * El patrón permite a los clientes tratar de manera uniforme a los objetos
 * individuales y a sus composiciones.
 *
 * * Es útil cuando necesitas tratar a los objetos individuales
 * * y a sus composiciones de manera uniforme, y la estructura
 * * de los objetos forma una jerarquía en árbol.
 *
 * https://refactoring.guru/es/design-patterns/composite
 *
 */

interface FileSystemComponent {
  showDetails(indent?: string): void;
}

class FileExample implements FileSystemComponent {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  showDetails(indent?: string): void {
    console.log(`${indent || ''}- File: ${this.name}`);
  }
}

class Directory implements FileSystemComponent {
    private name: string;
    private contents: FileSystemComponent[] = [];

    constructor(name: string) {
        this.name = name;
    }

    showDetails(indent?: string): void {
        console.log(`${indent || ''}+ Directory: ${this.name}`);
        this.contents.forEach(component => component.showDetails((indent || '') + '  '));
    }

    add(component: FileSystemComponent): void {
        this.contents.push(component);
    }
}

function main(){

    const file1 = new FileExample('file1.txt');
    const file2 = new FileExample('file2.txt');
    const file3 = new FileExample('file3.txt');
    const file4 = new FileExample('file4.txt');

    const folder1 = new Directory('folder1');
    const folder5 = new Directory('folder5');
    folder1.add(file1);
    folder1.add(file2);

    const folder2 = new Directory('folder2');
    folder2.add(file3);

    const folder3 = new Directory('folder3');
    folder3.add(file4);

    folder2.add(folder3);
    folder2.add(folder5);

    const rootFolder = new Directory('rootFolder');
    rootFolder.add(folder1);
    rootFolder.add(folder2);

    rootFolder.showDetails();

}

main();