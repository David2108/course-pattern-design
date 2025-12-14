/**
 * ! Patron Chain of Responsibility
 * Es un patrón de diseño de comportamiento que te permite pasar solicitudes
 * a lo largo de una cadena de manejadores.
 *
 * * Es útil cuando se necesita procesar datos de diferentes maneras, pero no
 * * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
 * * pero se sabe que se necesita procesar en una secuencia.
 *
 * https://refactoring.guru/es/design-patterns/chain-of-responsibility
 */

import { COLORS } from '../helpers/colors.ts';

interface Handler {
    setNext(handler: Handler): Handler;
    handler(request: string): void;
}

abstract class BaseHandler implements Handler {

    private nextHandler?: Handler;

    setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    handler(request: string): void {
        if (this.nextHandler) {
            this.nextHandler.handler(request);
        }
    }
}

//Soporte basico
class BasicSupport extends BaseHandler {


    override handler(request: string): void {
        if (request === 'basic') {
            console.log('%cBasicSupport: I can handle the request', COLORS.green);
            return;
        }
        console.log('Soporte basico: Pasando el problema a soporte avanzado')
        super.handler(request); // Pasamos el problema al siguiente soporte
    }
}

class AdvancedSupport extends BaseHandler {

    override handler(request: string): void {
        if (request === 'advanced') {
            console.log('%cAdvancedSupport: I can handle the request', COLORS.yellow);
            return;
        }
        console.log('Soporte avanzado: Pasando el problema a soporte premium')
        super.handler(request); // Pasamos el problema al siguiente soporte
    }

}

class ExpertSupport extends BaseHandler {

    override handler(request: string): void {
        if (request === 'expert') {
            console.log('%cExpertSupport: I can handle the request', COLORS.red);
            return;
        }
        console.log('Soporte experto: No puedo manejar el problema')
    }

}

function main() {

    const basicSupport = new BasicSupport();
    const advancedSupport = new AdvancedSupport();
    const expertSupport = new ExpertSupport();

    basicSupport.setNext(advancedSupport).setNext(expertSupport);

    console.log('%c--- Request: expert ---', COLORS.cyan);
    basicSupport.handler('basic');

}

main();