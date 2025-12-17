/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */

interface Observer {
    notify(videoTitle: string): void;
}

class YuotubeChannel {
    private subscribers: Observer[] = [];
    private name: string;

    constructor(name: string){
        this.name = name;
    }

    subscribe(observer: Observer): void{
        this.subscribers.push(observer);
        console.log(`El usuario se ha suscrito al canal ${this.name}`);
    }

    unsubscribe(observer: Observer): void{
        this.subscribers = this.subscribers.filter(sub => sub !== observer);
        console.log(`El usuario se ha dado de baja del canal ${this.name}`);
    }

    uploadVideo(videoTitle: string): void{
        console.log(`El canal ${this.name} ha subido un nuevo video: ${videoTitle}`);
        for (const sub of this.subscribers) {
            sub.notify(videoTitle);
        }
    }
}

class Subscriber implements Observer {
    private name: string;

    constructor(name: string){
        this.name = name;
    }

    notify(videoTitle: string): void {
        console.log(`Notificación para ${this.name}: Nuevo video subido - ${videoTitle}`);
    }

}

function main(){

    const channel = new YuotubeChannel("Tech Reviews");

    const subscriber1 = new Subscriber("Alice");
    const subscriber2 = new Subscriber("Bob");
    const subscriber3 = new Subscriber("Charlie");

    channel.subscribe(subscriber1);
    channel.subscribe(subscriber2);

    channel.uploadVideo("Review del nuevo smartphone");
    channel.subscribe(subscriber3);

    channel.uploadVideo("Unboxing de gadgets");

    channel.unsubscribe(subscriber2);

    channel.uploadVideo("Top 10 aplicaciones del 2024");

    channel.unsubscribe(subscriber1);

    channel.uploadVideo("Comparativa de laptops");
    channel.uploadVideo("Accesorios imprescindibles");

    channel.unsubscribe(subscriber3);

    channel.uploadVideo("Resumen anual de tecnología");

}

main();