/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 * 
 * * Es útil cuando queremos duplicar el contenido, 
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 * 
 * https://refactoring.guru/es/design-patterns/prototype
 */

class DocumentPrototype {

    public title: string;
    public content: string;
    public author: string;

    constructor(title: string, content: string, author: string) {
        this.title = title;
        this.content = content;
        this.author = author;
    }

    displayInfo(): void {
        console.log(`Title: ${this.title}`);
        console.log(`Content: ${this.content}`);
        console.log(`Author: ${this.author}`);
    }

    clone(): DocumentPrototype {
        return new DocumentPrototype(this.title, this.content, this.author);
    }

}

function prototypeMain() {

    const document = new DocumentPrototype(
        'Design Patterns in TypeScript',
        'This document explains various design patterns in TypeScript.',
        'Jane Doe'
    );

    console.log('Original Document:');
    document.displayInfo();

    const documentCopy = document.clone();
    documentCopy.title = 'Prototype Pattern in TypeScript';

    console.log('\nCloned Document:');
    documentCopy.displayInfo();

}

prototypeMain();